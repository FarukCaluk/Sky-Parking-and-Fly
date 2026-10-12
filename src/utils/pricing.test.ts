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
  cover: 'covered',
  vehicle: 'car',
  extras: [],
  ...patch,
});

describe('resolveTier', () => {
  it.each([
    [1, 'short'],
    [3, 'short'],
    [4, 'week'],
    [7, 'week'],
    [8, 'extended'],
    [14, 'extended'],
    [15, 'long'],
    [60, 'long'],
  ])('%i days → %s', (days, id) => {
    expect(resolveTier(days).id).toBe(id);
  });
});

describe('calculateQuote', () => {
  it('prices a covered car for 5 days with the weekly tier', () => {
    const q = calculateQuote({ days: 5, cover: 'covered', vehicle: 'car', extras: [] });
    expect(q.ratePerDay).toBe(10.5);
    expect(q.parking).toBe(52.5);
    expect(q.total).toBe(52.5);
    // standard rate 12 × 5 = 60 → saves 7.50
    expect(q.savings).toBe(7.5);
    expect(q.savingsPercent).toBeCloseTo(12.5);
  });

  it('applies the vehicle multiplier and rounds the daily rate to 0.50 KM', () => {
    expect(calculateQuote({ days: 2, cover: 'open', vehicle: 'suv', extras: [] }).ratePerDay).toBe(10);
    expect(calculateQuote({ days: 10, cover: 'open', vehicle: 'moto', extras: [] }).ratePerDay).toBe(3.5);
    expect(calculateQuote({ days: 20, cover: 'covered', vehicle: 'van', extras: [] }).ratePerDay).toBe(11.5);
  });

  it('adds one-off and per-day extras', () => {
    const q = calculateQuote({ days: 4, cover: 'open', vehicle: 'car', extras: ['wash', 'insurance'] });
    expect(q.parking).toBe(28);
    expect(q.extrasTotal).toBe(18); // 12 + 4 × 1.50
    expect(q.total).toBe(46);
    expect(q.extras.map((l) => l.id)).toEqual(['wash', 'insurance']);
  });

  it('keeps VAT as the part of the total that is already included', () => {
    const q = calculateQuote({ days: 1, cover: 'open', vehicle: 'car', extras: ['valet'] }); // 8 + 25 = 33
    expect(q.total).toBe(33);
    expect(q.vat).toBe(4.79); // 33 − 33 / 1.17 = 4.7949…
  });

  it('clamps nonsense day counts', () => {
    expect(calculateQuote({ days: 0, cover: 'open', vehicle: 'car', extras: [] }).days).toBe(1);
    expect(calculateQuote({ days: 500, cover: 'open', vehicle: 'car', extras: [] }).days).toBe(MAX_STAY_DAYS);
    expect(calculateQuote({ days: Number.NaN, cover: 'open', vehicle: 'car', extras: [] }).days).toBe(1);
  });

  it('never reports negative savings in the first tier', () => {
    const q = calculateQuote({ days: 2, cover: 'open', vehicle: 'car', extras: [] });
    expect(q.savings).toBe(0);
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
    expect(validateStay(stay({ dropOffDate: '2026-10-11' }), NOW).dropOff).toBeDefined();
    expect(validateStay(stay({ dropOffDate: '2026-10-12', dropOffTime: '08:00' }), NOW).dropOff).toBeDefined();
  });

  it('rejects a pick-up that is not after the drop-off', () => {
    expect(validateStay(stay({ pickUpDate: '2026-10-20', pickUpTime: '10:00' }), NOW).pickUp).toBeDefined();
    expect(validateStay(stay({ pickUpDate: '2026-10-19' }), NOW).pickUp).toBeDefined();
  });

  it('rejects stays beyond the online limit', () => {
    expect(validateStay(stay({ pickUpDate: '2027-02-01' }), NOW).range).toBeDefined();
  });

  it('reports missing dates', () => {
    const errors = validateStay(stay({ dropOffDate: '', pickUpDate: '' }), NOW);
    expect(errors.dropOff).toBeDefined();
    expect(errors.pickUp).toBeDefined();
  });
});

describe('createDefaultStay', () => {
  it('starts tomorrow and is valid', () => {
    const d = createDefaultStay(NOW);
    expect(d.dropOffDate).toBe('2026-10-13');
    expect(stayDays(d)).toBe(5);
    expect(validateStay(d, NOW)).toEqual({});
  });
});
