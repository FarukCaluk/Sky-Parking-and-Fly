import type { CameraStream, ParkingSector } from '@/types';

export const SECTORS: readonly ParkingSector[] = [
  { id: 'covered', label: 'Natkriveni sektor A', capacity: 180 },
  { id: 'open', label: 'Otvoreni sektor B', capacity: 420 },
];

export const CAMERAS: readonly CameraStream[] = [
  { id: 'entrance', label: 'Ulaz i rampa', zone: 'Glavni ulaz', source: 'simulated' },
  { id: 'covered-a', label: 'Sektor A', zone: 'Natkriveni parking', source: 'simulated' },
  { id: 'open-b', label: 'Sektor B', zone: 'Otvoreni parking', source: 'simulated' },
  { id: 'shuttle', label: 'Shuttle stanica', zone: 'Točka polaska', source: 'simulated' },
];

/** Base fraction of the sector that is occupied (0–1) before the live fluctuation is applied. */
export const SECTOR_BASE_FILL: Record<ParkingSector['id'], number> = {
  covered: 0.74,
  open: 0.56,
};
