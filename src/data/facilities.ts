import type { CameraStream, ParkingSector } from '@/types';

export const SECTORS: readonly ParkingSector[] = [
  { id: 'covered', capacity: 180 },
  { id: 'open', capacity: 420 },
];

export const CAMERAS: readonly CameraStream[] = [
  { id: 'entrance', source: 'simulated' },
  { id: 'covered-a', source: 'simulated' },
  { id: 'open-b', source: 'simulated' },
  { id: 'shuttle', source: 'simulated' },
];

/** Base fraction of the sector that is occupied (0–1) before the live fluctuation is applied. */
export const SECTOR_BASE_FILL: Record<ParkingSector['id'], number> = {
  covered: 0.74,
  open: 0.56,
};
