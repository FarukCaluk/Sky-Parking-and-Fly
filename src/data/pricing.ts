import type { CoverType, ExtraService, PricingTier, VehicleOption } from '@/types';

/** Longest stay that can be booked online. Longer stays go through the contact desk. */
export const MAX_STAY_DAYS = 60;

/** VAT rate applied in Bosnia and Herzegovina — all published prices already include it. */
export const VAT_RATE = 0.17;

export const CURRENCY_LABEL = 'KM';

/** Daily rates for a standard passenger car, in KM, VAT included. */
export const PRICING_TIERS: readonly PricingTier[] = [
  { id: 'short', label: '1–3 dana', hint: 'Kratki put', minDays: 1, maxDays: 3, rates: { open: 8, covered: 12 } },
  { id: 'week', label: '4–7 dana', hint: 'Sedmica', minDays: 4, maxDays: 7, rates: { open: 7, covered: 10.5 } },
  { id: 'extended', label: '8–14 dana', hint: 'Produženi', minDays: 8, maxDays: 14, rates: { open: 6, covered: 9 } },
  { id: 'long', label: '15+ dana', hint: 'Dugoročni', minDays: 15, maxDays: null, rates: { open: 5, covered: 7.5 } },
];

export const VEHICLES: readonly VehicleOption[] = [
  { id: 'car', label: 'Automobil', shortLabel: 'Auto', hint: 'Putnički', multiplier: 1 },
  { id: 'suv', label: 'SUV', shortLabel: 'SUV', hint: 'Terenac / crossover', multiplier: 1.25 },
  { id: 'van', label: 'Kombi', shortLabel: 'Kombi', hint: 'Do 3,5 t', multiplier: 1.5 },
  { id: 'moto', label: 'Motor', shortLabel: 'Motor', hint: 'Motocikl', multiplier: 0.6 },
];

export const COVER_OPTIONS: readonly { id: CoverType; label: string; description: string }[] = [
  { id: 'open', label: 'Nenatkriveno', description: 'Osvijetljen i ograđen otvoreni sektor' },
  { id: 'covered', label: 'Natkriveno', description: 'Zaštita od snijega, grada i sunca' },
];

export const EXTRAS: readonly ExtraService[] = [
  {
    id: 'wash',
    label: 'Vanjsko pranje',
    shortLabel: 'Vanjsko pranje',
    description: 'Ručno pranje i sušenje dok ste na putu.',
    price: 12,
    billing: 'once',
  },
  {
    id: 'interior',
    label: 'Unutrašnje čišćenje',
    shortLabel: 'Unutrašnje čišćenje',
    description: 'Usisavanje, čišćenje stakala i armature.',
    price: 18,
    billing: 'once',
  },
  {
    id: 'ev',
    label: 'Punjenje električnog vozila',
    shortLabel: 'Punjenje EV',
    description: 'Pun akumulator na vašem povratku.',
    price: 15,
    billing: 'once',
  },
  {
    id: 'valet',
    label: 'VIP preuzimanje na terminalu',
    shortLabel: 'VIP preuzimanje',
    description: 'Vozilo vam dostavljamo ispred izlaza.',
    price: 25,
    billing: 'once',
  },
  {
    id: 'insurance',
    label: 'Proširena zaštita vozila',
    shortLabel: 'Proširena zaštita',
    description: 'Kasko pokriće do 50.000 KM.',
    price: 1.5,
    billing: 'perDay',
  },
];
