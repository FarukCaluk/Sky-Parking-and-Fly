import { describe, expect, it } from 'vitest';
import { MAX_STAY_DAYS } from '@/data/pricing';
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
    [1, 'short'],
    [10, 'short'],
    [11, 'mid'],
    [20, 'mid'],
    [21, 'long'],
    [90, 'long'],
  ])('%i days -> %s', (days, id) => {
    expect(resolveTier(days).id).toBe(id);
  });
});

describe('calculateQuote (price list: 8 / 7 / 6 KM per day)', () => {
  it('prices a short stay at 8 KM per day', () => {
    const q = calculateQuote(5);
    expect(q.ratePerDay).toBe(8);
    expect(q.total).toBe(40);
    expect(q.savings).toBe(0);
  });

  it('applies the 11-20 day rate to the whole stay', () => {
    const q = calculateQuote(12);
    expect(q.ratePerDay).toBe(7);
    expect(q.total).toBe(84);
    expect(q.savings).toBe(12);
  });

  it('applies the 21+ day rate to the whole stay', () => {
    const q = calculateQuote(30);
    expect(q.ratePerDay).toBe(6);
    expect(q.total).toBe(180);
    expect(q.savings).toBe(60);
  });

  it('clamps nonsense day counts to one day', () => {
    expect(calculateQuote(0).days).toBe(1);
    expect(calculateQuote(Number.NaN).days).toBe(1);
    expect(calculateQuote(2.9).days).toBe(2);
  });
});

describe('stayDays', () => {
  it('counts every started 24h block', () => {
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
