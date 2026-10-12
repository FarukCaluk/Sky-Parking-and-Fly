/* ─────────────── Pricing & stay ─────────────── */

export type CoverType = 'open' | 'covered';
export type VehicleType = 'car' | 'suv' | 'van' | 'moto';
export type ExtraId = 'wash' | 'interior' | 'ev' | 'valet' | 'insurance';

export type TierId = 'short' | 'week' | 'extended' | 'long';

export interface PricingTier {
  id: TierId;
  minDays: number;
  /** `null` = open ended */
  maxDays: number | null;
  /** Price per day for a standard passenger car (KM, VAT included) */
  rates: Record<CoverType, number>;
}

export interface VehicleOption {
  id: VehicleType;
  multiplier: number;
}

export interface ExtraService {
  id: ExtraId;
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
/** Machine-readable reason; the visible text comes from the active language's dictionary. */
export type StayErrorCode = 'dropOffMissing' | 'dropOffPast' | 'pickUpMissing' | 'pickUpBeforeDropOff' | 'rangeTooLong';
export type StayErrors = Partial<Record<StayField, StayErrorCode>>;

export interface PriceLine {
  id: ExtraId;
  billing: 'once' | 'perDay';
  /** Number of billed units (days for per-day services, otherwise 1) */
  quantity: number;
  /** Price of one unit in KM */
  unit: number;
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
  /** BCP-47 locale of the language the visitor booked in, e.g. `bs-BA`, `en-US`, `de-DE`. */
  locale: string;
}

export interface BookingConfirmation {
  reference: string;
  createdAt: string;
  request: BookingRequest;
}

/* ─────────────── Content ─────────────── */

export type TestimonialId = 't1' | 't2' | 't3' | 't4' | 't5' | 't6';

export interface Testimonial {
  id: TestimonialId;
  name: string;
  rating: 4 | 5;
}

export type StatId = 'travellers' | 'rating' | 'minutes' | 'recommend';

export interface StatItem {
  id: StatId;
  value: number;
  suffix: string;
  decimals?: number;
}

/* ─────────────── Facilities / live status ─────────────── */

export type CameraId = 'entrance' | 'covered-a' | 'open-b' | 'shuttle';
export type FeedStatus = 'connecting' | 'live' | 'offline';

export interface CameraStream {
  id: CameraId;
  /** Rendering strategy; `simulated` is used when no NextFrame endpoint is configured. */
  source: 'simulated' | 'nextframe';
}

export interface ParkingSector {
  id: 'covered' | 'open';
  capacity: number;
}

export interface ShuttleDeparture {
  /** Minutes after midnight */
  minutes: number;
  /** Direction of travel */
  from: 'parking' | 'terminal';
}
