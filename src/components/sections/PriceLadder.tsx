import { m } from 'framer-motion';
import { Check } from 'lucide-react';
import type { CSSProperties } from 'react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout';
import { Reveal } from '@/components/ui/Reveal';
import { MIN_STAY_DAYS, PRICING_TIERS, SLIDER_MAX_DAYS } from '@/data/pricing';
import { useStay } from '@/context/stayContext';
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';
import { useI18n } from '@/i18n/context';
import { useFormat } from '@/i18n/useFormat';
import { cn } from '@/utils/cn';

/** A typical stay for each tier, used when the visitor picks a tier instead of dragging the slider. */
const TYPICAL_DAYS = { from2: 3, from5: 7, from11: 14, from21: 28 } as const;

/** The price list as a tool: drag the length of the stay and watch the daily rate step down. */
function PriceTool() {
  const { t } = useI18n();
  const fmt = useFormat();
  const { quote, setDays } = useStay();
  const total = Math.round(useAnimatedNumber(quote.total));
  const sliderValue = Math.min(quote.days, SLIDER_MAX_DAYS);
  const progress = ((sliderValue - MIN_STAY_DAYS) / (SLIDER_MAX_DAYS - MIN_STAY_DAYS)) * 100;

  return (
    <div className="rounded-[10px] border border-line bg-surface p-6 shadow-panel sm:p-10">
      <div className="flex items-end justify-between gap-4">
        <div className="flex items-baseline gap-3 overflow-hidden">
          <m.span
            key={quote.ratePerDay}
            initial={{ y: '30%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="display tabular text-[clamp(6.5rem,3.5rem+13vw,13rem)] leading-[0.8] text-accent-text"
          >
            {quote.ratePerDay}
          </m.span>
          <span className="display text-sub max-w-[7ch] text-ink-muted">{t.price.unit}</span>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-baseline justify-between gap-4">
          <label htmlFor="stay-days" className="label text-[1rem] text-ink-faint">
            {t.price.daysLabel}
          </label>
          <output htmlFor="stay-days" className="display tabular text-sub">
            {t.units.days(quote.days)}
          </output>
        </div>
        <input
          id="stay-days"
          type="range"
          min={MIN_STAY_DAYS}
          max={SLIDER_MAX_DAYS}
          step={1}
          value={sliderValue}
          onChange={(event) => setDays(Number(event.target.value))}
          aria-valuetext={`${t.units.days(quote.days)}, ${fmt.km(quote.ratePerDay)} ${t.units.perDay}`}
          style={{ '--p': `${progress}%` } as CSSProperties}
          className="range mt-1"
        />
      </div>

      <div role="group" aria-label={t.price.unit} className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {PRICING_TIERS.map((tier) => {
          const selected = tier.id === quote.tier.id;
          return (
            <button
              key={tier.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setDays(TYPICAL_DAYS[tier.id])}
              className={cn(
                'rounded-[6px] border px-3 py-3 text-left transition-[background-color,border-color,color,transform] duration-300 ease-signal active:scale-[0.98] sm:px-4',
                selected
                  ? 'border-accent bg-accent text-accent-ink'
                  : 'border-line-strong text-ink hover:border-ink hover:bg-ink/[0.05]',
              )}
            >
              <span className="label block text-[0.9375rem] opacity-80">{t.price.tiers[tier.id].label}</span>
              <span className="display tabular mt-1 block text-[1.75rem] leading-none">
                {tier.rate} <span className="text-[1rem]">KM</span>
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-4 min-h-[3.25rem] max-w-[52ch] text-[0.9375rem] text-ink-muted sm:min-h-12">
        {t.price.tiers[quote.tier.id].hint}
      </p>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6">
        <div aria-live="polite">
          <p className="label text-[1rem] text-ink-faint">
            {t.price.totalLabel} {t.price.totalFor(t.units.days(quote.days))}
          </p>
          <p className="display tabular mt-1 flex items-baseline gap-2 text-[3.75rem] leading-none">
            {fmt.km(total, { withCurrency: false })}
            <span className="text-[1.75rem] text-ink-muted">KM</span>
          </p>
          <p className={cn('mt-2 text-sm text-accent-text', quote.savings > 0 ? 'visible' : 'invisible')}>
            {t.price.saving(fmt.km(quote.savings))}
          </p>
          {quote.extraDays > 0 && <p className="tabular mt-1 text-sm text-ink-muted">{fmt.quoteLine(quote)}</p>}
        </div>
        <Button to="reservation" size="lg" arrow>
          {t.nav.book}
        </Button>
      </div>
    </div>
  );
}

export function PriceLadder() {
  const { t } = useI18n();
  return (
    <section aria-labelledby="price-title" className="relative py-20 sm:py-28 lg:py-36">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <h2 id="price-title" className="display text-heading max-w-[13ch]">
            {t.price.title}
          </h2>
          <p className="mt-5 max-w-[44ch] text-lg text-ink-muted">{t.price.lead}</p>
          <h3 className="label mt-10 text-[1rem] text-ink-faint">{t.price.includedTitle}</h3>
          <ul className="mt-4 grid gap-3">
            {t.price.included.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[1.0625rem]">
                <Check className="mt-1 size-5 shrink-0 text-accent-text" strokeWidth={2.5} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-[44ch] text-sm text-ink-faint">{t.price.payment}</p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7">
          <PriceTool />
        </Reveal>
      </Container>
    </section>
  );
}
