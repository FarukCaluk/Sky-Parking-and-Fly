import { Clock, PhoneCall } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SITE } from '@/data/site';
import { useNow } from '@/hooks/useNow';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { useI18n } from '@/i18n/context';
import { useFormat } from '@/i18n/useFormat';
import { cn } from '@/utils/cn';
import { formatCountdown, nextDepartures, type UpcomingDeparture } from '@/utils/shuttle';

const ROUTE = 'M92 238 C 168 238, 186 150, 252 142 S 352 104, 392 88';
const PLANE =
  'M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z';

function ShuttleMap() {
  const reduced = usePrefersReducedMotion();
  const { t } = useI18n();

  return (
    <svg viewBox="0 0 480 320" className="size-full" role="img" aria-label={t.shuttle.mapAria(SITE.shuttleMinutes)}>
      <rect width="480" height="320" rx="24" className="fill-surface-2" />

      {/* Terrain */}
      <path
        d="M-10 270 C 80 250, 120 300, 220 292 S 400 270, 490 300 L 490 330 L -10 330 Z"
        className="fill-emerald-500/10"
      />
      <path d="M300 -10 C 320 50, 380 40, 410 70 S 470 40, 490 60 L 490 -10 Z" className="fill-sky-500/10" />

      {/* Street grid */}
      <g fill="none" strokeLinecap="round" style={{ stroke: 'var(--line-strong)' }}>
        <path d="M-10 190 C 80 180, 140 200, 230 182 S 400 160, 490 168" strokeWidth="10" />
        <path d="M150 -10 C 160 80, 130 160, 150 330" strokeWidth="8" />
        <path d="M330 -10 C 340 90, 320 200, 350 330" strokeWidth="8" />
        <path d="M-10 90 C 100 100, 220 70, 300 96" strokeWidth="6" />
      </g>

      {/* Route */}
      <path d={ROUTE} fill="none" strokeWidth="12" strokeLinecap="round" className="stroke-brand-600/20" />
      <path
        d={ROUTE}
        fill="none"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="1 9"
        className="stroke-brand-600"
      />

      {/* Parking pin */}
      <g transform="translate(92 238)">
        <circle r="22" className="fill-brand-600/15" />
        <circle r="15" className="fill-brand-600" />
        <text y="5" textAnchor="middle" className="fill-white text-[15px] font-extrabold">
          P
        </text>
      </g>
      <text x="92" y="278" textAnchor="middle" className="fill-ink text-[12px] font-semibold">
        {t.shuttle.parkingLabel}
      </text>

      {/* Terminal pin */}
      <g transform="translate(392 88)">
        <circle r="22" className="fill-ink/10" />
        <circle r="15" className="fill-ink" />
        <path
          d={PLANE}
          transform="translate(-9 -9) scale(0.75)"
          fill="none"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-canvas"
        />
      </g>
      <text x="392" y="132" textAnchor="middle" className="fill-ink text-[12px] font-semibold">
        {t.shuttle.terminalLabel}
      </text>

      {/* Travel-time chip */}
      <g transform="translate(236 168)">
        <rect
          x="-34"
          y="-13"
          width="68"
          height="26"
          rx="13"
          className="fill-surface"
          style={{ stroke: 'var(--line-strong)' }}
        />
        <text y="4.5" textAnchor="middle" className="fill-ink text-[11.5px] font-bold">
          {t.shuttle.minutesChip(SITE.shuttleMinutes)}
        </text>
      </g>

      {/* Moving shuttle */}
      <g>
        <circle r="13" className="fill-brand-600/25">
          {!reduced && (
            <animateMotion
              dur="9s"
              repeatCount="indefinite"
              path={ROUTE}
              keyPoints="0;1"
              keyTimes="0;1"
              calcMode="linear"
            />
          )}
        </circle>
        <circle r="7" className="fill-white stroke-brand-600" strokeWidth="3">
          {!reduced && (
            <animateMotion
              dur="9s"
              repeatCount="indefinite"
              path={ROUTE}
              keyPoints="0;1"
              keyTimes="0;1"
              calcMode="linear"
            />
          )}
        </circle>
        {reduced && <circle cx="252" cy="142" r="7" className="fill-white stroke-brand-600" strokeWidth="3" />}
      </g>
    </svg>
  );
}

function DepartureList({ title, items }: { title: string; items: UpcomingDeparture[] }) {
  const { t } = useI18n();
  return (
    <div>
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-ink-faint">{title}</h3>
      <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
        {items.map((d, i) => (
          <li
            key={`${d.time}-${i}`}
            className={cn('flex items-center justify-between gap-3 px-4 py-3', i === 0 && 'bg-accent-soft')}
          >
            <span className="text-lg font-bold tracking-[-0.03em] tabular">{d.time}</span>
            <span className="flex items-center gap-2 text-sm text-ink-muted">
              {i === 0 && <Badge tone="solid">{t.shuttle.next}</Badge>}
              <span className={cn('tabular', i === 0 && 'font-semibold text-accent')}>
                {formatCountdown(d.inMinutes, t.shuttle.countdown)}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ShuttlePanel({ className }: { className?: string }) {
  const { t } = useI18n();
  const fmt = useFormat();
  const now = useNow(15_000);
  const fromParking = nextDepartures(now, 'parking', 3);
  const fromTerminal = nextDepartures(now, 'terminal', 3);
  const distance = `${fmt.number(SITE.terminalDistanceKm, 1)} km`;

  return (
    <Card className={cn('p-4 sm:p-6', className)}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 px-1">
        <div>
          <h2 className="text-xl font-bold tracking-[-0.025em]">{t.shuttle.panelTitle}</h2>
          <p className="mt-0.5 text-sm text-ink-muted">{t.shuttle.subtitle(distance, SITE.shuttleMinutes)}</p>
        </div>
        <Badge tone="success">
          <Clock className="size-3.5" aria-hidden="true" />
          {t.shuttle.frequency}
        </Badge>
      </div>

      <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="aspect-[3/2] min-h-0 overflow-hidden rounded-3xl lg:aspect-auto lg:min-h-[19rem]">
          <ShuttleMap />
        </div>

        <div className="flex flex-col gap-4" aria-live="polite">
          <DepartureList title={t.shuttle.fromParking} items={fromParking} />
          <DepartureList title={t.shuttle.fromTerminal} items={fromTerminal} />
          <div className="mt-auto flex flex-col gap-2 rounded-2xl bg-ink/[0.045] p-4 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
            <p className="leading-snug">{t.shuttle.landed}</p>
            <Button
              size="sm"
              variant="secondary"
              href={`tel:${SITE.phone.e164}`}
              leftIcon={<PhoneCall className="size-4" aria-hidden="true" />}
              className="shrink-0"
            >
              {t.shuttle.call}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
