import type { StayErrorCode } from '@/types';
import type { ValidationCode } from '@/utils/validation';
import type { Messages } from './messages';

type FieldKey = Exclude<keyof Messages['validation'], 'stay'>;

/** Text for a field validation code, or `undefined` when the dictionary has none for that combination. */
export function fieldMessage(m: Messages, field: string, code: ValidationCode): string | undefined {
  const group = m.validation[field as FieldKey] as Partial<Record<ValidationCode, string>> | undefined;
  return group?.[code];
}

/** Text for a stay validation code (needs `maxDays` for the "too long" message). */
export function stayMessage(m: Messages, code: StayErrorCode, maxDays: number): string {
  const entry = m.validation.stay[code];
  return typeof entry === 'function' ? entry(maxDays) : entry;
}
