import type { CameraId } from '@/types';

const W = 640;
const H = 360;
const CAR_COLORS = ['#d6d9df', '#2a2e37', '#6b7280', '#1e3a8a', '#7f1d1d', '#e5e7eb', '#14532d', '#334155'] as const;

function seeded(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

interface ParkedCar {
  x: number;
  y: number;
  color: string;
}

/** Deterministic parked-car layout for a camera, so every visit shows the same lot. */
function layoutFor(id: CameraId): ParkedCar[] {
  const rand = seeded([...id].reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 7));
  const fill = id === 'covered-a' ? 0.82 : id === 'open-b' ? 0.55 : id === 'entrance' ? 0.35 : 0.3;
  const cars: ParkedCar[] = [];
  for (const rowY of [48, 232]) {
    for (let i = 0; i < 12; i += 1) {
      if (rand() > fill) continue;
      cars.push({
        x: 22 + i * 51,
        y: rowY + (rand() > 0.5 ? 3 : 0),
        color: CAR_COLORS[Math.floor(rand() * CAR_COLORS.length)] ?? '#6b7280',
      });
    }
  }
  return cars;
}

function Car({ x, y, color, light = false }: ParkedCar & { light?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="34" height="72" rx="9" fill={color} />
      <rect x="4" y="16" width="26" height="14" rx="4" fill="#0b0d12" opacity="0.75" />
      <rect x="4" y="46" width="26" height="9" rx="3" fill="#0b0d12" opacity="0.6" />
      {light && (
        <>
          <ellipse cx="9" cy="70" rx="5" ry="2" fill="#fff6c8" />
          <ellipse cx="25" cy="70" rx="5" ry="2" fill="#fff6c8" />
        </>
      )}
    </g>
  );
}

/** Stylised top-down CCTV view. Purely decorative — real frames replace it when a NextFrame source is configured. */
export function FeedScene({ camera }: { camera: CameraId }) {
  const cars = layoutFor(camera);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full"
      focusable="false"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`asphalt-${camera}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#23262d" />
          <stop offset="1" stopColor="#14161b" />
        </linearGradient>
        <radialGradient id={`lamp-${camera}`}>
          <stop offset="0" stopColor="#ffe9a8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffe9a8" stopOpacity="0" />
        </radialGradient>
        <pattern
          id={`stripe-${camera}`}
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="8" height="16" fill="#e5484d" />
          <rect x="8" width="8" height="16" fill="#f4f4f5" />
        </pattern>
      </defs>

      <rect width={W} height={H} fill={`url(#asphalt-${camera})`} />

      {/* Bay markings */}
      <g stroke="#ffffff" strokeOpacity="0.16" strokeWidth="1.5">
        {[40, 224].map((y) =>
          Array.from({ length: 13 }, (_, i) => (
            <line key={`${y}-${i}`} x1={14 + i * 51} x2={14 + i * 51} y1={y} y2={y + 88} />
          )),
        )}
      </g>
      <line
        x1="0"
        x2={W}
        y1={H / 2 - 4}
        y2={H / 2 - 4}
        stroke="#fff"
        strokeOpacity="0.22"
        strokeWidth="2"
        strokeDasharray="22 18"
      />

      {cars.map((car) => (
        <Car key={`${car.x}-${car.y}`} {...car} />
      ))}

      {camera === 'covered-a' && (
        <g opacity="0.5">
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x="0" y={20 + i * 96} width={W} height="14" fill="#000" opacity="0.35" />
          ))}
        </g>
      )}

      {camera === 'open-b' &&
        [110, 330, 550].map((x) => <circle key={x} cx={x} cy={H / 2 - 4} r="90" fill={`url(#lamp-${camera})`} />)}

      {camera === 'entrance' && (
        <g>
          <rect x="296" y="118" width="10" height="124" rx="3" fill="#3f3f46" />
          <rect x="296" y="168" width="150" height="9" rx="4" fill={`url(#stripe-${camera})`} className="origin-left" />
          <rect x="262" y="104" width="36" height="22" rx="5" fill="#18181b" stroke="#52525b" />
          <circle cx="280" cy="115" r="4" fill="#34d399" className="animate-blink" />
        </g>
      )}

      {camera === 'shuttle' && (
        <g>
          <rect x="120" y="150" width="190" height="52" rx="14" fill="#f4f4f5" />
          <rect x="120" y="150" width="190" height="14" rx="7" fill="#0071e3" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={136 + i * 34} y="172" width="24" height="16" rx="3" fill="#0b0d12" opacity="0.7" />
          ))}
          <circle cx="360" cy="190" r="4" fill="#fbbf24" />
          <circle cx="372" cy="198" r="4" fill="#93c5fd" />
          <circle cx="352" cy="204" r="4" fill="#fda4af" />
          <rect x="332" y="228" width="70" height="10" rx="3" fill="#52525b" />
        </g>
      )}

      {/* Vehicle driving through the lane */}
      <g className="animate-drive">
        <g transform={`translate(0 ${H / 2 - 22}) rotate(-90 17 36) translate(-20 6)`}>
          <Car x={0} y={0} color="#cfd3da" light />
        </g>
      </g>
    </svg>
  );
}
