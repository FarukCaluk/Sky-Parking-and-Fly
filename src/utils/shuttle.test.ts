import { describe, expect, it } from 'vitest';
import { formatCountdown, nextDepartures, SHUTTLE_SCHEDULE } from './shuttle';

describe('shuttle schedule', () => {
  it('runs every 15 minutes by day and every 30 at night', () => {
    const parking = SHUTTLE_SCHEDULE.filter((d) => d.from === 'parking').map((d) => d.minutes);
    expect(parking.slice(0, 4)).toEqual([0, 30, 60, 90]);
    expect(parking).toContain(4 * 60);
    expect(parking).toContain(4 * 60 + 15);
    expect(parking).toContain(23 * 60 + 45);
  });
});

describe('nextDepartures', () => {
  it('returns the upcoming departures in order', () => {
    const list = nextDepartures(new Date(2026, 9, 12, 9, 1), 'parking', 3);
    expect(list.map((d) => d.time)).toEqual(['09:15', '09:30', '09:45']);
    expect(list[0]?.inMinutes).toBe(14);
  });

  it('treats a departure at the current minute as "now"', () => {
    const list = nextDepartures(new Date(2026, 9, 12, 9, 15, 0), 'parking', 1);
    expect(list[0]).toMatchObject({ time: '09:15', inMinutes: 0 });
  });

  it('wraps past midnight', () => {
    const list = nextDepartures(new Date(2026, 9, 12, 23, 50), 'parking', 2);
    expect(list.map((d) => d.time)).toEqual(['00:00', '00:30']);
    expect(list[0]?.inMinutes).toBe(10);
  });

  it('offsets terminal pick-ups', () => {
    const list = nextDepartures(new Date(2026, 9, 12, 9, 1), 'terminal', 2);
    expect(list.map((d) => d.time)).toEqual(['09:07', '09:22']);
  });
});

describe('formatCountdown', () => {
  it('formats minutes and hours', () => {
    expect(formatCountdown(0)).toBe('sada');
    expect(formatCountdown(7)).toBe('za 7 min');
    expect(formatCountdown(65)).toBe('za 1 h 05 min');
  });
});
