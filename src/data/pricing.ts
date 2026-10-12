import type { CoverType, ExtraService, PricingTier, VehicleOption } from '@/types';

/** Longest stay that can be booked online. Longer stays go through the contact desk. */
export const MAX_STAY_DAYS = 60;

/** VAT rate applied in Bosnia and Herzegovina — all published prices already include it. */
export const VAT_RATE = 0.17;

export const CURRENCY_LABEL = 'KM';

/** Daily rates for a standard passenger car, in KM, VAT included. Visible names live in the i18n dictionaries. */
export const PRICING_TIERS: readonly PricingTier[] = [
  { id: 'short', minDays: 1, maxDays: 3, rates: { open: 8, covered: 12 } },
  { id: 'week', minDays: 4, maxDays: 7, rates: { open: 7, covered: 10.5 } },
  { id: 'extended', minDays: 8, maxDays: 14, rates: { open: 6, covered: 9 } },
  { id: 'long', minDays: 15, maxDays: null, rates: { open: 5, covered: 7.5 } },
];

export const VEHICLES: readonly VehicleOption[] = [
  { id: 'car', multiplier: 1 },
  { id: 'suv', multiplier: 1.25 },
  { id: 'van', multiplier: 1.5 },
  { id: 'moto', multiplier: 0.6 },
];

export const COVER_TYPES: readonly CoverType[] = ['open', 'covered'];

export const EXTRAS: readonly ExtraService[] = [
  { id: 'wash', price: 12, billing: 'once' },
  { id: 'interior', price: 18, billing: 'once' },
  { id: 'ev', price: 15, billing: 'once' },
  { id: 'valet', price: 25, billing: 'once' },
  { id: 'insurance', price: 1.5, billing: 'perDay' },
];
