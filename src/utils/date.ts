/**
 * Date helpers working on plain ISO strings (`YYYY-MM-DD`, `HH:mm`) in *local* time.
 * Avoiding `Date` arithmetic across DST boundaries keeps billing deterministic.
 */

export const WEEKDAYS_LONG = ['nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota'] as const;
export const WEEKDAYS_SHORT = ['ned', 'pon', 'uto', 'sri', 'čet', 'pet', 'sub'] as const;
/** Monday-first header for calendars */
export const CALENDAR_HEADER = ['pon', 'uto', 'sri', 'čet', 'pet', 'sub', 'ned'] as const;
export const MONTHS_LONG = [
  'januar',
  'februar',
  'mart',
  'april',
  'maj',
  'juni',
  'juli',
  'august',
  'septembar',
  'oktobar',
  'novembar',
  'decembar',
] as const;
export const MONTHS_SHORT = [
  'jan',
  'feb',
  'mar',
  'apr',
  'maj',
  'jun',
  'jul',
  'aug',
  'sep',
  'okt',
  'nov',
  'dec',
] as const;

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

export function minutesToTime(minutes: number): string {
  return `${pad(Math.floor(minutes / 60) % 24)}:${pad(minutes % 60)}`;
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

export function addMonths(isoDate: string, amount: number): string {
  const parts = parseISODate(isoDate);
  if (!parts) return isoDate;
  return partsToISO({ year: parts.year, month: parts.month + amount, day: 1 });
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

export function formatDateShort(isoDate: string): string {
  const parts = parseISODate(isoDate);
  if (!parts) return '—';
  const date = new Date(parts.year, parts.month, parts.day);
  return `${WEEKDAYS_SHORT[date.getDay()]}, ${parts.day}. ${MONTHS_SHORT[parts.month]}`;
}

export function formatDateLong(isoDate: string): string {
  const parts = parseISODate(isoDate);
  if (!parts) return '—';
  const date = new Date(parts.year, parts.month, parts.day);
  return `${WEEKDAYS_LONG[date.getDay()]}, ${parts.day}. ${MONTHS_LONG[parts.month]} ${parts.year}.`;
}

export function formatMonthTitle(year: number, month: number): string {
  return `${MONTHS_LONG[month]} ${year}.`;
}

/** Half-hour slots across the day: 00:00 … 23:30 */
export const TIME_SLOTS: readonly string[] = Array.from({ length: 48 }, (_, i) => minutesToTime(i * 30));

/** Weeks (Monday first) of ISO dates for a month; `null` pads leading/trailing cells. */
export function buildMonthMatrix(year: number, month: number): (string | null)[][] {
  const first = new Date(year, month, 1);
  const leading = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (string | null)[] = [];
  for (let i = 0; i < leading; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(partsToISO({ year, month, day }));
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks: (string | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

/** Next half-hour slot at or after `now`, as `HH:mm` (clamped to the last slot of the day). */
export function nextSlot(now: Date): string {
  const minutes = now.getHours() * 60 + now.getMinutes();
  const rounded = Math.min(Math.ceil(minutes / 30) * 30, 23 * 60 + 30);
  return minutesToTime(rounded);
}
