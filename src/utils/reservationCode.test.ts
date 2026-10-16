import { describe, expect, it } from 'vitest';
import { createReservationCode, RESERVATION_CODE_PATTERN } from './reservationCode';

describe('createReservationCode', () => {
  it('starts with the day and month of arrival and ends in four unambiguous symbols', () => {
    const code = createReservationCode('2026-10-20');
    expect(code).toMatch(RESERVATION_CODE_PATTERN);
    expect(code.startsWith('SKY-2010-')).toBe(true);
    expect(code).not.toMatch(/[01OIL]$/);
  });

  it('maps the random bytes to symbols and skips the ones that would favour a symbol', () => {
    // 248..255 are skipped; 0 -> '2', 1 -> '3', 30 -> 'Z', 31 -> '2' again
    const bytes = () => Uint8Array.from([250, 0, 1, 255, 30, 31, 249, 2]);
    expect(createReservationCode('2026-03-05', bytes)).toBe('SKY-0503-23Z2');
  });

  it('asks for more bytes when too many are skipped', () => {
    let calls = 0;
    const bytes = () => {
      calls += 1;
      return calls === 1 ? new Uint8Array(8).fill(255) : Uint8Array.from([3, 4, 5, 6, 7, 8, 9, 10]);
    };
    expect(createReservationCode('2026-12-31', bytes)).toBe('SKY-3112-5678');
    expect(calls).toBe(2);
  });

  it('gives different codes for the same day', () => {
    const codes = new Set(Array.from({ length: 200 }, () => createReservationCode('2026-10-20')));
    expect(codes.size).toBeGreaterThan(190);
  });
});
