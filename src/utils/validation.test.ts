import { describe, expect, it } from 'vitest';
import { isValidPhone, normalizePhone, toInternationalPhone, validateDriver, validateVehicle } from './validation';

const driver = { fullName: 'Amar Hodžić', email: 'amar@example.com', phone: '061 000 000' };
const vehicle = { plate: 'a12-k-345', make: 'VW Golf 7', color: '', passengers: '2', flightNumber: '' };

describe('phone', () => {
  it.each(['061 000 000', '+387 61 000 000', '00387 61 000 000', '(033) 123-456', '+49 170 1234567'])(
    'accepts %s',
    (value) => {
      expect(isValidPhone(value)).toBe(true);
    },
  );

  it.each(['', '12345', 'abc', '+38', '06123'])('rejects %s', (value) => {
    expect(isValidPhone(value)).toBe(false);
  });

  it('normalises to international form', () => {
    expect(normalizePhone('00387 61 000 000')).toBe('+38761000000');
    expect(toInternationalPhone('061 000 000')).toBe('+38761000000');
    expect(toInternationalPhone('+49 170 1234567')).toBe('+491701234567');
  });
});

describe('validateDriver', () => {
  it('passes a complete, valid driver', () => {
    expect(validateDriver(driver)).toEqual({});
  });

  it('requires a first and last name made of letters', () => {
    expect(validateDriver({ ...driver, fullName: 'Amar' }).fullName).toBeDefined();
    expect(validateDriver({ ...driver, fullName: '12 34' }).fullName).toBeDefined();
    expect(validateDriver({ ...driver, fullName: 'Đorđe Šašić-Čolić' }).fullName).toBeUndefined();
  });

  it('flags every empty field', () => {
    const errors = validateDriver({ fullName: '', email: '', phone: '' });
    expect(Object.keys(errors).sort()).toEqual(['email', 'fullName', 'phone']);
  });

  it('validates email shape', () => {
    expect(validateDriver({ ...driver, email: 'amar@' }).email).toBeDefined();
    expect(validateDriver({ ...driver, email: 'amar@example' }).email).toBeDefined();
  });
});

describe('validateVehicle', () => {
  it('passes a valid vehicle', () => {
    expect(validateVehicle(vehicle)).toEqual({});
  });

  it('checks plate shape, passengers and flight number', () => {
    expect(validateVehicle({ ...vehicle, plate: 'x' }).plate).toBeDefined();
    expect(validateVehicle({ ...vehicle, plate: '' }).plate).toBeDefined();
    expect(validateVehicle({ ...vehicle, passengers: '0' }).passengers).toBeDefined();
    expect(validateVehicle({ ...vehicle, passengers: '9' }).passengers).toBeDefined();
    expect(validateVehicle({ ...vehicle, passengers: '2.5' }).passengers).toBeDefined();
    expect(validateVehicle({ ...vehicle, flightNumber: 'ju 123' }).flightNumber).toBeUndefined();
    expect(validateVehicle({ ...vehicle, flightNumber: 'nope' }).flightNumber).toBeDefined();
  });
});
