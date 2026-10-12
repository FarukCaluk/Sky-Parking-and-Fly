import { ScanLine } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { useI18n } from '@/i18n/context';
import { cn } from '@/utils/cn';

type Phase = 'closed' | 'scanning' | 'open';

const NEXT: Record<Phase, Phase> = { closed: 'scanning', scanning: 'open', open: 'closed' };
const DURATION: Record<Phase, number> = { closed: 3600, scanning: 1600, open: 3400 };
const PLATES = ['A12-K-•••', 'K45-M-•••', 'E71-J-•••', 'T08-O-•••', 'J33-A-•••'] as const;

const DOT: Record<Phase, string> = {
  closed: 'bg-red-500',
  scanning: 'bg-amber-400 animate-blink',
  open: 'bg-emerald-500',
};

/** Simulated gate cycle: closed → ANPR scan → open. Replace the timers with gate-controller events in production. */
export function BarrierCard({ className }: { className?: string }) {
  const { t } = useI18n();
  const [phase, setPhase] = useState<Phase>('closed');
  const [plate, setPlate] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (phase === 'open') setPlate((i) => (i + 1) % PLATES.length);
      setPhase(NEXT[phase]);
    }, DURATION[phase]);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const label = { ...t.facilities.barrier[phase], dot: DOT[phase] };

  return (
    <Card className={className}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold tracking-[-0.02em]">{t.facilities.barrier.title}</h2>
        <ScanLine className="size-5 text-accent" aria-hidden="true" />
      </div>

      <svg viewBox="0 0 220 96" className="mt-3 w-full" aria-hidden="true">
        <rect x="0" y="82" width="220" height="3" rx="1.5" style={{ fill: 'var(--line-strong)' }} />
        <rect x="26" y="40" width="14" height="44" rx="4" className="fill-zinc-700 dark:fill-zinc-500" />
        <circle
          cx="33"
          cy="48"
          r="3.5"
          className={cn(
            phase === 'open' ? 'fill-emerald-400' : phase === 'scanning' ? 'fill-amber-400' : 'fill-red-500',
          )}
        />
        {/* Arm pivots on the post */}
        <g
          style={{
            transformOrigin: '36px 56px',
            transform: `rotate(${phase === 'open' ? -74 : 0}deg)`,
            transition: 'transform 900ms cubic-bezier(0.32, 0.72, 0, 1)',
          }}
        >
          <rect x="36" y="52" width="150" height="8" rx="4" fill="#f4f4f5" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={46 + i * 24} y="52" width="12" height="8" fill="#e5484d" />
          ))}
        </g>
        <g className={cn('transition-opacity duration-500', phase === 'scanning' ? 'opacity-100' : 'opacity-0')}>
          <rect
            x="150"
            y="14"
            width="56"
            height="26"
            rx="6"
            fill="none"
            stroke="#0071e3"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <text x="178" y="31" textAnchor="middle" className="fill-brand-500 font-mono text-[9px] font-bold">
            {PLATES[plate]}
          </text>
        </g>
      </svg>

      <div
        className="mt-2 flex items-center gap-3 rounded-2xl bg-ink/[0.045] px-4 py-3"
        role="status"
        aria-live="polite"
      >
        <span className={cn('size-2.5 shrink-0 rounded-full', label.dot)} />
        <div className="min-w-0">
          <p className="text-sm font-semibold">{label.title}</p>
          <p className="truncate text-xs text-ink-muted tabular">
            {phase === 'open' ? `${PLATES[plate]} · ${label.text}` : label.text}
          </p>
        </div>
      </div>
    </Card>
  );
}
