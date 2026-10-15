/* ─────────────── Pricing & stay ─────────────── */

export type TierId = 'short' | 'mid' | 'long';

export interface PricingTier {
  id: TierId;
  minDays: number;
  /** `null` = open ended */
  maxDays: number | null;
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
export type StayErrorCode = 'dropOffMissing' | 'dropOffPast' | 'pickUpMissing' | 'pickUpBeforeDropOff' | 'rangeTooLong';
export type StayErrors = Partial<Record<StayField, StayErrorCode>>;

export interface Quote {
  days: number;
  tier: PricingTier;
  ratePerDay: number;
  total: number;
  /** What the stay saves against the 1-10 day rate. */
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
