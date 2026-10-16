import { describe, expect, it } from 'vitest';
import { EXAMPLE_DAYS, MAX_STAY_DAYS, MIN_STAY_DAYS } from '@/data/pricing';
import type { StayDraft } from '@/types';
import { calculateQuote, createDefaultStay, resolveTier, stayDays, validateStay } from './pricing';

const NOW = new Date(2026, 9, 12, 9, 0); // 12 Oct 2026, 09:00

const stay = (patch: Partial<StayDraft> = {}): StayDraft => ({
  dropOffDate: '2026-10-20',
  dropOffTime: '10:00',
  pickUpDate: '2026-10-25',
  pickUpTime: '10:00',
  ...patch,
});

describe('resolveTier', () => {
  it.each([
    [2, 'from2'],
    [4, 'from2'],
    [5, 'from5'],
    [10, 'from5'],
    [11, 'from11'],
    [20, 'from11'],
    [21, 'from21'],
    [30, 'from21'],
    [45, 'from21'],
  ])('%i days -> %s', (days, id) => {
    expect(resolveTier(days).id).toBe(id);
  });
});

describe('calculateQuote (price list: 9 / 8 / 7 / 6 KM per day, then 5 KM per extra day)', () => {
  // The examples of the detailed price list, as the client wrote them
  it.each([
    [2, 18],
    [3, 27],
    [5, 40],
    [7, 56],
    [10, 80],
    [11, 77],
    [14, 98],
    [20, 140],
    [21, 126],
    [30, 180],
    [31, 185],
  ])("%i days cost %i KM, as in the client's examples", (days, total) => {
    expect(calculateQuote(days).total).toBe(total);
  });

  it('lists exactly those examples on the site', () => {
    expect(EXAMPLE_DAYS.map((days) => calculateQuote(days).total)).toEqual([
      18, 27, 40, 56, 80, 77, 98, 140, 126, 180, 185,
    ]);
  });

  it('applies the daily rate of the band to the whole stay', () => {
    expect(calculateQuote(4)).toMatchObject({ ratePerDay: 9, total: 36, extraDays: 0, savings: 0 });
    expect(calculateQuote(12)).toMatchObject({ ratePerDay: 7, total: 84, savings: 24 });
    expect(calculateQuote(30)).toMatchObject({ ratePerDay: 6, total: 180, savings: 90 });
  });

  it('charges 5 KM for every day after the 30th, on top of 180 KM', () => {
    expect(calculateQuote(31)).toMatchObject({ ratePerDay: 6, extraDays: 1, total: 185 });
    expect(calculateQuote(40)).toMatchObject({ extraDays: 10, total: 230 });
  });

  it('never prices fewer days than the minimum stay', () => {
    for (const days of [1, 0, -3, Number.NaN]) expect(calculateQuote(days).days).toBe(MIN_STAY_DAYS);
    expect(calculateQuote(3.9).days).toBe(3);
  });
});

describe('stayDays', () => {
  it('counts every started 24h block, from the exact arrival time', () => {
    expect(stayDays(stay())).toBe(5);
    expect(stayDays(stay({ pickUpTime: '10:30' }))).toBe(6);
    expect(stayDays(stay({ pickUpTime: '09:30' }))).toBe(5);
  });

  it('bills a same-day stay as one day', () => {
    expect(stayDays(stay({ pickUpDate: '2026-10-20', pickUpTime: '18:00' }))).toBe(1);
  });

  it('is not skewed by daylight-saving changes (25 Oct 2026 / 29 Mar 2026)', () => {
    expect(stayDays(stay({ dropOffDate: '2026-10-20', pickUpDate: '2026-10-27' }))).toBe(7);
    expect(stayDays(stay({ dropOffDate: '2026-03-25', pickUpDate: '2026-04-01' }))).toBe(7);
  });
});

describe('validateStay', () => {
  it('accepts a normal future stay', () => {
    expect(validateStay(stay(), NOW)).toEqual({});
  });

  it('rejects a drop-off in the past', () => {
    expect(validateStay(stay({ dropOffDate: '2026-10-11' }), NOW).dropOff).toBe('dropOffPast');
    expect(validateStay(stay({ dropOffDate: '2026-10-12', dropOffTime: '08:00' }), NOW).dropOff).toBe('dropOffPast');
  });

  it('rejects a pick-up that is not after the drop-off', () => {
    expect(validateStay(stay({ pickUpDate: '2026-10-20', pickUpTime: '10:00' }), NOW).pickUp).toBe(
      'pickUpBeforeDropOff',
    );
    expect(validateStay(stay({ pickUpDate: '2026-10-19' }), NOW).pickUp).toBe('pickUpBeforeDropOff');
  });

  it('rejects stays shorter than two billed days', () => {
    // 18:00 the same day, exactly 24 h, and 23 h 59 min later are all a single day
    expect(validateStay(stay({ pickUpDate: '2026-10-20', pickUpTime: '18:00' }), NOW).range).toBe('rangeTooShort');
    expect(validateStay(stay({ pickUpDate: '2026-10-21', pickUpTime: '10:00' }), NOW).range).toBe('rangeTooShort');
    expect(validateStay(stay({ pickUpDate: '2026-10-21', pickUpTime: '09:59' }), NOW).range).toBe('rangeTooShort');
  });

  it('accepts two days, which starts one minute after 24 hours', () => {
    expect(validateStay(stay({ pickUpDate: '2026-10-21', pickUpTime: '10:01' }), NOW)).toEqual({});
    expect(validateStay(stay({ pickUpDate: '2026-10-22', pickUpTime: '10:00' }), NOW)).toEqual({});
  });

  it('rejects stays beyond the online limit', () => {
    expect(validateStay(stay({ pickUpDate: '2027-02-01' }), NOW).range).toBe('rangeTooLong');
    expect(MAX_STAY_DAYS).toBe(60);
  });

  it('reports missing dates', () => {
    const errors = validateStay(stay({ dropOffDate: '', pickUpDate: '' }), NOW);
    expect(errors.dropOff).toBe('dropOffMissing');
    expect(errors.pickUp).toBe('pickUpMissing');
  });
});

describe('createDefaultStay', () => {
  it('starts tomorrow for a week and is valid', () => {
    const d = createDefaultStay(NOW);
    expect(d.dropOffDate).toBe('2026-10-13');
    expect(stayDays(d)).toBe(7);
    expect(validateStay(d, NOW)).toEqual({});
  });
});
