import { describe, expect, it } from 'vitest';
import { formatDays, formatKM, formatNumberBs, formatServices, pluralBs } from './format';

describe('formatKM', () => {
  it('drops empty cents and uses a decimal comma', () => {
    expect(formatKM(12)).toBe('12 KM');
    expect(formatKM(12.5)).toBe('12,50 KM');
    expect(formatKM(0)).toBe('0 KM');
  });

  it('groups thousands with a dot', () => {
    expect(formatKM(1250)).toBe('1.250 KM');
    expect(formatKM(12345.6)).toBe('12.345,60 KM');
  });

  it('can omit the currency and survives bad numbers', () => {
    expect(formatKM(7.5, { withCurrency: false })).toBe('7,50');
    expect(formatKM(Number.NaN)).toBe('0 KM');
  });
});

describe('Bosnian plurals', () => {
  it.each([
    [1, '1 dan'],
    [2, '2 dana'],
    [5, '5 dana'],
    [11, '11 dana'],
    [21, '21 dan'],
    [22, '22 dana'],
  ])('formatDays(%i)', (n, expected) => {
    expect(formatDays(n)).toBe(expected);
  });

  it('formats services', () => {
    expect(formatServices(1)).toBe('1 usluga');
    expect(formatServices(3)).toBe('3 usluge');
    expect(formatServices(5)).toBe('5 usluga');
  });

  it('handles teens correctly', () => {
    expect(pluralBs(12, ['a', 'b', 'c'])).toBe('c');
    expect(pluralBs(24, ['a', 'b', 'c'])).toBe('b');
  });
});

describe('formatNumberBs', () => {
  it('groups thousands with a dot and uses a decimal comma', () => {
    expect(formatNumberBs(52000)).toBe('52.000');
    expect(formatNumberBs(4.9, 1)).toBe('4,9');
    expect(formatNumberBs(1284)).toBe('1.284');
    expect(formatNumberBs(98)).toBe('98');
    expect(formatNumberBs(0.4, 0)).toBe('0');
  });
});
