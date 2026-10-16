/* ─────────────── Pricing & stay ─────────────── */

/** Named by the first day of the band: 2-4, 5-10, 11-20 and 21-30 days. */
export type TierId = 'from2' | 'from5' | 'from11' | 'from21';

export interface PricingTier {
  id: TierId;
  minDays: number;
  maxDays: number;
  /** Price per day in KM */
  rate: number;
}

/** ISO date `YYYY-MM-DD` and 24h time `HH:mm`, both in local (airport) time. */
export interface StayDraft {
  dropOffDate: string;
  dropOffTime: string;
  pickUpDate: string;
  pickUpTime: string;
}

export type StayField = 'dropOff' | 'pickUp' | 'range';
/** Machine-readable reason; the visible text comes from the active language's dictionary. */
export type StayErrorCode =
  'dropOffMissing' | 'dropOffPast' | 'pickUpMissing' | 'pickUpBeforeDropOff' | 'rangeTooShort' | 'rangeTooLong';
export type StayErrors = Partial<Record<StayField, StayErrorCode>>;

export interface Quote {
  /** Billed days, at least the minimum stay */
  days: number;
  /** The band the stay falls into (the last one for stays beyond 30 days) */
  tier: PricingTier;
  /** Daily rate of that band, which applies to the first 30 days */
  ratePerDay: number;
  /** Days beyond the 30th, each charged the flat extra-day rate */
  extraDays: number;
  total: number;
  /** What the stay saves against the top (shortest stay) daily rate for every day. */
  savings: number;
}

/* ─────────────── Reservation request ─────────────── */

export interface GuestDetails {
  name: string;
  phone: string;
  email: string;
  /** Make and model of the car, e.g. "VW Golf 7" */
  make: string;
  flight: string;
  note: string;
}

export type GuestField = keyof GuestDetails;
