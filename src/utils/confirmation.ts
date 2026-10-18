import { EXTRA_DAY_RATE } from '../data/pricing.ts';
import { SITE } from '../data/site.ts';
import { MESSAGES } from '../i18n/messages.ts';
import type { Lang } from '../router/routes.ts';
import type { GuestDetails, Quote, StayDraft } from '../types/index.ts';
import { formatDateLong, formatDMY } from './date.ts';
import { formatKM } from './format.ts';
import { normalizeCode } from './validation.ts';

/**
 * The confirmation of a reservation: one description of what the guest booked, what it costs and which rules apply,
 * shown on the page after sending and mailed to the guest. Pure functions over the dictionaries, so the page and the
 * mail function (api/reservation.ts) say exactly the same thing in the same language.
 */

export interface ConfirmationInput {
  code: string;
  stay: StayDraft;
  quote: Quote;
  guest: GuestDetails;
  lang: Lang;
}

export interface Row {
  label: string;
  value: string;
}

export interface Confirmation {
  lang: Lang;
  title: string;
  subject: string;
  /** `from 20.10.2026, 10:00 to 27.10.2026, 10:00` */
  period: string;
  code: string;
  codeLabel: string;
  keepCode: string;
  greeting: string;
  intro: string;
  detailsTitle: string;
  details: Row[];
  priceTitle: string;
  priceLines: Row[];
  totalLabel: string;
  total: string;
  pricePayment: string;
  rulesTitle: string;
  rules: string[];
  contactTitle: string;
  contactText: string;
  contact: Row[];
  hours: string;
}

export function buildConfirmation({ code, stay, quote, guest, lang }: ConfirmationInput): Confirmation {
  const t = MESSAGES[lang];
  const c = t.confirmation;
  const km = (amount: number) => formatKM(amount, lang);
  const when = (iso: string, time: string) => t.date.at(formatDateLong(iso, t.date), time);
  const numeric = (iso: string, time: string) => `${formatDMY(iso)}, ${time}`;

  const details: Row[] = [
    { label: c.labels.arrival, value: when(stay.dropOffDate, stay.dropOffTime) },
    { label: c.labels.departure, value: when(stay.pickUpDate, stay.pickUpTime) },
    { label: c.labels.days, value: t.units.days(quote.days) },
  ];
  const make = guest.make.trim();
  if (make) details.push({ label: c.labels.vehicle, value: make });
  details.push({ label: c.labels.name, value: guest.name.trim() });
  details.push({ label: c.labels.phone, value: guest.phone.trim() });
  const email = guest.email.trim();
  if (email) details.push({ label: c.labels.email, value: email });
  const flight = normalizeCode(guest.flight);
  if (flight) details.push({ label: c.labels.flight, value: flight });
  const note = guest.note.trim();
  if (note) details.push({ label: c.labels.note, value: note });

  const baseDays = quote.days - quote.extraDays;
  const priceLines: Row[] = [
    {
      label: t.stayBar.line(t.units.days(baseDays), km(quote.ratePerDay)),
      value: km(quote.ratePerDay * baseDays),
    },
  ];
  if (quote.extraDays > 0) {
    priceLines.push({
      label: `${t.price.result.extra}: ${quote.extraDays} × ${km(EXTRA_DAY_RATE)}`,
      value: km(quote.extraDays * EXTRA_DAY_RATE),
    });
  }

  return {
    lang,
    title: c.title,
    subject: c.subject(code),
    period: c.period(numeric(stay.dropOffDate, stay.dropOffTime), numeric(stay.pickUpDate, stay.pickUpTime)),
    code,
    codeLabel: c.codeLabel,
    keepCode: c.keepCode,
    greeting: c.greeting(guest.name.trim()),
    intro: c.intro,
    detailsTitle: c.detailsTitle,
    details,
    priceTitle: c.priceTitle,
    priceLines,
    totalLabel: c.priceTotal,
    total: km(quote.total),
    pricePayment: c.pricePayment,
    rulesTitle: c.rulesTitle,
    // The counting rule comes first, then what the price depends on, then the rest
    rules: [c.rules[0] ?? '', c.rulePrice(km(EXTRA_DAY_RATE)), ...c.rules.slice(1)],
    contactTitle: c.contactTitle,
    contactText: c.contactText,
    contact: [
      { label: c.contactLabels.phone, value: SITE.phone.display },
      { label: c.contactLabels.email, value: SITE.email },
      { label: c.contactLabels.address, value: `${SITE.address.street}, ${SITE.address.city}` },
    ],
    hours: t.contact.hours,
  };
}

interface Options {
  /** A line above the confirmation, used for the copy that goes to us ("New reservation from the website") */
  banner?: string;
}

/** The mail as plain text, for clients that show no HTML and as the text part of the message. */
export function confirmationText(c: Confirmation, { banner }: Options = {}): string {
  const rule = (title: string) => `${title.toUpperCase()}\n${'-'.repeat(Math.min(title.length, 40))}`;
  const rows = (items: Row[]) => items.map((row) => `${row.label}: ${row.value}`);

  return [
    ...(banner ? [banner, ''] : []),
    c.title.toUpperCase(),
    c.period,
    '',
    `${c.codeLabel}: ${c.code}`,
    c.keepCode,
    '',
    c.greeting,
    c.intro,
    '',
    rule(c.detailsTitle),
    ...rows(c.details),
    '',
    rule(c.priceTitle),
    ...rows(c.priceLines),
    `${c.totalLabel}: ${c.total}`,
    c.pricePayment,
    '',
    rule(c.rulesTitle),
    ...c.rules.map((item) => `- ${item}`),
    '',
    rule(c.contactTitle),
    c.contactText,
    ...rows(c.contact),
    c.hours,
    '',
    'Sky Parking & Fly Sarajevo',
  ].join('\n');
}

const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
/** Everything the guest typed goes through this before it enters the markup. */
export const escapeHtml = (value: string): string => value.replace(/[&<>"']/g, (char) => ESCAPES[char] ?? char);

const NAVY = '#0a1224';
const ACCENT = '#ff8b3d';
const ACCENT_TEXT = '#ad4607';
const MUTED = '#44516a';
const LINE = '#e1e6ef';
const FONT = 'Arial, Helvetica, sans-serif';

/** The mail as HTML: one table-based layout with inline styles, which is what mail clients render reliably. */
export function confirmationHtml(c: Confirmation, { banner }: Options = {}): string {
  const heading = (text: string) =>
    `<h2 style="margin:28px 0 10px;font:700 13px ${FONT};letter-spacing:1.5px;text-transform:uppercase;color:${ACCENT_TEXT}">${escapeHtml(text)}</h2>`;
  const rows = (items: Row[]) =>
    `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">${items
      .map(
        (row) =>
          `<tr><td style="padding:9px 12px 9px 0;border-bottom:1px solid ${LINE};font:14px ${FONT};color:${MUTED};vertical-align:top">${escapeHtml(row.label)}</td>` +
          `<td align="right" style="padding:9px 0;border-bottom:1px solid ${LINE};font:600 15px ${FONT};color:${NAVY};vertical-align:top">${escapeHtml(row.value)}</td></tr>`,
      )
      .join('')}</table>`;

  return `<!doctype html>
<html lang="${c.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(c.subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f3f5f9">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f5f9">
<tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden">
<tr><td style="background:${NAVY};padding:20px 28px;font:700 20px ${FONT};letter-spacing:.5px;color:#ffffff">Sky Parking &amp; Fly <span style="color:${ACCENT};font-size:13px;letter-spacing:3px">SARAJEVO</span></td></tr>
${banner ? `<tr><td style="background:#fff3e8;padding:12px 28px;font:600 14px ${FONT};color:${ACCENT_TEXT}">${escapeHtml(banner)}</td></tr>` : ''}
<tr><td style="padding:30px 28px 8px">
<p style="margin:0;font:700 13px ${FONT};letter-spacing:1.5px;text-transform:uppercase;color:${ACCENT_TEXT}">&#10003; ${escapeHtml(c.title)}</p>
<h1 style="margin:10px 0 0;font:700 25px/1.25 ${FONT};color:${NAVY}">${escapeHtml(c.period)}</h1>
</td></tr>
<tr><td style="padding:18px 28px 0">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:2px dashed ${ACCENT};border-radius:10px;background:#fff8f2"><tr><td align="center" style="padding:16px 12px">
<div style="font:600 12px ${FONT};letter-spacing:1.5px;text-transform:uppercase;color:${MUTED}">${escapeHtml(c.codeLabel)}</div>
<div style="margin-top:6px;font:700 30px 'Courier New',Courier,monospace;letter-spacing:3px;color:${NAVY}">${escapeHtml(c.code)}</div>
<div style="margin-top:6px;font:13px ${FONT};color:${MUTED}">${escapeHtml(c.keepCode)}</div>
</td></tr></table>
</td></tr>
<tr><td style="padding:22px 28px 0;font:16px/1.55 ${FONT};color:${NAVY}">
<p style="margin:0 0 6px;font-weight:700">${escapeHtml(c.greeting)}</p>
<p style="margin:0;color:${MUTED}">${escapeHtml(c.intro)}</p>
</td></tr>
<tr><td style="padding:0 28px">
${heading(c.detailsTitle)}
${rows(c.details)}
${heading(c.priceTitle)}
${rows(c.priceLines)}
<table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr>
<td style="padding:14px 0 4px;font:700 13px ${FONT};letter-spacing:1.5px;text-transform:uppercase;color:${MUTED}">${escapeHtml(c.totalLabel)}</td>
<td align="right" style="padding:14px 0 4px;font:700 30px ${FONT};color:${ACCENT_TEXT}">${escapeHtml(c.total)}</td>
</tr></table>
<p style="margin:0;font:14px ${FONT};color:${MUTED}">${escapeHtml(c.pricePayment)}</p>
${heading(c.rulesTitle)}
<ul style="margin:0;padding:0 0 0 20px;font:14px/1.6 ${FONT};color:${NAVY}">
${c.rules.map((item) => `<li style="margin:0 0 8px">${escapeHtml(item)}</li>`).join('\n')}
</ul>
${heading(c.contactTitle)}
<p style="margin:0 0 10px;font:14px/1.55 ${FONT};color:${MUTED}">${escapeHtml(c.contactText)}</p>
${rows(c.contact)}
<p style="margin:10px 0 28px;font:13px ${FONT};color:${MUTED}">${escapeHtml(c.hours)}</p>
</td></tr>
<tr><td style="background:${NAVY};padding:16px 28px;font:13px ${FONT};color:#a6b2c7">Sky Parking &amp; Fly Sarajevo &middot; ${escapeHtml(SITE.address.street)}, ${escapeHtml(SITE.address.city)}</td></tr>
</table>
</td></tr>
</table>
</body>
</html>
`;
}
