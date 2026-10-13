import type { GuestDetails, GuestField } from '@/types';

/** Why a field is invalid; the visible text comes from `messages.reservation.errors[field][code]`. */
export type ValidationCode = 'required' | 'invalid';

export type FieldErrors<K extends string> = Partial<Record<K, ValidationCode>>;

const HAS_LETTERS = /\p{L}{2,}/u;
const PLATE = /^[A-Z0-9][A-Z0-9 -]{3,11}[A-Z0-9]$/;
const FLIGHT = /^[A-Z0-9]{2}\s?\d{1,4}[A-Z]?$/;

/** Strip formatting from a phone number; `00...` becomes `+...`. */
export function normalizePhone(value: string): string {
  const stripped = value.replace(/[\s().\-/]/g, '');
  return stripped.startsWith('00') ? `+${stripped.slice(2)}` : stripped;
}

export function isValidPhone(value: string): boolean {
  const phone = normalizePhone(value);
  // International (+387...) or local trunk format (061..., 033...)
  return /^\+\d{8,15}$/.test(phone) || /^0\d{7,9}$/.test(phone);
}

/** Convert a locally written number to E.164 when it is a Bosnian one. */
export function toInternationalPhone(value: string): string {
  const phone = normalizePhone(value);
  return /^0\d{7,9}$/.test(phone) ? `+387${phone.slice(1)}` : phone;
}

/** Upper-case and collapse whitespace; used for plates and flight numbers. */
export function normalizeCode(value: string): string {
  return value.toUpperCase().replace(/\s+/g, ' ').trim();
}

/** Only the name is required; phone, plate and flight are checked when filled in. */
export function validateGuest(guest: GuestDetails): FieldErrors<GuestField> {
  const errors: FieldErrors<GuestField> = {};

  const name = guest.name.trim();
  if (!name) errors.name = 'required';
  else if (!HAS_LETTERS.test(name)) errors.name = 'invalid';

  if (guest.phone.trim() && !isValidPhone(guest.phone)) errors.phone = 'invalid';

  const plate = normalizeCode(guest.plate);
  if (plate && !PLATE.test(plate)) errors.plate = 'invalid';

  const flight = normalizeCode(guest.flight);
  if (flight && !FLIGHT.test(flight)) errors.flight = 'invalid';

  return errors;
}

export const hasErrors = (errors: object): boolean => Object.keys(errors).length > 0;
