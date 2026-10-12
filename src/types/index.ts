/* ─────────────── Pricing & stay ─────────────── */

export type CoverType = 'open' | 'covered';
export type VehicleType = 'car' | 'suv' | 'van' | 'moto';
export type ExtraId = 'wash' | 'interior' | 'ev' | 'valet' | 'insurance';

export interface PricingTier {
  id: string;
  label: string;
  /** Short marketing hint, e.g. "Vikend" */
  hint: string;
  minDays: number;
  /** `null` = open ended */
  maxDays: number | null;
  /** Price per day for a standard passenger car (KM, VAT included) */
  rates: Record<CoverType, number>;
}

export interface VehicleOption {
  id: VehicleType;
  label: string;
  /** Compact label for tight layouts */
  shortLabel: string;
  hint: string;
  multiplier: number;
}

export interface ExtraService {
  id: ExtraId;
  label: string;
  /** Compact label for chips */
  shortLabel: string;
  description: string;
  price: number;
  billing: 'once' | 'perDay';
}

/** ISO date `YYYY-MM-DD` and 24h time `HH:mm`, both in local (airport) time. */
export interface StayDraft {
  dropOffDate: string;
  dropOffTime: string;
  pickUpDate: string;
  pickUpTime: string;
  cover: CoverType;
  vehicle: VehicleType;
  extras: ExtraId[];
}

export type StayField = 'dropOff' | 'pickUp' | 'range';
export type StayErrors = Partial<Record<StayField, string>>;

export interface PriceLine {
  id: string;
  label: string;
  detail?: string;
  amount: number;
}

export interface Quote {
  days: number;
  tier: PricingTier;
  ratePerDay: number;
  /** Per-day rate of the first tier — what the stay would cost without a duration discount. */
  standardRatePerDay: number;
  parking: number;
  extras: PriceLine[];
  extrasTotal: number;
  total: number;
  /** VAT portion already contained in `total`. */
  vat: number;
  /** Duration discount versus the standard daily rate. */
  savings: number;
  savingsPercent: number;
}

/* ─────────────── Booking ─────────────── */

export interface DriverDetails {
  fullName: string;
  email: string;
  phone: string;
}

export interface VehicleDetails {
  plate: string;
  make: string;
  color: string;
  passengers: string;
  flightNumber: string;
}

export type DriverField = keyof DriverDetails;
export type VehicleField = keyof VehicleDetails;

export interface BookingRequest {
  stay: StayDraft;
  days: number;
  driver: DriverDetails;
  vehicle: VehicleDetails;
  total: number;
  currency: 'BAM';
  locale: 'bs-BA';
}

export interface BookingConfirmation {
  reference: string;
  createdAt: string;
  request: BookingRequest;
}

/* ─────────────── Content ─────────────── */

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: 4 | 5;
  date: string;
  /** Destination of the flight the reviewer parked for */
  trip: string;
  quote: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
}

/* ─────────────── Facilities / live status ─────────────── */

export type CameraId = 'entrance' | 'covered-a' | 'open-b' | 'shuttle';
export type FeedStatus = 'connecting' | 'live' | 'offline';

export interface CameraStream {
  id: CameraId;
  label: string;
  zone: string;
  /** Rendering strategy; `simulated` is used when no NextFrame endpoint is configured. */
  source: 'simulated' | 'nextframe';
}

export interface ParkingSector {
  id: 'covered' | 'open';
  label: string;
  capacity: number;
}

export interface ShuttleDeparture {
  /** Minutes after midnight */
  minutes: number;
  /** Direction of travel */
  from: 'parking' | 'terminal';
}
