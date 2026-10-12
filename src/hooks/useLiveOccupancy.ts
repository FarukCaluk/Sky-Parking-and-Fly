import { useEffect, useState } from 'react';
import { SECTOR_BASE_FILL, SECTORS } from '@/data/facilities';
import type { ParkingSector } from '@/types';

export interface SectorOccupancy {
  sector: ParkingSector;
  occupied: number;
  free: number;
  /** 0–100 */
  percent: number;
}

const MIN_FILL = 0.35;
const MAX_FILL = 0.94;
const clamp = (n: number, min: number, max: number): number => Math.min(max, Math.max(min, n));

function snapshot(occupied: Record<string, number>): SectorOccupancy[] {
  return SECTORS.map((sector) => {
    const count = occupied[sector.id] ?? 0;
    return {
      sector,
      occupied: count,
      free: sector.capacity - count,
      percent: Math.round((count / sector.capacity) * 100),
    };
  });
}

function initial(): Record<string, number> {
  return Object.fromEntries(SECTORS.map((s) => [s.id, Math.round(s.capacity * SECTOR_BASE_FILL[s.id])]));
}

/**
 * Simulated occupancy feed: a bounded random walk around each sector's typical fill.
 * Swap the interval for a WebSocket / SSE subscription when a gate-controller API is available.
 */
export function useLiveOccupancy(intervalMs = 5000): SectorOccupancy[] {
  const [occupied, setOccupied] = useState<Record<string, number>>(initial);

  useEffect(() => {
    const id = window.setInterval(() => {
      setOccupied((prev) =>
        Object.fromEntries(
          SECTORS.map((s) => {
            const step = Math.round((Math.random() - 0.5) * 5); // −2 … +2 vehicles
            const next = clamp((prev[s.id] ?? 0) + step, s.capacity * MIN_FILL, s.capacity * MAX_FILL);
            return [s.id, Math.round(next)];
          }),
        ),
      );
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);

  return snapshot(occupied);
}
