import type { PricingTier } from '@/types';

/** Longest stay the form accepts. Longer stays are agreed by phone (the original price list promises extra discounts). */
export const MAX_STAY_DAYS = 60;

/** The stay slider stops here; the date fields still accept anything up to `MAX_STAY_DAYS`. */
export const SLIDER_MAX_DAYS = 30;

export const CURRENCY_LABEL = 'KM';

/** Daily rate in KM. The rate of the tier a stay falls into applies to every day of that stay. */
export const PRICING_TIERS: readonly PricingTier[] = [
  { id: 'short', minDays: 1, maxDays: 10, rate: 8 },
  { id: 'mid', minDays: 11, maxDays: 20, rate: 7 },
  { id: 'long', minDays: 21, maxDays: null, rate: 6 },
];
