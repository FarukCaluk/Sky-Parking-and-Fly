import { DEFAULT_RESERVATION_INBOX } from '@/data/inbox';
import { MESSAGES } from '@/i18n/messages';
import type { Lang } from '@/router/routes';
import type { GuestDetails, Quote, StayDraft } from '@/types';
import { formatDMY } from '@/utils/date';
import { formatKM } from '@/utils/format';
import { createReservationCode } from '@/utils/reservationCode';
import { normalizeCode, toInternationalPhone } from '@/utils/validation';

/**
 * A reservation goes to our mail function (`/api/reservation`), which mails us and mails the confirmation to the guest.
 * Where that function is not available (no mail settings yet, the site on a host without functions), the reservation
 * still reaches us through FormSubmit, a free form-to-mail service, and the guest gets the confirmation on the page only.
 * The mail to us is always written in Bosnian, because that is the language of the people reading it.
 */
const API = '/api/reservation';
const FORMSUBMIT = 'https://formsubmit.co/ajax';
const TIMEOUT_MS = 20_000;

/** Inbox of the fallback: the business address once `VITE_RESERVATION_EMAIL` is set, a test address until then. */
const INBOX: string = import.meta.env.VITE_RESERVATION_EMAIL?.trim() || DEFAULT_RESERVATION_INBOX;

export type ReservationErrorCode = 'network' | 'timeout' | 'rejected';

export class ReservationError extends Error {
  readonly code: ReservationErrorCode;

  constructor(code: ReservationErrorCode) {
    super(code);
    this.name = 'ReservationError';
    this.code = code;
  }
}

export interface ReservationSubmission {
  stay: StayDraft;
  quote: Quote;
  guest: GuestDetails;
  /** Language the visitor used the site in */
  lang: Lang;
}

export interface ReservationResult {
  /** Reference of the reservation, quoted in the mails and on the page */
  code: string;
  /** Whether the confirmation was mailed to the guest */
  customerMail: boolean;
}

const bs = MESSAGES.bs;

/** The rows of the mail that FormSubmit sends us, in reading order. Empty optional fields are left out. */
export function buildMailFields(
  { stay, quote, guest, lang }: ReservationSubmission,
  code: string,
): Record<string, string> {
  const when = (date: string, time: string) => `${formatDMY(date)} u ${time}`;
  const fields: Record<string, string> = {
    _subject: `Nova rezervacija ${code}: ${guest.name.trim()}, ${formatDMY(stay.dropOffDate)} - ${formatDMY(stay.pickUpDate)}`,
    _template: 'table',
    _captcha: 'false',
    'Kod rezervacije': code,
    'Ime i prezime': guest.name.trim(),
    Telefon: toInternationalPhone(guest.phone.trim()),
    Dolazak: when(stay.dropOffDate, stay.dropOffTime),
    Odlazak: when(stay.pickUpDate, stay.pickUpTime),
    Boravak: bs.units.days(quote.days),
    'Okvirna cijena': formatKM(quote.total, 'bs'),
  };

  // FormSubmit uses a field called `email` as the Reply-To address
  if (guest.email.trim()) fields.email = guest.email.trim();
  if (guest.make.trim()) fields['Marka vozila'] = guest.make.trim();
  if (guest.flight.trim()) fields['Broj leta'] = normalizeCode(guest.flight);
  if (guest.note.trim()) fields.Napomena = guest.note.trim();
  fields['Jezik stranice'] = lang;
  return fields;
}

/** Runs `send` with a time limit, so a request that hangs ends in a `timeout` error instead of a spinner. */
async function withTimeout<T>(send: (signal: AbortSignal) => Promise<T>): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await send(controller.signal);
  } catch (error) {
    if (error instanceof ReservationError) throw error;
    throw new ReservationError(controller.signal.aborted ? 'timeout' : 'network');
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Our mail function. `null` means "not available, use the fallback": the function is not there (a static host answers
 * 404 or the page itself), not set up (503), broken (5xx) or refused the page's origin (403). A 400 or 429 is the
 * function saying no to this reservation, and that is an error, not a reason to go around it.
 */
async function viaFunction(
  submission: ReservationSubmission,
  fetcher: typeof fetch,
): Promise<ReservationResult | null> {
  const { stay, guest, lang } = submission;
  let response: Response;
  try {
    response = await withTimeout((signal) =>
      fetcher(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ lang, stay, guest }),
        signal,
      }),
    );
  } catch {
    return null;
  }

  if (response.status === 400 || response.status === 429) throw new ReservationError('rejected');
  const body = (await response.json().catch(() => null)) as {
    ok?: boolean;
    code?: string;
    customerMail?: boolean;
  } | null;
  if (!response.ok || body?.ok !== true || typeof body.code !== 'string') return null;
  return { code: body.code, customerMail: body.customerMail === true };
}

async function viaFormSubmit(submission: ReservationSubmission, code: string, fetcher: typeof fetch): Promise<void> {
  await withTimeout(async (signal) => {
    // FormSubmit documents the address as it is written (`@` is legal in a path), so it is not percent-encoded
    const response = await fetcher(`${FORMSUBMIT}/${encodeURI(INBOX)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(buildMailFields(submission, code)),
      signal,
    });
    const body = (await response.json().catch(() => null)) as { success?: boolean | string } | null;
    // FormSubmit answers `"success": "true"` as a string
    const accepted = body?.success === true || body?.success === 'true';
    if (!response.ok || !accepted) throw new ReservationError('rejected');
  });
}

/** Sends the reservation. Resolves with its code once it has reached us, rejects with a `ReservationError`. */
export async function submitReservation(
  submission: ReservationSubmission,
  fetcher: typeof fetch = fetch,
): Promise<ReservationResult> {
  const result = await viaFunction(submission, fetcher);
  if (result) return result;

  const code = createReservationCode(submission.stay.dropOffDate);
  await viaFormSubmit(submission, code, fetcher);
  return { code, customerMail: false };
}
