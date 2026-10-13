import type { GuestField, StayErrorCode } from '@/types';
import type { ValidationCode } from '@/utils/validation';
import type { Messages } from './messages';

/** Text for a guest-field validation code, or `undefined` when the dictionary has none for that combination. */
export function fieldMessage(m: Messages, field: GuestField, code: ValidationCode): string | undefined {
  const group = m.reservation.errors[field as keyof Messages['reservation']['errors']] as
    Partial<Record<ValidationCode, string>> | undefined;
  return group?.[code];
}

/** Text for a stay validation code (needs `maxDays` for the "too long" message). */
export function stayMessage(m: Messages, code: StayErrorCode, maxDays: number): string {
  const entry = m.stayErrors[code];
  return typeof entry === 'function' ? entry(maxDays) : entry;
}
