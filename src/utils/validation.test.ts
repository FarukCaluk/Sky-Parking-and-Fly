import { describe, expect, it } from 'vitest';
import type { GuestDetails } from '@/types';
import { isValidPhone, normalizeCode, normalizePhone, toInternationalPhone, validateGuest } from './validation';

const guest: GuestDetails = { name: 'Amar Hodžić', phone: '', email: '', make: '', flight: '', note: '' };

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
  it('needs only a name for a message the visitor sends themselves', () => {
    expect(validateGuest(guest)).toEqual({});
    expect(validateGuest({ ...guest, name: '  ' }).name).toBe('required');
    expect(validateGuest({ ...guest, name: '12 34' }).name).toBe('invalid');
    expect(validateGuest({ ...guest, name: 'Đorđe Šašić-Čolić' }).name).toBeUndefined();
  });

  it('also needs a phone number when the reservation is sent to us as a form', () => {
    expect(validateGuest(guest, { requirePhone: true }).phone).toBe('required');
    expect(validateGuest({ ...guest, phone: '061 123 456' }, { requirePhone: true })).toEqual({});
    expect(validateGuest({ ...guest, phone: '123' }, { requirePhone: true }).phone).toBe('invalid');
  });

  it('checks e-mail and flight number only when they are filled in', () => {
    expect(validateGuest({ ...guest, email: 'amar@' }).email).toBe('invalid');
    expect(validateGuest({ ...guest, email: 'amar@example.ba' }).email).toBeUndefined();
    expect(validateGuest({ ...guest, flight: 'nope' }).flight).toBe('invalid');
    expect(validateGuest({ ...guest, flight: 'fr 1234' }).flight).toBeUndefined();
  });

  it('accepts any vehicle make', () => {
    expect(validateGuest({ ...guest, make: 'VW Golf 7' })).toEqual({});
  });
});

describe('normalizeCode', () => {
  it('upper-cases and collapses spaces', () => {
    expect(normalizeCode('fr   1234')).toBe('FR 1234');
    expect(normalizeCode('  w6 4321 ')).toBe('W6 4321');
  });
});
