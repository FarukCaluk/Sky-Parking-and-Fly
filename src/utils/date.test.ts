import { describe, expect, it } from 'vitest';
import { MESSAGES } from '@/i18n/messages';
import {
  addDays,
  billableDays,
  calendarDaysBetween,
  formatDateLong,
  formatDateShort,
  parseISODate,
  toDate,
} from './date';

describe('parseISODate', () => {
  it('parses valid dates and rejects overflow', () => {
    expect(parseISODate('2026-10-12')).toEqual({ year: 2026, month: 9, day: 12 });
    expect(parseISODate('2026-02-31')).toBeNull();
    expect(parseISODate('12.10.2026')).toBeNull();
    expect(parseISODate('')).toBeNull();
  });
});

describe('date arithmetic', () => {
  it('adds days across month and year boundaries', () => {
    expect(addDays('2026-10-30', 3)).toBe('2026-11-02');
    expect(addDays('2026-12-30', 5)).toBe('2027-01-04');
    expect(addDays('2026-03-01', -1)).toBe('2026-02-28');
  });

  it('counts calendar days', () => {
    expect(calendarDaysBetween('2026-10-20', '2026-10-27')).toBe(7);
    expect(calendarDaysBetween('2026-10-27', '2026-10-20')).toBe(-7);
  });
});

describe('billableDays', () => {
  it('rounds a started day up and never returns less than one', () => {
    expect(billableDays('2026-10-20', '10:00', '2026-10-20', '10:30')).toBe(1);
    expect(billableDays('2026-10-20', '10:00', '2026-10-21', '09:30')).toBe(1);
    expect(billableDays('2026-10-20', '10:00', '2026-10-21', '10:30')).toBe(2);
  });

  it('returns NaN for unusable input', () => {
    expect(billableDays('x', '10:00', '2026-10-21', '10:00')).toBeNaN();
  });
});

describe('formatting', () => {
  it('formats short and long dates in Bosnian', () => {
    const { date } = MESSAGES.bs;
    expect(formatDateShort('2026-10-12', date)).toBe('pon, 12. okt');
    expect(formatDateLong('2026-10-12', date)).toBe('ponedjeljak, 12. oktobar 2026.');
    expect(formatDateShort('nope', date)).toBe('-');
  });

  it('formats dates in English', () => {
    const { date } = MESSAGES.en;
    expect(formatDateShort('2026-10-12', date)).toBe('Mon, Oct 12');
    expect(formatDateLong('2026-10-12', date)).toBe('Monday, October 12, 2026');
  });

  it('formats dates in German', () => {
    const { date } = MESSAGES.de;
    expect(formatDateShort('2026-10-12', date)).toBe('Mo, 12. Okt');
    expect(formatDateLong('2026-10-12', date)).toBe('Montag, 12. Oktober 2026');
  });
});

describe('toDate', () => {
  it('builds a local Date from ISO parts', () => {
    const d = toDate('2026-10-20', '13:30');
    expect(d?.getHours()).toBe(13);
    expect(d?.getMinutes()).toBe(30);
    expect(toDate('2026-10-20', '25:00')).toBeNull();
  });
});
