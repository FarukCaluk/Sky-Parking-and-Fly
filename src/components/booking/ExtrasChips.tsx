import { Check } from 'lucide-react';
import { EXTRAS } from '@/data/pricing';
import { useI18n } from '@/i18n/context';
import { useFormat } from '@/i18n/useFormat';
import type { ExtraId } from '@/types';
import { cn } from '@/utils/cn';
import { EXTRA_ICONS } from './icons';

interface ExtrasChipsProps {
  selected: readonly ExtraId[];
  onToggle: (id: ExtraId) => void;
  labelledBy?: string;
  className?: string;
}

/** Compact multi-select chips for additional services. */
export function ExtrasChips({ selected, onToggle, labelledBy, className }: ExtrasChipsProps) {
  const { t } = useI18n();
  const fmt = useFormat();
  return (
    <div role="group" aria-labelledby={labelledBy} className={cn('flex flex-wrap gap-2', className)}>
      {EXTRAS.map((extra) => {
        const Icon = EXTRA_ICONS[extra.id];
        const active = selected.includes(extra.id);
        return (
          <button
            key={extra.id}
            type="button"
            aria-pressed={active}
            onClick={() => onToggle(extra.id)}
            className={cn(
              'inline-flex min-h-10 items-center gap-1.5 rounded-full border py-1.5 pl-3 pr-3.5 text-[0.8125rem] font-medium',
              'transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-apple active:scale-95',
              active
                ? 'border-transparent bg-brand-600 text-white shadow-[0_6px_16px_-6px_rgb(0_113_227/0.8)]'
                : 'border-line-strong bg-surface text-ink-muted hover:border-ink-faint hover:text-ink',
            )}
          >
            {active ? (
              <Check className="size-4" strokeWidth={3} aria-hidden="true" />
            ) : (
              <Icon className="size-4" strokeWidth={1.9} aria-hidden="true" />
            )}
            <span>{t.pricing.extras[extra.id].shortLabel}</span>
            <span className={cn('tabular text-xs', active ? 'text-white/75' : 'text-ink-faint')}>
              +{fmt.km(extra.price, { withCurrency: false })}
              {extra.billing === 'perDay' ? t.units.perDayShort : ''}
            </span>
          </button>
        );
      })}
    </div>
  );
}
