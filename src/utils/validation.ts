import type { GuestDetails, GuestField } from '@/types';

/** Why a field is invalid; the visible text comes from `messages.reservation.errors[field][code]`. */
export type ValidationCode = 'required' | 'invalid';

export type FieldErrors<K extends string> = Partial<Record<K, ValidationCode>>;

const HAS_LETTERS = /\p{L}{2,}/u;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
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

/** Upper-case and collapse whitespace; used for flight numbers. */
export function normalizeCode(value: string): string {
  return value.toUpperCase().replace(/\s+/g, ' ').trim();
}

/**
 * The name is always required. A reservation that is sent to us as a form also needs a phone number,
 * because it is the only way to answer it; a message sent from the visitor's own app carries their number.
 * E-mail and flight number are checked when filled in.
 */
export function validateGuest(
  guest: GuestDetails,
  { requirePhone = false }: { requirePhone?: boolean } = {},
): FieldErrors<GuestField> {
  const errors: FieldErrors<GuestField> = {};

  const name = guest.name.trim();
  if (!name) errors.name = 'required';
  else if (!HAS_LETTERS.test(name)) errors.name = 'invalid';

  const phone = guest.phone.trim();
  if (!phone) {
    if (requirePhone) errors.phone = 'required';
  } else if (!isValidPhone(phone)) {
    errors.phone = 'invalid';
  }

  const email = guest.email.trim();
  if (email && !EMAIL.test(email)) errors.email = 'invalid';

  const flight = normalizeCode(guest.flight);
  if (flight && !FLIGHT.test(flight)) errors.flight = 'invalid';

  return errors;
}

export const hasErrors = (errors: object): boolean => Object.keys(errors).length > 0;
