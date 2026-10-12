import { ArrowRight, Check, Info, Minus, Plus, Sun, TrendingDown, Warehouse } from 'lucide-react';
import { useId, type CSSProperties } from 'react';
import type { PricingTier } from '@/types';
import { EXTRA_ICONS } from '@/components/booking/icons';
import { VehiclePicker } from '@/components/booking/VehiclePicker';
import { AnimatedPrice } from '@/components/ui/AnimatedPrice';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Container, Section } from '@/components/ui/Layout';
import { Reveal } from '@/components/ui/Reveal';
import { SwitchGraphic, Toggle } from '@/components/ui/Toggle';
import { EXTRAS, MAX_STAY_DAYS, PRICING_TIERS, VAT_RATE } from '@/data/pricing';
import { useBooking } from '@/context/bookingContext';
import { stayMessage } from '@/i18n/helpers';
import { useI18n } from '@/i18n/context';
import { useFormat } from '@/i18n/useFormat';
import { cn } from '@/utils/cn';
import { dailyRate } from '@/utils/pricing';

export function PricingCalculator() {
  const { stay, quote, stayErrors, isBookable, update, setDays, toggleExtra, openBooking } = useBooking();
  const { t } = useI18n();
  const fmt = useFormat();
  const c = t.calculator;
  const sliderId = useId();
  const vehicleLabel = useId();
  const extrasLabel = useId();
  const covered = stay.cover === 'covered';
  const stayError = stayErrors.dropOff ?? stayErrors.pickUp ?? stayErrors.range;
  const rateFor = (tier: PricingTier) => dailyRate(tier, stay.cover, stay.vehicle);
  const firstTier = PRICING_TIERS[0];
  const standardRate = firstTier ? rateFor(firstTier) : 0;

  return (
    <Section className="pt-4 sm:pt-6 lg:pt-8">
      <Container>
        {/* Cover switch */}
        <Reveal className="flex justify-center">
          <div className="flex w-full max-w-md items-center justify-between gap-2 rounded-full border border-line bg-surface p-1.5 shadow-card sm:w-auto sm:max-w-none sm:gap-4 sm:p-2">
            <button
              type="button"
              onClick={() => update({ cover: 'open' })}
              aria-pressed={!covered}
              className={cn(
                'flex min-h-10 min-w-0 flex-1 items-center justify-center gap-2 rounded-full px-1.5 text-[0.8125rem] font-semibold transition-colors duration-300 sm:flex-none sm:px-4 sm:text-sm',
                !covered ? 'bg-ink/[0.07] text-ink' : 'text-ink-faint hover:text-ink-muted',
              )}
            >
              <Sun className="hidden size-4 sm:block" aria-hidden="true" />
              {t.pricing.covers.open.label}
            </button>
            <Toggle
              checked={covered}
              onCheckedChange={(next) => update({ cover: next ? 'covered' : 'open' })}
              aria-label={c.coveredAria}
            />
            <button
              type="button"
              onClick={() => update({ cover: 'covered' })}
              aria-pressed={covered}
              className={cn(
                'flex min-h-10 min-w-0 flex-1 items-center justify-center gap-2 rounded-full px-1.5 text-[0.8125rem] font-semibold transition-colors duration-300 sm:flex-none sm:px-4 sm:text-sm',
                covered ? 'bg-ink/[0.07] text-ink' : 'text-ink-faint hover:text-ink-muted',
              )}
            >
              <Warehouse className="hidden size-4 sm:block" aria-hidden="true" />
              {t.pricing.covers.covered.label}
            </button>
          </div>
        </Reveal>

        {/* Tiers */}
        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PRICING_TIERS.map((tier, i) => {
            const active = tier.id === quote.tier.id;
            const rate = rateFor(tier);
            const discount = standardRate > 0 ? Math.round((1 - rate / standardRate) * 100) : 0;
            return (
              <li key={tier.id} className="min-w-0">
                <Reveal delay={i * 0.06} className="h-full">
                  <Card
                    interactive
                    padded={false}
                    className={cn(
                      'h-full transition-[border-color,box-shadow] duration-500 ease-apple',
                      active && 'border-brand-600/70 shadow-glow',
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setDays(tier.minDays)}
                      aria-pressed={active}
                      className="flex h-full w-full flex-col rounded-[inherit] p-5 text-left sm:p-6"
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-ink-muted">{t.pricing.tiers[tier.id].hint}</span>
                        {active ? (
                          <Badge tone="brand">{c.yourChoice}</Badge>
                        ) : discount > 0 ? (
                          <Badge tone="success">−{fmt.percent(discount)}</Badge>
                        ) : (
                          <Badge>{c.standard}</Badge>
                        )}
                      </span>
                      <span className="mt-4 text-sm font-medium text-ink-faint">{t.pricing.tiers[tier.id].label}</span>
                      <span className="mt-1 flex items-baseline gap-1.5">
                        <AnimatedPrice
                          value={rate}
                          withCurrency={false}
                          className="text-[2.5rem] font-bold leading-none tracking-[-0.04em]"
                        />
                        <span className="text-sm font-medium text-ink-muted">{t.units.kmPerDay}</span>
                      </span>
                    </button>
                  </Card>
                </Reveal>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-ink-faint">
          <Info className="size-3.5 shrink-0" aria-hidden="true" />
          {stay.vehicle === 'car' ? c.noteCar(fmt.percent(VAT_RATE * 100)) : c.noteOther(fmt.percent(VAT_RATE * 100))}
        </p>

        {/* Calculator */}
        <div className="mt-12 grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-6">
          <Reveal>
            <Card className="space-y-8 p-5 sm:p-8">
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <label htmlFor={sliderId} className="text-lg font-bold tracking-[-0.02em]">
                    {c.duration}
                  </label>
                  <span className="text-sm text-ink-muted tabular">
                    {fmt.dateShort(stay.dropOffDate)} → {fmt.dateShort(stay.pickUpDate)}
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    aria-label={c.dayLess}
                    disabled={quote.days <= 1}
                    onClick={() => setDays(quote.days - 1)}
                    className="grid size-12 shrink-0 place-items-center rounded-full bg-ink/[0.06] text-ink transition-[background-color,transform,opacity] duration-200 hover:bg-ink/[0.1] active:scale-90 disabled:opacity-35"
                  >
                    <Minus className="size-5" aria-hidden="true" />
                  </button>
                  <p className="text-center" aria-live="polite">
                    <span className="block text-[2.75rem] font-bold leading-none tracking-[-0.045em] tabular">
                      {quote.days}
                    </span>
                    <span className="mt-1 block text-sm font-medium text-ink-muted">{t.units.dayWord(quote.days)}</span>
                  </p>
                  <button
                    type="button"
                    aria-label={c.dayMore}
                    disabled={quote.days >= MAX_STAY_DAYS}
                    onClick={() => setDays(quote.days + 1)}
                    className="grid size-12 shrink-0 place-items-center rounded-full bg-ink/[0.06] text-ink transition-[background-color,transform,opacity] duration-200 hover:bg-ink/[0.1] active:scale-90 disabled:opacity-35"
                  >
                    <Plus className="size-5" aria-hidden="true" />
                  </button>
                </div>

                <input
                  id={sliderId}
                  type="range"
                  min={1}
                  max={MAX_STAY_DAYS}
                  step={1}
                  value={quote.days}
                  onChange={(event) => setDays(Number(event.target.value))}
                  aria-valuetext={t.units.days(quote.days)}
                  className="range mt-4"
                  style={{ '--p': `${((quote.days - 1) / (MAX_STAY_DAYS - 1)) * 100}%` } as CSSProperties}
                />
                <div className="flex justify-between px-1 text-xs text-ink-faint tabular" aria-hidden="true">
                  <span>1</span>
                  <span>15</span>
                  <span>30</span>
                  <span>45</span>
                  <span>{MAX_STAY_DAYS}</span>
                </div>
                {stayErrors.range && (
                  <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                    {stayMessage(t, stayErrors.range, MAX_STAY_DAYS)}
                  </p>
                )}
              </div>

              <div>
                <h2 id={vehicleLabel} className="mb-3 text-lg font-bold tracking-[-0.02em]">
                  {c.vehicleTitle}
                </h2>
                <VehiclePicker
                  value={stay.vehicle}
                  onChange={(vehicle) => update({ vehicle })}
                  labelledBy={vehicleLabel}
                />
              </div>

              <div>
                <h2 id={extrasLabel} className="mb-3 text-lg font-bold tracking-[-0.02em]">
                  {c.extrasTitle}
                </h2>
                <ul aria-labelledby={extrasLabel} className="grid gap-2.5">
                  {EXTRAS.map((extra) => {
                    const Icon = EXTRA_ICONS[extra.id];
                    const on = stay.extras.includes(extra.id);
                    return (
                      <li key={extra.id}>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={on}
                          onClick={() => toggleExtra(extra.id)}
                          className={cn(
                            'group flex w-full items-center gap-3.5 rounded-2xl border p-3.5 text-left sm:gap-4 sm:p-4',
                            'transition-[background-color,border-color,transform] duration-300 ease-apple active:scale-[0.99]',
                            on
                              ? 'border-brand-600/50 bg-accent-soft'
                              : 'border-line hover:border-line-strong hover:bg-ink/[0.025]',
                          )}
                        >
                          <span
                            className={cn(
                              'grid size-11 shrink-0 place-items-center rounded-xl transition-colors duration-300',
                              on ? 'bg-brand-600 text-white' : 'bg-ink/[0.06] text-ink-muted',
                            )}
                          >
                            <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[0.9375rem] font-semibold leading-snug tracking-[-0.01em]">
                              {t.pricing.extras[extra.id].label}
                            </span>
                            <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-muted">
                              {t.pricing.extras[extra.id].description}
                            </span>
                          </span>
                          <span className="shrink-0 text-right text-sm font-semibold tabular">
                            {fmt.km(extra.price)}
                            {extra.billing === 'perDay' && (
                              <span className="block text-xs font-normal text-ink-faint">{t.units.perDayLong}</span>
                            )}
                          </span>
                          <SwitchGraphic checked={on} className="max-[26rem]:hidden" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Card>
          </Reveal>

          {/* Summary */}
          <Reveal delay={0.1} className="lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-brand-950 p-6 text-white shadow-[0_40px_80px_-30px_rgb(0_20_60/0.8)] sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand-500/30 blur-[90px]"
              />
              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-bold tracking-[-0.02em]">{c.summaryTitle}</h2>
                  <Badge tone="glass">{t.pricing.tiers[quote.tier.id].hint}</Badge>
                </div>

                <p className="mt-5 text-[clamp(2.75rem,2rem+2.4vw,3.75rem)] font-bold leading-none tracking-[-0.045em]">
                  <AnimatedPrice value={quote.total} />
                </p>
                <p className="mt-2 text-sm text-white/60">
                  {t.units.days(quote.days)} · {covered ? c.coveredLower : c.openLower} · {c.vatIncluded}
                </p>

                <dl className="mt-6 space-y-3 border-t border-white/10 pt-5 text-[0.9375rem]">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-white/70">
                      {c.parking}
                      <span className="block text-xs text-white/45 tabular">
                        {quote.days} × {fmt.km(quote.ratePerDay)}
                      </span>
                    </dt>
                    <dd className="font-semibold tabular">{fmt.km(quote.parking)}</dd>
                  </div>
                  {quote.extras.map((line) => (
                    <div key={line.id} className="flex items-baseline justify-between gap-4">
                      <dt className="text-white/70">
                        {t.pricing.extras[line.id].label}
                        {line.billing === 'perDay' && (
                          <span className="block text-xs text-white/45 tabular">
                            {line.quantity} × {fmt.km(line.unit)}
                          </span>
                        )}
                      </dt>
                      <dd className="font-semibold tabular">{fmt.km(line.amount)}</dd>
                    </div>
                  ))}
                  {quote.savings > 0 && (
                    <div className="flex items-center justify-between gap-4 rounded-xl bg-emerald-400/10 px-3 py-2.5 text-emerald-300">
                      <dt className="flex items-center gap-2 text-sm">
                        <TrendingDown className="size-4" aria-hidden="true" />
                        {c.savings}
                      </dt>
                      <dd className="whitespace-nowrap font-semibold tabular">−{fmt.km(quote.savings)}</dd>
                    </div>
                  )}
                </dl>

                <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
                  {c.included.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-white/75">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-500/25 text-brand-300">
                        <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  fullWidth
                  className="mt-7"
                  disabled={!isBookable}
                  onClick={openBooking}
                  rightIcon={<ArrowRight className="size-5" aria-hidden="true" />}
                >
                  {c.reserveFor(fmt.km(quote.total))}
                </Button>
                {!isBookable && (
                  <p className="mt-3 text-center text-xs text-amber-300">
                    {stayError ? stayMessage(t, stayError, MAX_STAY_DAYS) : null}
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
