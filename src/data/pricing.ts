import type { PricingTier } from '../types/index.ts';

/** Shortest stay that can be reserved online. A shorter one is agreed with us directly. */
export const MIN_STAY_DAYS = 2;

/** Longest stay the form accepts. Longer stays are agreed by phone (the original price list promises extra discounts). */
export const MAX_STAY_DAYS = 60;

/** The stay slider stops here; the date fields still accept anything up to `MAX_STAY_DAYS`. */
export const SLIDER_MAX_DAYS = 30;

export const CURRENCY_LABEL = 'KM';

/** Daily rate in KM. The rate of the band a stay falls into applies to every day of that stay. */
export const PRICING_TIERS: readonly PricingTier[] = [
  { id: 'from2', minDays: 2, maxDays: 4, rate: 9 },
  { id: 'from5', minDays: 5, maxDays: 10, rate: 8 },
  { id: 'from11', minDays: 11, maxDays: 20, rate: 7 },
  { id: 'from21', minDays: 21, maxDays: 30, rate: 6 },
];

/** Past this many days every additional day costs `EXTRA_DAY_RATE`, on top of the price of the first 30 days. */
export const EXTRA_DAYS_AFTER = 30;
export const EXTRA_DAY_RATE = 5;

/** Stays listed as examples in the detailed price list. Their totals are calculated, never typed in. */
export const EXAMPLE_DAYS = [2, 3, 5, 7, 10, 11, 14, 20, 21, 30, 31] as const;
