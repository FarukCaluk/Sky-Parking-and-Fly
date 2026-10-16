import { MAX_STAY_DAYS, MIN_STAY_DAYS } from '@/data/pricing';
import type { GuestField, StayErrorCode } from '@/types';
import type { ValidationCode } from '@/utils/validation';
import type { Messages } from './messages';

/** Text for a guest-field validation code, or `undefined` when the dictionary has none for that combination. */
export function fieldMessage(m: Messages, field: GuestField, code: ValidationCode): string | undefined {
  const group = m.reservation.errors[field as keyof Messages['reservation']['errors']] as
    Partial<Record<ValidationCode, string>> | undefined;
  return group?.[code];
}

/** Text for a stay validation code. The length messages quote the limit they are about. */
export function stayMessage(m: Messages, code: StayErrorCode): string {
  const entry = m.stayErrors[code];
  return typeof entry === 'function' ? entry(code === 'rangeTooShort' ? MIN_STAY_DAYS : MAX_STAY_DAYS) : entry;
}
