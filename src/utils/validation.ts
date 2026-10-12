import type { DriverDetails, DriverField, VehicleDetails, VehicleField } from '@/types';

/** Why a field is invalid; the visible text comes from `messages.validation[field][code]`. */
export type ValidationCode = 'required' | 'invalid' | 'range';

export type FieldErrors<K extends string> = Partial<Record<K, ValidationCode>>;

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
  if (!name) errors.fullName = 'required';
  else if (!FULL_NAME.test(name)) errors.fullName = 'invalid';

  const email = driver.email.trim();
  if (!email) errors.email = 'required';
  else if (!EMAIL.test(email)) errors.email = 'invalid';

  if (!driver.phone.trim()) errors.phone = 'required';
  else if (!isValidPhone(driver.phone)) errors.phone = 'invalid';

  return errors;
}

export function validateVehicle(vehicle: VehicleDetails): FieldErrors<VehicleField> {
  const errors: FieldErrors<VehicleField> = {};

  const plate = normalizePlate(vehicle.plate);
  if (!plate) errors.plate = 'required';
  else if (!PLATE.test(plate)) errors.plate = 'invalid';

  if (vehicle.make.trim().length < 2) errors.make = 'required';

  const passengers = Number(vehicle.passengers);
  if (!vehicle.passengers.trim()) errors.passengers = 'required';
  else if (!Number.isInteger(passengers) || passengers < 1 || passengers > 8) errors.passengers = 'range';

  const flight = normalizeFlight(vehicle.flightNumber);
  if (flight && !FLIGHT.test(flight)) errors.flightNumber = 'invalid';

  return errors;
}

export const hasErrors = (errors: object): boolean => Object.keys(errors).length > 0;
