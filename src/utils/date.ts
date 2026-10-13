/**
 * Date helpers working on plain ISO strings (`YYYY-MM-DD`, `HH:mm`) in *local* time.
 * Avoiding `Date` arithmetic across DST boundaries keeps billing deterministic.
 */

/**
 * Language-specific date vocabulary. Every dictionary exposes this shape as `messages.date`,
 * so date maths stays pure and the same helpers format Bosnian, English and German.
 */
export interface DateLocale {
  /** Sunday first, matching `Date#getDay()` */
  weekdaysLong: readonly string[];
  weekdaysShort: readonly string[];
  monthsLong: readonly string[];
  monthsShort: readonly string[];
  short: (weekday: string, day: number, month: string) => string;
  long: (weekday: string, day: number, month: string, year: number) => string;
}

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const ISO_TIME = /^([01]\d|2[0-3]):([0-5]\d)$/;

const pad = (n: number): string => String(n).padStart(2, '0');

export interface DateParts {
  year: number;
  /** 0-based month */
  month: number;
  day: number;
}

export function toISODate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function partsToISO({ year, month, day }: DateParts): string {
  return toISODate(new Date(year, month, day));
}

export function parseISODate(value: string): DateParts | null {
  const match = ISO_DATE.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  const probe = new Date(year, month, day);
  // Reject overflow such as 2026-02-31
  if (probe.getFullYear() !== year || probe.getMonth() !== month || probe.getDate() !== day) return null;
  return { year, month, day };
}

export function parseTime(value: string): number | null {
  const match = ISO_TIME.exec(value);
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

/** Local `Date` for an ISO date + time pair, or `null` when either is invalid. */
export function toDate(isoDate: string, isoTime: string): Date | null {
  const parts = parseISODate(isoDate);
  const minutes = parseTime(isoTime);
  if (!parts || minutes === null) return null;
  return new Date(parts.year, parts.month, parts.day, Math.floor(minutes / 60), minutes % 60);
}

export function addDays(isoDate: string, amount: number): string {
  const parts = parseISODate(isoDate);
  if (!parts) return isoDate;
  return partsToISO({ year: parts.year, month: parts.month, day: parts.day + amount });
}

/** Whole calendar days between two ISO dates (can be negative). DST-proof. */
export function calendarDaysBetween(from: string, to: string): number {
  const a = parseISODate(from);
  const b = parseISODate(to);
  if (!a || !b) return Number.NaN;
  return Math.round((Date.UTC(b.year, b.month, b.day) - Date.UTC(a.year, a.month, a.day)) / 86_400_000);
}

/**
 * Billable parking days: every started 24h block counts as one day, minimum one.
 * Computed with calendar arithmetic so a DST change never adds a phantom day.
 */
export function billableDays(dropOffDate: string, dropOffTime: string, pickUpDate: string, pickUpTime: string): number {
  const dayDiff = calendarDaysBetween(dropOffDate, pickUpDate);
  const from = parseTime(dropOffTime);
  const to = parseTime(pickUpTime);
  if (Number.isNaN(dayDiff) || from === null || to === null) return Number.NaN;
  return Math.max(1, dayDiff + (to > from ? 1 : 0));
}

export function formatDateShort(isoDate: string, locale: DateLocale): string {
  const parts = parseISODate(isoDate);
  if (!parts) return '-';
  const date = new Date(parts.year, parts.month, parts.day);
  return locale.short(locale.weekdaysShort[date.getDay()] ?? '', parts.day, locale.monthsShort[parts.month] ?? '');
}

export function formatDateLong(isoDate: string, locale: DateLocale): string {
  const parts = parseISODate(isoDate);
  if (!parts) return '-';
  const date = new Date(parts.year, parts.month, parts.day);
  return locale.long(
    locale.weekdaysLong[date.getDay()] ?? '',
    parts.day,
    locale.monthsLong[parts.month] ?? '',
    parts.year,
  );
}
