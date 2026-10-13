import { describe, expect, it } from 'vitest';
import type { GuestDetails } from '@/types';
import { isValidPhone, normalizeCode, normalizePhone, toInternationalPhone, validateGuest } from './validation';

const guest: GuestDetails = { name: 'Amar Hodžić', phone: '', plate: '', flight: '', note: '' };

describe('phone', () => {
  it.each(['061 123 456', '+387 62 963 901', '00387 62 963 901', '(033) 123-456', '+49 170 1234567'])(
    'accepts %s',
    (value) => {
      expect(isValidPhone(value)).toBe(true);
    },
  );

  it.each(['', '12345', 'abc', '+38', '06123'])('rejects %s', (value) => {
    expect(isValidPhone(value)).toBe(false);
  });

  it('normalises to international form', () => {
    expect(normalizePhone('00387 62 963 901')).toBe('+38762963901');
    expect(toInternationalPhone('062 963 901')).toBe('+38762963901');
    expect(toInternationalPhone('+49 170 1234567')).toBe('+491701234567');
  });
});

describe('validateGuest', () => {
  it('needs only a name', () => {
    expect(validateGuest(guest)).toEqual({});
    expect(validateGuest({ ...guest, name: '  ' }).name).toBe('required');
    expect(validateGuest({ ...guest, name: '12 34' }).name).toBe('invalid');
    expect(validateGuest({ ...guest, name: 'Đorđe Šašić-Čolić' }).name).toBeUndefined();
  });

  it('checks optional fields only when they are filled in', () => {
    expect(validateGuest({ ...guest, phone: '123' }).phone).toBe('invalid');
    expect(validateGuest({ ...guest, phone: '061 123 456' }).phone).toBeUndefined();
    expect(validateGuest({ ...guest, plate: 'x' }).plate).toBe('invalid');
    expect(validateGuest({ ...guest, plate: 'a12-k-345' }).plate).toBeUndefined();
    expect(validateGuest({ ...guest, flight: 'nope' }).flight).toBe('invalid');
    expect(validateGuest({ ...guest, flight: 'fr 1234' }).flight).toBeUndefined();
  });
});

describe('normalizeCode', () => {
  it('upper-cases and collapses spaces', () => {
    expect(normalizeCode('  a12-k-345 ')).toBe('A12-K-345');
    expect(normalizeCode('fr   1234')).toBe('FR 1234');
  });
});
