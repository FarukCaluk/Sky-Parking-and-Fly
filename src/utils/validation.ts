import type { DriverDetails, DriverField, VehicleDetails, VehicleField } from '@/types';

export type FieldErrors<K extends string> = Partial<Record<K, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FULL_NAME = /^\p{L}{2,}(?:[\s'’.-]+\p{L}+)+$/u;
const PLATE = /^[A-Z0-9][A-Z0-9 -]{3,11}[A-Z0-9]$/;
const FLIGHT = /^[A-Z0-9]{2}\s?\d{1,4}[A-Z]?$/;

/** Strip formatting from a phone number; `00…` becomes `+…`. */
export function normalizePhone(value: string): string {
  const stripped = value.replace(/[\s().\-/]/g, '');
  return stripped.startsWith('00') ? `+${stripped.slice(2)}` : stripped;
}

export function isValidPhone(value: string): boolean {
  const phone = normalizePhone(value);
  // International (+387…) or local trunk format (061…, 033…)
  return /^\+\d{8,15}$/.test(phone) || /^0\d{7,9}$/.test(phone);
}

/** Convert a locally written number to E.164 when it is a Bosnian one. */
export function toInternationalPhone(value: string): string {
  const phone = normalizePhone(value);
  return /^0\d{7,9}$/.test(phone) ? `+387${phone.slice(1)}` : phone;
}

export function normalizePlate(value: string): string {
  return value.toUpperCase().replace(/\s+/g, ' ').trim();
}

export function normalizeFlight(value: string): string {
  return value.toUpperCase().replace(/\s+/g, ' ').trim();
}

export function validateDriver(driver: DriverDetails): FieldErrors<DriverField> {
  const errors: FieldErrors<DriverField> = {};
  const name = driver.fullName.trim();
  if (!name) errors.fullName = 'Unesite ime i prezime.';
  else if (!FULL_NAME.test(name)) errors.fullName = 'Unesite ime i prezime (npr. Amar Hodžić).';

  const email = driver.email.trim();
  if (!email) errors.email = 'Unesite e-mail adresu.';
  else if (!EMAIL.test(email)) errors.email = 'E-mail adresa nije ispravna.';

  if (!driver.phone.trim()) errors.phone = 'Unesite broj telefona.';
  else if (!isValidPhone(driver.phone)) errors.phone = 'Broj telefona nije ispravan (npr. 061 000 000).';

  return errors;
}

export function validateVehicle(vehicle: VehicleDetails): FieldErrors<VehicleField> {
  const errors: FieldErrors<VehicleField> = {};

  const plate = normalizePlate(vehicle.plate);
  if (!plate) errors.plate = 'Unesite registarske tablice.';
  else if (!PLATE.test(plate)) errors.plate = 'Tablice nisu ispravne (npr. A12-K-345).';

  if (vehicle.make.trim().length < 2) errors.make = 'Unesite marku i model vozila.';

  const passengers = Number(vehicle.passengers);
  if (!vehicle.passengers.trim()) errors.passengers = 'Unesite broj putnika.';
  else if (!Number.isInteger(passengers) || passengers < 1 || passengers > 8) {
    errors.passengers = 'Broj putnika mora biti od 1 do 8.';
  }

  const flight = normalizeFlight(vehicle.flightNumber);
  if (flight && !FLIGHT.test(flight)) errors.flightNumber = 'Broj leta nije ispravan (npr. JU 123).';

  return errors;
}

export const hasErrors = (errors: object): boolean => Object.keys(errors).length > 0;
