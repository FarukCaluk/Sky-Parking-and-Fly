import { EXTRA_DAY_RATE, EXTRA_DAYS_AFTER, MAX_STAY_DAYS, MIN_STAY_DAYS, PRICING_TIERS } from '../data/pricing.ts';
import type { PricingTier, Quote, StayDraft, StayErrors } from '../types/index.ts';
import { addDays, billableDays, toDate, toISODate } from './date.ts';

const FIRST_TIER = PRICING_TIERS[0] as PricingTier;
const LAST_TIER = PRICING_TIERS[PRICING_TIERS.length - 1] as PricingTier;

/** The band a number of days falls into. Beyond the last band the last one still applies (to the first 30 days). */
export function resolveTier(days: number): PricingTier {
  return (
    PRICING_TIERS.find((t) => days >= t.minDays && days <= t.maxDays) ??
    (days < FIRST_TIER.minDays ? FIRST_TIER : LAST_TIER)
  );
}

/**
 * Price of a stay of `rawDays` billed days: the whole stay at the daily rate of its band ("11-20 days: 7 KM per day"),
 * and past 30 days the 30-day price plus a flat 5 KM for every further day. Never fewer than the minimum stay.
 */
export function calculateQuote(rawDays: number): Quote {
  const days = Math.max(MIN_STAY_DAYS, Math.floor(rawDays) || MIN_STAY_DAYS);
  const tier = resolveTier(days);
  const extraDays = Math.max(0, days - EXTRA_DAYS_AFTER);
  const total = tier.rate * (days - extraDays) + EXTRA_DAY_RATE * extraDays;
  return { days, tier, ratePerDay: tier.rate, extraDays, total, savings: FIRST_TIER.rate * days - total };
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
    if (days !== null && days < MIN_STAY_DAYS) errors.range = 'rangeTooShort';
    else if (days !== null && days > MAX_STAY_DAYS) errors.range = 'rangeTooLong';
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
