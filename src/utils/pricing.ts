import { EXTRAS, MAX_STAY_DAYS, PRICING_TIERS, VAT_RATE, VEHICLES } from '@/data/pricing';
import type { CoverType, ExtraId, PriceLine, PricingTier, Quote, StayDraft, StayErrors, VehicleType } from '@/types';
import { addDays, billableDays, nextSlot, toDate, toISODate } from './date';
import { formatDays, formatKM } from './format';

const round2 = (n: number): number => Math.round(n * 100) / 100;
/** Daily rates are rounded to the nearest 0.50 KM so the price list stays tidy. */
const roundToHalf = (n: number): number => Math.round(n * 2) / 2;

const FIRST_TIER = PRICING_TIERS[0] as PricingTier;

export function resolveTier(days: number): PricingTier {
  return PRICING_TIERS.find((t) => days >= t.minDays && (t.maxDays === null || days <= t.maxDays)) ?? FIRST_TIER;
}

export function vehicleMultiplier(vehicle: VehicleType): number {
  return VEHICLES.find((v) => v.id === vehicle)?.multiplier ?? 1;
}

export function dailyRate(tier: PricingTier, cover: CoverType, vehicle: VehicleType): number {
  return roundToHalf(tier.rates[cover] * vehicleMultiplier(vehicle));
}

export interface QuoteInput {
  days: number;
  cover: CoverType;
  vehicle: VehicleType;
  extras: readonly ExtraId[];
}

export function calculateQuote({ days: rawDays, cover, vehicle, extras }: QuoteInput): Quote {
  const days = Math.min(Math.max(1, Math.floor(rawDays) || 1), MAX_STAY_DAYS);
  const tier = resolveTier(days);
  const ratePerDay = dailyRate(tier, cover, vehicle);
  const standardRatePerDay = dailyRate(FIRST_TIER, cover, vehicle);
  const parking = round2(ratePerDay * days);

  const extraLines: PriceLine[] = EXTRAS.filter((e) => extras.includes(e.id)).map((e) => {
    const amount = e.billing === 'perDay' ? round2(e.price * days) : e.price;
    return {
      id: e.id,
      label: e.label,
      detail: e.billing === 'perDay' ? `${days} × ${formatKM(e.price)}` : undefined,
      amount,
    };
  });
  const extrasTotal = round2(extraLines.reduce((sum, l) => sum + l.amount, 0));
  const total = round2(parking + extrasTotal);
  const savings = round2(standardRatePerDay * days - parking);

  return {
    days,
    tier,
    ratePerDay,
    standardRatePerDay,
    parking,
    extras: extraLines,
    extrasTotal,
    total,
    vat: round2(total - total / (1 + VAT_RATE)),
    savings,
    savingsPercent: standardRatePerDay > 0 ? (savings / (standardRatePerDay * days)) * 100 : 0,
  };
}

/** Billable days for a stay draft, or `null` when the draft cannot be priced. */
export function stayDays(stay: StayDraft): number | null {
  const days = billableDays(stay.dropOffDate, stay.dropOffTime, stay.pickUpDate, stay.pickUpTime);
  return Number.isFinite(days) ? days : null;
}

export function validateStay(stay: StayDraft, now: Date = new Date()): StayErrors {
  const errors: StayErrors = {};
  const dropOff = toDate(stay.dropOffDate, stay.dropOffTime);
  const pickUp = toDate(stay.pickUpDate, stay.pickUpTime);

  if (!dropOff) {
    errors.dropOff = 'Odaberite datum i vrijeme ostavljanja vozila.';
  } else if (dropOff.getTime() < now.getTime() - 60_000) {
    errors.dropOff = 'Vrijeme ostavljanja vozila je već prošlo.';
  }

  if (!pickUp) {
    errors.pickUp = 'Odaberite datum i vrijeme preuzimanja vozila.';
  } else if (dropOff && pickUp.getTime() <= dropOff.getTime()) {
    errors.pickUp = 'Preuzimanje mora biti nakon ostavljanja vozila.';
  }

  if (!errors.dropOff && !errors.pickUp) {
    const days = stayDays(stay);
    if (days !== null && days > MAX_STAY_DAYS) {
      errors.range = `Online rezervacija je moguća do ${formatDays(MAX_STAY_DAYS)}. Za duži boravak nas kontaktirajte.`;
    }
  }

  return errors;
}

export function createDefaultStay(now: Date = new Date()): StayDraft {
  const dropOffDate = addDays(toISODate(now), 1);
  return {
    dropOffDate,
    dropOffTime: '10:00',
    pickUpDate: addDays(dropOffDate, 5),
    pickUpTime: '10:00',
    cover: 'covered',
    vehicle: 'car',
    extras: [],
  };
}

/** Earliest bookable drop-off time slot for today (used to hint the picker). */
export function earliestDropOffTime(now: Date = new Date()): string {
  return nextSlot(now);
}
