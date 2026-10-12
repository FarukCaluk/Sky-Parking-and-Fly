import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';
import { useLiveOccupancy, type SectorOccupancy } from '@/hooks/useLiveOccupancy';
import { useI18n } from '@/i18n/context';
import { cn } from '@/utils/cn';

const RADIUS = 34;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function toneFor(percent: number): { stroke: string; text: string; status: 'full' | 'filling' | 'plenty' } {
  if (percent >= 88) return { stroke: '#ef4444', text: 'text-red-700 dark:text-red-400', status: 'full' };
  if (percent >= 70) return { stroke: '#f59e0b', text: 'text-amber-700 dark:text-amber-400', status: 'filling' };
  return { stroke: '#10b981', text: 'text-emerald-700 dark:text-emerald-400', status: 'plenty' };
}

function SectorRow({ data }: { data: SectorOccupancy }) {
  const { t } = useI18n();
  const text = t.facilities.occupancy;
  const free = Math.round(useAnimatedNumber(data.free, 700));
  const tone = toneFor(data.percent);

  return (
    <li className="flex items-center gap-4">
      <div className="relative size-[4.5rem] shrink-0">
        <svg viewBox="0 0 80 80" className="size-full -rotate-90" aria-hidden="true">
          <circle cx="40" cy="40" r={RADIUS} fill="none" strokeWidth="8" style={{ stroke: 'var(--track)' }} />
          <circle
            cx="40"
            cy="40"
            r={RADIUS}
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            stroke={tone.stroke}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - data.percent / 100)}
            className="transition-[stroke-dashoffset,stroke] duration-1000 ease-apple"
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-sm font-bold tabular tracking-[-0.02em]">
          {data.percent}%
        </span>
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-ink-muted">{text.sectors[data.sector.id]}</p>
        <p className="mt-0.5 text-[1.75rem] font-bold leading-none tracking-[-0.04em] tabular">
          {free}
          <span className="ml-1.5 text-sm font-medium tracking-normal text-ink-muted">{text.free}</span>
        </p>
        <p className={cn('mt-1 text-xs font-medium', tone.text)}>
          {text.status[tone.status]} · {data.occupied}/{data.sector.capacity}
        </p>
      </div>
    </li>
  );
}

export function OccupancyCard({ className }: { className?: string }) {
  const { t } = useI18n();
  const sectors = useLiveOccupancy();

  return (
    <Card className={className}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold tracking-[-0.02em]">{t.facilities.occupancy.title}</h2>
        <Badge tone="success">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-emerald-500" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
          </span>
          {t.facilities.occupancy.live}
        </Badge>
      </div>
      <ul className="space-y-5" aria-live="polite">
        {sectors.map((s) => (
          <SectorRow key={s.sector.id} data={s} />
        ))}
      </ul>
    </Card>
  );
}
