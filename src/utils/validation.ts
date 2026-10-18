import type { GuestDetails, GuestField } from '../types/index.ts';

/** Why a field is invalid; the visible text comes from `messages.reservation.errors[field][code]`. */
export type ValidationCode = 'required' | 'invalid';

export type FieldErrors<K extends string> = Partial<Record<K, ValidationCode>>;

const HAS_LETTERS = /\p{L}{2,}/u;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Strip formatting from a phone number; `00...` becomes `+...`. */
export function normalizePhone(value: string): string {
  const stripped = value.replace(/[\s().\-/]/g, '');
  return stripped.startsWith('00') ? `+${stripped.slice(2)}` : stripped;
}

/**
 * Guests come from many countries, so no national format is expected: any number of 6 to 18 digits, with an optional
 * `+` or `00` in front and the usual separators (spaces, dots, dashes, brackets), is accepted.
 */
export function isValidPhone(value: string): boolean {
  return /^\+?\d{6,18}$/.test(normalizePhone(value));
}

/** Upper-case and collapse whitespace; used for flight numbers (which are never checked: airlines write them in many ways). */
export function normalizeCode(value: string): string {
  return value.toUpperCase().replace(/\s+/g, ' ').trim();
}

/**
 * The name is always required. A reservation that is sent to us as a form also needs a phone number, because it is
 * the only way to reach the guest, an e-mail address, because that is where the confirmation goes, and the make of
 * the car; a message sent from the visitor's own app carries their number. The flight number is free text.
 */
export function validateGuest(
  guest: GuestDetails,
  {
    requirePhone = false,
    requireEmail = false,
    requireMake = false,
  }: { requirePhone?: boolean; requireEmail?: boolean; requireMake?: boolean } = {},
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
  if (!email) {
    if (requireEmail) errors.email = 'required';
  } else if (!EMAIL.test(email)) {
    errors.email = 'invalid';
  }

  if (requireMake && !guest.make.trim()) errors.make = 'required';

  return errors;
}

export const hasErrors = (errors: object): boolean => Object.keys(errors).length > 0;
