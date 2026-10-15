import { RESERVATION_INBOX } from '@/data/site';
import { MESSAGES } from '@/i18n/messages';
import type { Lang } from '@/router/routes';
import type { GuestDetails, Quote, StayDraft } from '@/types';
import { formatDMY } from '@/utils/date';
import { formatKM } from '@/utils/format';
import { normalizeCode, toInternationalPhone } from '@/utils/validation';

/**
 * Reservations are mailed to the inbox through FormSubmit, a free form-to-mail service: no server of our own is
 * needed. The mail is always written in Bosnian, because that is the language of the people reading it.
 */
const ENDPOINT = 'https://formsubmit.co/ajax';
const TIMEOUT_MS = 15_000;

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

const bs = MESSAGES.bs;

/** The rows of the mail, in reading order. Empty optional fields are left out. */
export function buildMailFields({ stay, quote, guest, lang }: ReservationSubmission): Record<string, string> {
  const when = (date: string, time: string) => `${formatDMY(date)} u ${time}`;
  const fields: Record<string, string> = {
    _subject: `Nova rezervacija: ${guest.name.trim()}, ${formatDMY(stay.dropOffDate)} - ${formatDMY(stay.pickUpDate)}`,
    _template: 'table',
    _captcha: 'false',
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

/** Sends the reservation. Resolves when the mail was accepted for delivery, rejects with a `ReservationError`. */
export async function submitReservation(
  submission: ReservationSubmission,
  fetcher: typeof fetch = fetch,
): Promise<void> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    // FormSubmit documents the address as it is written (`@` is legal in a path), so it is not percent-encoded
    const response = await fetcher(`${ENDPOINT}/${encodeURI(RESERVATION_INBOX)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(buildMailFields(submission)),
      signal: controller.signal,
    });
    const body = (await response.json().catch(() => null)) as { success?: boolean | string } | null;
    // FormSubmit answers `"success": "true"` as a string
    const accepted = body?.success === true || body?.success === 'true';
    if (!response.ok || !accepted) throw new ReservationError('rejected');
  } catch (error) {
    if (error instanceof ReservationError) throw error;
    throw new ReservationError(controller.signal.aborted ? 'timeout' : 'network');
  } finally {
    clearTimeout(timer);
  }
}
