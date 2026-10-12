import type { ShuttleDeparture } from '@/types';

/** Minutes after midnight for each departure, per direction. */
function buildSchedule(): ShuttleDeparture[] {
  const departures: ShuttleDeparture[] = [];
  for (let minutes = 0; minutes < 24 * 60;) {
    const hour = Math.floor(minutes / 60);
    // Night service every 30 minutes, daytime every 15
    const step = hour < 4 ? 30 : 15;
    departures.push({ minutes, from: 'parking' });
    // Terminal pick-ups run 7 minutes after the parking departure
    departures.push({ minutes: (minutes + 7) % (24 * 60), from: 'terminal' });
    minutes += step;
  }
  return departures.sort((a, b) => a.minutes - b.minutes);
}

export const SHUTTLE_SCHEDULE: readonly ShuttleDeparture[] = buildSchedule();

export interface UpcomingDeparture {
  from: ShuttleDeparture['from'];
  /** `HH:mm` */
  time: string;
  /** Minutes from `now` until departure */
  inMinutes: number;
}

const pad = (n: number): string => String(n).padStart(2, '0');

/** Next `count` departures in a direction, wrapping past midnight. */
export function nextDepartures(
  now: Date,
  from: ShuttleDeparture['from'],
  count = 4,
  schedule: readonly ShuttleDeparture[] = SHUTTLE_SCHEDULE,
): UpcomingDeparture[] {
  const nowMinutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
  const times = schedule.filter((d) => d.from === from).map((d) => d.minutes);
  if (times.length === 0) return [];

  const result: UpcomingDeparture[] = [];
  for (let day = 0; result.length < count && day < 3; day += 1) {
    for (const minutes of times) {
      const absolute = minutes + day * 24 * 60;
      if (absolute < nowMinutes) continue;
      result.push({
        from,
        time: `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`,
        inMinutes: Math.max(0, Math.ceil(absolute - nowMinutes)),
      });
      if (result.length === count) break;
    }
  }
  return result;
}

/** Human readable countdown: `sada`, `za 7 min`, `za 1 h 05 min`. */
export function formatCountdown(minutes: number): string {
  if (minutes <= 0) return 'sada';
  if (minutes < 60) return `za ${minutes} min`;
  return `za ${Math.floor(minutes / 60)} h ${pad(minutes % 60)} min`;
}
