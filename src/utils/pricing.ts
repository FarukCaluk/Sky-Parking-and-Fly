import { MAX_STAY_DAYS, PRICING_TIERS } from '@/data/pricing';
import type { PricingTier, Quote, StayDraft, StayErrors } from '@/types';
import { addDays, billableDays, toDate, toISODate } from './date';

const FIRST_TIER = PRICING_TIERS[0] as PricingTier;

export function resolveTier(days: number): PricingTier {
  return PRICING_TIERS.find((t) => days >= t.minDays && (t.maxDays === null || days <= t.maxDays)) ?? FIRST_TIER;
}

/** Whole stay at the daily rate of the tier it falls into, as the price list reads: "11-20 days: 7 KM per day". */
export function calculateQuote(rawDays: number): Quote {
  const days = Math.max(1, Math.floor(rawDays) || 1);
  const tier = resolveTier(days);
  return {
    days,
    tier,
    ratePerDay: tier.rate,
    total: tier.rate * days,
    savings: (FIRST_TIER.rate - tier.rate) * days,
  };
}

/** Billable days for a stay draft, or `null` when the draft cannot be priced. */
export function stayDays(stay: StayDraft): number | null {
  const days = billableDays(stay.dropOffDate, stay.dropOffTime, stay.pickUpDate, stay.pickUpTime);
  return Number.isFinite(days) ? days : null;
}

/** Validate a stay. Returns machine-readable codes; the visible text comes from the active dictionary. */
export function validateStay(stay: StayDraft, now: Date = new Date()): StayErrors {
  const errors: StayErrors = {};
  const dropOff = toDate(stay.dropOffDate, stay.dropOffTime);
  const pickUp = toDate(stay.pickUpDate, stay.pickUpTime);

  if (!dropOff) {
    errors.dropOff = 'dropOffMissing';
  } else if (dropOff.getTime() < now.getTime() - 60_000) {
    errors.dropOff = 'dropOffPast';
  }

  if (!pickUp) {
    errors.pickUp = 'pickUpMissing';
  } else if (dropOff && pickUp.getTime() <= dropOff.getTime()) {
    errors.pickUp = 'pickUpBeforeDropOff';
  }

  if (!errors.dropOff && !errors.pickUp) {
    const days = stayDays(stay);
    if (days !== null && days > MAX_STAY_DAYS) errors.range = 'rangeTooLong';
  }

  return errors;
}

/** Tomorrow at 10:00 for a week: a plausible trip, so the price shown on first load is meaningful. */
export function createDefaultStay(now: Date = new Date()): StayDraft {
  const dropOffDate = addDays(toISODate(now), 1);
  return {
    dropOffDate,
    dropOffTime: '10:00',
    pickUpDate: addDays(dropOffDate, 7),
    pickUpTime: '10:00',
  };
}
