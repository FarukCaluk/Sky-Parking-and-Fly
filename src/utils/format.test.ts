import { describe, expect, it } from 'vitest';
import { MESSAGES } from '@/i18n/messages';
import { formatKM, formatNumber, formatPercent } from './format';

describe('formatKM', () => {
  it('drops empty cents and uses a decimal comma in bs and de', () => {
    expect(formatKM(12, 'bs')).toBe('12 KM');
    expect(formatKM(12.5, 'bs')).toBe('12,50 KM');
    expect(formatKM(12.5, 'de')).toBe('12,50 KM');
    expect(formatKM(0, 'bs')).toBe('0 KM');
  });

  it('uses a decimal point and comma grouping in English', () => {
    expect(formatKM(12.5, 'en')).toBe('12.50 KM');
    expect(formatKM(1250, 'en')).toBe('1,250 KM');
    expect(formatKM(12345.6, 'en')).toBe('12,345.60 KM');
  });

  it('groups thousands with a dot in bs and de', () => {
    expect(formatKM(1250, 'bs')).toBe('1.250 KM');
    expect(formatKM(12345.6, 'de')).toBe('12.345,60 KM');
  });

  it('can omit the currency and survives bad numbers', () => {
    expect(formatKM(7.5, 'bs', { withCurrency: false })).toBe('7,50');
    expect(formatKM(Number.NaN, 'en')).toBe('0 KM');
  });

  it('keeps the sign for negative amounts', () => {
    expect(formatKM(-7.5, 'bs')).toBe('−7,50 KM');
  });
});

describe('formatNumber', () => {
  it('formats per language', () => {
    expect(formatNumber(52000, 'bs')).toBe('52.000');
    expect(formatNumber(52000, 'en')).toBe('52,000');
    expect(formatNumber(4.9, 'bs', 1)).toBe('4,9');
    expect(formatNumber(4.9, 'de', 1)).toBe('4,9');
    expect(formatNumber(4.9, 'en', 1)).toBe('4.9');
    expect(formatNumber(1284, 'bs')).toBe('1.284');
    expect(formatNumber(0.4, 'bs')).toBe('0');
  });
});

describe('formatPercent', () => {
  it('rounds to whole percent', () => {
    expect(formatPercent(12.5)).toBe('13%');
  });
});

describe('plural units', () => {
  it.each([
    [1, '1 dan'],
    [2, '2 dana'],
    [5, '5 dana'],
    [11, '11 dana'],
    [21, '21 dan'],
    [22, '22 dana'],
  ])('bs days(%i)', (n, expected) => {
    expect(MESSAGES.bs.units.days(n)).toBe(expected);
  });

  it('formats English and German units', () => {
    expect(MESSAGES.en.units.days(1)).toBe('1 day');
    expect(MESSAGES.en.units.days(7)).toBe('7 days');
    expect(MESSAGES.de.units.days(1)).toBe('1 Tag');
    expect(MESSAGES.de.units.days(7)).toBe('7 Tage');
    expect(MESSAGES.en.units.services(3)).toBe('3 services');
    expect(MESSAGES.de.units.services(1)).toBe('1 Leistung');
  });

  it('formats bs services including teens', () => {
    expect(MESSAGES.bs.units.services(1)).toBe('1 usluga');
    expect(MESSAGES.bs.units.services(3)).toBe('3 usluge');
    expect(MESSAGES.bs.units.services(5)).toBe('5 usluga');
    expect(MESSAGES.bs.units.services(12)).toBe('12 usluga');
  });
});
