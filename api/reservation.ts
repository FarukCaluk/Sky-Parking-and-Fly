import { mkdir, writeFile } from 'node:fs/promises';
import nodemailer from 'nodemailer';
import { DEFAULT_RESERVATION_INBOX } from '../src/data/inbox.ts';
import { LANGS, type Lang } from '../src/router/routes.ts';
import type { GuestDetails, StayDraft } from '../src/types/index.ts';
import { buildConfirmation, confirmationHtml, confirmationText } from '../src/utils/confirmation.ts';
import { formatDMY } from '../src/utils/date.ts';
import { calculateQuote, stayDays, validateStay } from '../src/utils/pricing.ts';
import { createReservationCode } from '../src/utils/reservationCode.ts';
import { hasErrors, validateGuest } from '../src/utils/validation.ts';

/**
 * POST /api/reservation: takes a reservation from the site, mails it to us and mails the confirmation to the guest.
 *
 * Everything the mails say is worked out here from the dates (the price, the days, the code), never taken from the
 * page. Mail goes out over SMTP, configured with environment variables:
 *   SMTP_HOST, SMTP_PORT (465 by default), SMTP_USER, SMTP_PASS   the mailbox that sends, e.g. info@parkingandfly.ba
 *   SMTP_FROM       optional sender, e.g. "Sky Parking & Fly <info@parkingandfly.ba>" (defaults to SMTP_USER)
 *   RESERVATION_EMAIL   where our copy goes (defaults to the test inbox)
 *   MAIL_DRY_RUN=1  write the mails to .mail-preview/ instead of sending them (for trying it out)
 * Without SMTP settings the answer is 503, and the site falls back to its form service, which mails only us.
 */

interface Payload {
  lang: Lang;
  stay: StayDraft;
  guest: GuestDetails;
  /** Hidden field of the form, empty for a person */
  trap: string;
}

const LIMITS = { name: 80, phone: 30, email: 120, make: 60, flight: 12, note: 400 } as const;
const MAX_BODY = 20_000;

const json = (body: unknown, status = 200, headers: Record<string, string> = {}): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers },
  });

function short(value: unknown, max: number): string | null {
  return typeof value === 'string' && value.length <= max ? value : null;
}

function parsePayload(raw: unknown): Payload | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const { lang, stay, guest, trap } = raw as Record<string, unknown>;
  if (typeof lang !== 'string' || !(LANGS as readonly string[]).includes(lang)) return null;
  if (typeof stay !== 'object' || stay === null || typeof guest !== 'object' || guest === null) return null;

  const s = stay as Record<string, unknown>;
  const g = guest as Record<string, unknown>;
  const dropOffDate = short(s.dropOffDate, 10);
  const dropOffTime = short(s.dropOffTime, 5);
  const pickUpDate = short(s.pickUpDate, 10);
  const pickUpTime = short(s.pickUpTime, 5);
  const name = short(g.name, LIMITS.name);
  const phone = short(g.phone, LIMITS.phone);
  const email = short(g.email, LIMITS.email);
  const make = short(g.make, LIMITS.make);
  const flight = short(g.flight, LIMITS.flight);
  const note = short(g.note, LIMITS.note);
  if ([dropOffDate, dropOffTime, pickUpDate, pickUpTime, name, phone, email, make, flight, note].includes(null))
    return null;

  return {
    lang: lang as Lang,
    stay: { dropOffDate, dropOffTime, pickUpDate, pickUpTime } as StayDraft,
    guest: { name, phone, email, make, flight, note } as GuestDetails,
    trap: typeof trap === 'string' ? trap : '',
  };
}

/** A browser always names the page it comes from; only our own pages may post here. */
function sameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/**
 * A few requests per address and per guest in a while. It lives in the memory of one function instance, so it is a
 * brake against careless abuse (someone's script, a bored visitor), not a wall.
 */
const recent = new Map<string, number[]>();
function tooMany(key: string, limit: number, windowMs: number, now = Date.now()): boolean {
  const hits = (recent.get(key) ?? []).filter((time) => now - time < windowMs);
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > limit;
}

interface Message {
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}
interface Mailer {
  send: (message: Message) => Promise<void>;
}

/** The mailbox that sends, or `null` when none is configured. */
function createMailer(code: string): Mailer | null {
  const env = process.env;
  if (env.MAIL_DRY_RUN === '1') {
    return {
      async send(message) {
        const dir = '.mail-preview';
        await mkdir(dir, { recursive: true });
        const who = message.to === inbox() ? 'staff' : 'guest';
        await writeFile(`${dir}/${code}-${who}.html`, message.html);
        await writeFile(
          `${dir}/${code}-${who}.txt`,
          `To: ${message.to}\nReply-To: ${message.replyTo}\nSubject: ${message.subject}\n\n${message.text}`,
        );
      },
    };
  }

  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  const port = Number(env.SMTP_PORT) || 465;
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 15000,
  });
  const from = env.SMTP_FROM?.trim() || `"Sky Parking & Fly" <${SMTP_USER}>`;
  return {
    async send(message) {
      await transport.sendMail({ from, ...message });
    },
  };
}

const inbox = (): string =>
  process.env.RESERVATION_EMAIL?.trim() || process.env.VITE_RESERVATION_EMAIL?.trim() || DEFAULT_RESERVATION_INBOX;

/** A name or date that ends up in a subject line must not be able to start a new header. */
const oneLine = (value: string): string => value.replace(/[\r\n\t]+/g, ' ').trim();

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'POST') return json({ error: 'method' }, 405, { allow: 'POST' });
    if (!sameOrigin(request)) return json({ error: 'origin' }, 403);

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    if (tooMany(`ip:${ip}`, 8, 10 * 60_000)) return json({ error: 'slow-down' }, 429, { 'retry-after': '600' });

    const raw = await request.text();
    if (raw.length > MAX_BODY) return json({ error: 'too-large' }, 413);
    let body: unknown;
    try {
      body = JSON.parse(raw);
    } catch {
      return json({ error: 'invalid' }, 400);
    }
    const payload = parsePayload(body);
    if (!payload) return json({ error: 'invalid' }, 400);
    const { lang, stay, guest } = payload;

    // The same rules as the form. "The arrival is in the past" is left to the page: the server's clock is not the
    // airport's, and a guest booking an hour ahead would be turned away by the difference.
    const days = stayDays(stay);
    if (
      days === null ||
      hasErrors(validateGuest(guest, { requirePhone: true, requireEmail: true })) ||
      hasErrors(validateStay(stay, new Date(0)))
    ) {
      return json({ error: 'invalid' }, 400);
    }

    const code = createReservationCode(stay.dropOffDate);
    if (payload.trap) return json({ ok: true, code, customerMail: false });

    const email = guest.email.trim();
    if (tooMany(`mail:${email.toLowerCase()}`, 3, 60 * 60_000)) return json({ error: 'slow-down' }, 429);

    const mailer = createMailer(code);
    if (!mailer) return json({ error: 'not-configured' }, 503);

    const quote = calculateQuote(days);
    const ours = inbox();
    const staff = buildConfirmation({ code, stay, quote, guest, lang: 'bs' });
    const banner = `Nova rezervacija sa web stranice (jezik gosta: ${lang.toUpperCase()}). Odgovor gostu: ${email}`;
    const confirmation = buildConfirmation({ code, stay, quote, guest, lang });

    const [toUs, toGuest] = await Promise.allSettled([
      mailer.send({
        to: ours,
        replyTo: email,
        subject: oneLine(
          `Nova rezervacija ${code}: ${guest.name}, ${formatDMY(stay.dropOffDate)} - ${formatDMY(stay.pickUpDate)}`,
        ),
        text: confirmationText(staff, { banner }),
        html: confirmationHtml(staff, { banner }),
      }),
      mailer.send({
        to: email,
        replyTo: process.env.SMTP_REPLY_TO?.trim() || ours,
        subject: confirmation.subject,
        text: confirmationText(confirmation),
        html: confirmationHtml(confirmation),
      }),
    ]);

    if (toUs.status === 'rejected') {
      console.error(`[reservation ${code}] mail to the inbox failed:`, toUs.reason);
      return json({ error: 'send-failed' }, 502);
    }
    if (toGuest.status === 'rejected')
      console.error(`[reservation ${code}] confirmation to the guest failed:`, toGuest.reason);

    return json({ ok: true, code, customerMail: toGuest.status === 'fulfilled' });
  },
};
