import { m, useTransform, type MotionValue } from 'framer-motion';
import { Plane } from 'lucide-react';
import { useI18n } from '@/i18n/context';
import { cn } from '@/utils/cn';

/** Two cubic Bezier segments from the parking (bottom left) to the airport (top right), in viewBox units. */
const SEGMENTS = [
  [
    [104, 404],
    [104, 326],
    [238, 338],
    [300, 268],
  ],
  [
    [300, 268],
    [362, 198],
    [496, 224],
    [496, 112],
  ],
] as const;
const PATH = 'M104 404 C104 326 238 338 300 268 C362 198 496 224 496 112';
const START = SEGMENTS[0][0];
const END = SEGMENTS[1][3];

type Point = readonly [number, number];

const cubic = (p: readonly [Point, Point, Point, Point], t: number): Point => {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return [a * p[0][0] + b * p[1][0] + c * p[2][0] + d * p[3][0], a * p[0][1] + b * p[1][1] + c * p[2][1] + d * p[3][1]];
};

/** Point along the whole route for `t` in 0..1 (each segment gets half of the range). */
const pointAt = (t: number): Point => {
  const clamped = Math.min(1, Math.max(0, t));
  return clamped < 0.5 ? cubic(SEGMENTS[0], clamped * 2) : cubic(SEGMENTS[1], (clamped - 0.5) * 2);
};

interface RouteMapProps {
  /** 0 = at the parking, 1 = at the airport */
  dot: MotionValue<number>;
  /** How much of the route is drawn in the accent colour, 0..1 */
  drawn: MotionValue<number>;
  /** Journey step that is currently active (lights up the matching stop) */
  activeStep: number;
  className?: string;
}

/**
 * Schematic of the one thing the business sells: the short ride between the lot and the airport.
 * A diagram, not a map, and labelled as such.
 */
export function RouteMap({ dot, drawn, activeStep, className }: RouteMapProps) {
  const { t } = useI18n();
  const x = useTransform(dot, (v) => pointAt(v)[0]);
  const y = useTransform(dot, (v) => pointAt(v)[1]);
  // Hidden while parked at either stop, so it never covers the P or the plane
  const dotOpacity = useTransform(dot, [0, 0.04, 0.96, 1], [0, 1, 1, 0]);
  const parkingLit = activeStep === 1 || activeStep === 3;
  const airportLit = activeStep === 2;

  return (
    <div
      role="img"
      aria-label={t.journey.map.aria}
      className={cn('relative overflow-hidden rounded-[10px] border border-line bg-surface', className)}
    >
      <svg viewBox="0 0 600 520" className="size-full" aria-hidden="true" focusable="false">
        {/* runway behind the airport */}
        <g transform="rotate(-22 440 96)">
          <rect x="300" y="82" width="300" height="30" rx="3" className="fill-ink/[0.06]" />
          <line x1="312" x2="588" y1="97" y2="97" className="stroke-ink/25" strokeWidth="2" strokeDasharray="16 12" />
        </g>

        <path
          d={PATH}
          fill="none"
          className="stroke-line-strong"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1 11"
        />
        <m.path
          d={PATH}
          fill="none"
          className="stroke-accent"
          strokeWidth="5"
          strokeLinecap="round"
          style={{ pathLength: drawn }}
        />

        {/* parking */}
        <g transform={`translate(${START[0]} ${START[1]})`}>
          <rect
            x="-30"
            y="-30"
            width="60"
            height="60"
            rx="8"
            className={cn(
              'fill-canvas transition-[stroke] duration-500',
              parkingLit ? 'stroke-accent' : 'stroke-line-strong',
            )}
            strokeWidth="4"
          />
          <text
            textAnchor="middle"
            dominantBaseline="central"
            y="2"
            className="fill-ink font-display text-[44px] font-extrabold"
          >
            P
          </text>
        </g>

        {/* airport */}
        <g transform={`translate(${END[0]} ${END[1]})`}>
          <circle
            r="32"
            className={cn(
              'fill-canvas transition-[stroke] duration-500',
              airportLit ? 'stroke-accent' : 'stroke-line-strong',
            )}
            strokeWidth="4"
          />
          <Plane x={-16} y={-16} width={32} height={32} strokeWidth={1.75} className="stroke-ink" />
        </g>

        {/* shuttle */}
        <m.g style={{ x, y, opacity: dotOpacity }}>
          <circle r="10" className="origin-center animate-halo fill-accent/50 [transform-box:fill-box]" />
          <circle r="10" className="fill-accent stroke-canvas" strokeWidth="3" />
        </m.g>
      </svg>

      <div className="pointer-events-none absolute left-[17.3%] top-[89%] -translate-x-1/2 text-center">
        <p className="display text-[1.375rem] leading-none text-ink">{t.journey.map.parking}</p>
      </div>
      <div className="pointer-events-none absolute left-[82.7%] top-[36%] -translate-x-1/2 text-center">
        <p className="display text-[1.375rem] leading-none text-ink">{t.journey.map.airport}</p>
      </div>
      <div className="pointer-events-none absolute left-[57%] top-[60%]">
        <p className="display tabular text-[clamp(2.75rem,2rem+3vw,4.5rem)] leading-[0.9] text-ink">
          {t.journey.map.distance}
        </p>
        <p className="label mt-1 text-[1.0625rem] text-accent-text">{t.journey.map.time}</p>
      </div>
      <p className="pointer-events-none absolute bottom-3 right-4 text-[0.75rem] text-ink-faint">
        {t.journey.map.note}
      </p>
    </div>
  );
}
