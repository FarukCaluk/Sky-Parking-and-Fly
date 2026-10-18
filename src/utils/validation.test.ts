import { describe, expect, it } from 'vitest';
import type { GuestDetails } from '@/types';
import { isValidPhone, normalizeCode, normalizePhone, validateGuest } from './validation';

const guest: GuestDetails = { name: 'Amar Hodžić', phone: '', email: '', make: '', flight: '', note: '' };

describe('phone', () => {
  it.each([
    '061 123 456',
    '+387 62 963 901',
    '00387 62 963 901',
    '(033) 123-456',
    '+49 170 1234567',
    '0151 23456789',
    '+1 (415) 555-2671',
    '+44 7911 123456',
    '+90 532 123 45 67',
  ])('accepts %s', (value) => {
    expect(isValidPhone(value)).toBe(true);
  });

  it.each(['', '12345', 'abc', '+38', '06123', '+49 abc 12345', '1234567890123456789'])('rejects %s', (value) => {
    expect(isValidPhone(value)).toBe(false);
  });

  it('strips the separators and writes a leading 00 as +', () => {
    expect(normalizePhone('00387 62 963 901')).toBe('+38762963901');
    expect(normalizePhone('(033) 123-456')).toBe('033123456');
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

  it('also needs an e-mail address when the confirmation has to be mailed', () => {
    const form = { requirePhone: true, requireEmail: true };
    expect(validateGuest({ ...guest, phone: '061 123 456' }, form).email).toBe('required');
    expect(validateGuest({ ...guest, phone: '061 123 456', email: 'amar@example.ba' }, form)).toEqual({});
    expect(validateGuest({ ...guest, phone: '061 123 456', email: 'amar@' }, form).email).toBe('invalid');
  });

  it('checks the e-mail address only when it is filled in', () => {
    expect(validateGuest({ ...guest, email: 'amar@' }).email).toBe('invalid');
    expect(validateGuest({ ...guest, email: 'amar@example.ba' }).email).toBeUndefined();
  });

  it('needs the make of the car when the reservation is sent as a form', () => {
    expect(validateGuest(guest, { requireMake: true }).make).toBe('required');
    expect(validateGuest({ ...guest, make: '  ' }, { requireMake: true }).make).toBe('required');
    expect(validateGuest({ ...guest, make: 'VW Golf 7' }, { requireMake: true })).toEqual({});
    expect(validateGuest(guest).make).toBeUndefined();
  });

  it('never rejects a flight number, however it is written', () => {
    for (const flight of ['nope', 'fr 1234', 'LH 1234 / OS 5678', 'ba-8741']) {
      expect(validateGuest({ ...guest, flight }).flight).toBeUndefined();
    }
  });
});

describe('normalizeCode', () => {
  it('upper-cases and collapses spaces', () => {
    expect(normalizeCode('fr   1234')).toBe('FR 1234');
    expect(normalizeCode('  w6 4321 ')).toBe('W6 4321');
  });
});
