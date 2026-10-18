import { m, useTransform, type MotionValue } from 'framer-motion';
import { Plane } from 'lucide-react';
import { ROUTE_MAP as MAP } from '@/data/routeMap';
import { useI18n } from '@/i18n/context';
import { cn } from '@/utils/cn';

type Point = readonly [number, number];

const [START, END] = [MAP.parking, MAP.airport] as const;
const ROUTE_PATH = `M${MAP.route.map((point) => point.join(' ')).join('L')}`;

/** Distance along the route at every corner, to place the shuttle by how far it has driven, not by corner. */
const DISTANCES = MAP.route.reduce<number[]>((all, point, index) => {
  const previous = MAP.route[index - 1];
  all.push(previous ? all[index - 1]! + Math.hypot(point[0] - previous[0], point[1] - previous[1]) : 0);
  return all;
}, []);
const TOTAL = DISTANCES.at(-1)!;

/** Point along the whole route for `t` in 0..1. */
const pointAt = (t: number): Point => {
  const wanted = Math.min(1, Math.max(0, t)) * TOTAL;
  const next = Math.max(
    1,
    DISTANCES.findIndex((distance) => distance >= wanted),
  );
  const [from, to] = [MAP.route[next - 1]!, MAP.route[next]!];
  const span = DISTANCES[next]! - DISTANCES[next - 1]!;
  const along = span === 0 ? 0 : (wanted - DISTANCES[next - 1]!) / span;
  return [from[0] + (to[0] - from[0]) * along, from[1] + (to[1] - from[1]) * along];
};

const percent = (value: number, of: number) => `${((value / of) * 100).toFixed(2)}%`;

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
 * The one thing the business sells, on the real map: the road from the lot to the airport entrance, drawn from
 * OpenStreetMap data (`scripts/build-route-map.mjs`), with the shuttle driving along it.
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
      <svg viewBox={`0 0 ${MAP.width} ${MAP.height}`} className="size-full" aria-hidden="true" focusable="false">
        {/* the airport: apron, taxiways, runway, terminal */}
        <path d={MAP.apron} className="fill-ink/[0.05]" />
        <path d={MAP.taxiways} fill="none" className="stroke-ink/[0.09]" strokeWidth="7" strokeLinejoin="round" />
        <path d={MAP.runway} fill="none" className="stroke-ink/[0.1]" strokeWidth="28" />
        <path d={MAP.runway} fill="none" className="stroke-ink/30" strokeWidth="2" strokeDasharray="14 12" />
        <path d={MAP.buildings} className="fill-ink/[0.08]" />
        <path d={MAP.terminal} className="fill-ink/[0.2]" />

        {/* streets */}
        <path
          d={MAP.roads.minor}
          fill="none"
          className="stroke-ink/[0.16]"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={MAP.roads.major}
          fill="none"
          className="stroke-ink/[0.26]"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* the road to the airport: a light edge keeps it apart from the streets it uses */}
        <path
          d={ROUTE_PATH}
          fill="none"
          className="stroke-surface"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={ROUTE_PATH}
          fill="none"
          className="stroke-line-strong"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1 9"
        />
        <m.path
          d={ROUTE_PATH}
          fill="none"
          className="stroke-accent"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: drawn }}
        />

        {/* parking */}
        <g transform={`translate(${START[0]} ${START[1]})`}>
          <rect
            x="-22"
            y="-22"
            width="44"
            height="44"
            rx="7"
            className={cn(
              'fill-canvas transition-[stroke] duration-500',
              parkingLit ? 'stroke-accent' : 'stroke-line-strong',
            )}
            strokeWidth="3.5"
          />
          <text
            textAnchor="middle"
            dominantBaseline="central"
            y="2"
            className="fill-ink font-display text-[32px] font-extrabold"
          >
            P
          </text>
        </g>

        {/* airport entrance */}
        <g transform={`translate(${END[0]} ${END[1]})`}>
          <circle
            r="23"
            className={cn(
              'fill-canvas transition-[stroke] duration-500',
              airportLit ? 'stroke-accent' : 'stroke-line-strong',
            )}
            strokeWidth="3.5"
          />
          <Plane x={-12} y={-12} width={24} height={24} strokeWidth={1.75} className="stroke-ink" />
        </g>

        {/* shuttle */}
        <m.g style={{ x, y, opacity: dotOpacity }}>
          <circle r="9" className="origin-center animate-halo fill-accent/50 [transform-box:fill-box]" />
          <circle r="9" className="fill-accent stroke-canvas" strokeWidth="3" />
        </m.g>
      </svg>

      <p
        className="display pointer-events-none absolute -translate-x-1/2 rounded-[4px] bg-surface/85 px-1.5 py-0.5 text-[1.125rem] leading-none text-ink"
        style={{ left: percent(START[0], MAP.width), top: percent(START[1] + 30, MAP.height) }}
      >
        {t.journey.map.parking}
      </p>
      <p
        className="display pointer-events-none absolute -translate-x-1/2 rounded-[4px] bg-surface/85 px-1.5 py-0.5 text-[1.125rem] leading-none text-ink"
        style={{ left: percent(END[0], MAP.width), top: percent(END[1] + 31, MAP.height) }}
      >
        {t.journey.map.airport}
      </p>
      <div className="pointer-events-none absolute bottom-3 left-3 rounded-[8px] bg-surface/90 px-3.5 py-2.5 backdrop-blur-[2px] sm:bottom-4 sm:left-4 sm:px-4 sm:py-3">
        <p className="display tabular text-[clamp(2.25rem,1.7rem+2.4vw,3.5rem)] leading-[0.9] text-ink">
          {t.journey.map.distance}
        </p>
        <p className="label mt-1 text-[1rem] text-accent-text">{t.journey.map.time}</p>
      </div>
      <p className="pointer-events-none absolute bottom-3 right-4 text-[0.75rem] text-ink-faint">
        {t.journey.map.note}
      </p>
    </div>
  );
}
