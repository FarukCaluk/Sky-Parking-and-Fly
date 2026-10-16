import { useRef, type MouseEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout';
import { Reveal } from '@/components/ui/Reveal';
import { EXTRA_DAY_RATE } from '@/data/pricing';
import { useStay } from '@/context/stayContext';
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';
import { stayMessage } from '@/i18n/helpers';
import { useI18n } from '@/i18n/context';
import { useFormat } from '@/i18n/useFormat';
import { cn } from '@/utils/cn';
import { StayFields } from './StayFields';

/**
 * "Check the price for your dates": arrival and return, to the minute, and the days and the total at once. It edits the
 * shared stay, so the reservation form opens with the same dates and the same price.
 */
export function PriceCheck() {
  const { t } = useI18n();
  const fmt = useFormat();
  const { quote, stayErrors } = useStay();
  const fieldsRef = useRef<HTMLDivElement>(null);
  const total = Math.round(useAnimatedNumber(quote.total));
  const errorCode = stayErrors.dropOff ?? stayErrors.pickUp ?? stayErrors.range;

  /** A stay that cannot be reserved stays here: point at the field to fix instead of leaving. */
  const reserve = (event: MouseEvent) => {
    if (!errorCode) return;
    event.preventDefault();
    fieldsRef.current?.querySelector<HTMLElement>('[data-invalid="true"]')?.focus();
  };

  return (
    <section aria-labelledby="check-title" className="relative py-16 sm:py-24 lg:py-28">
      <Container>
        <Reveal>
          <h2 id="check-title" className="display text-heading max-w-[16ch]">
            {t.price.checkTitle}
          </h2>
          <p className="mt-5 max-w-[56ch] text-lg text-ink-muted">{t.price.checkLead}</p>
        </Reveal>

        <div className="mt-10 grid gap-8 rounded-[10px] border border-line bg-surface p-4 shadow-panel sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-10">
          <div ref={fieldsRef} className="grid content-start gap-4 sm:grid-cols-2 lg:col-span-6 lg:grid-cols-1">
            <StayFields
              idPrefix="check"
              arrivalClassName="rounded-[8px] border border-line bg-canvas p-3 sm:p-4"
              departureClassName="rounded-[8px] border border-line bg-canvas p-3 sm:p-4"
            />
            {errorCode && (
              <p role="alert" className="text-sm text-danger sm:col-span-2 lg:col-span-1">
                {stayMessage(t, errorCode)}
              </p>
            )}
          </div>

          <div aria-live="polite" className="lg:col-span-6">
            <div className={cn('transition-opacity duration-300', errorCode && 'opacity-45')}>
              <dl className="grid gap-3">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-ink-muted">{t.price.result.days}</dt>
                  <dd className="display tabular text-[1.75rem] leading-none">{t.units.days(quote.days)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-ink-muted">{t.price.result.rate}</dt>
                  <dd className="tabular text-lg">{fmt.km(quote.ratePerDay)}</dd>
                </div>
                {quote.extraDays > 0 && (
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-ink-muted">{t.price.result.extra}</dt>
                    <dd className="tabular text-lg">
                      {quote.extraDays} × {fmt.km(EXTRA_DAY_RATE)}
                    </dd>
                  </div>
                )}
              </dl>
              <div className="mt-5 flex items-end justify-between gap-4 border-t border-line pt-5">
                <p className="label text-[1rem] text-ink-faint">{t.price.result.total}</p>
                <p className="display tabular flex items-baseline gap-2 text-[clamp(3.5rem,2.5rem+4vw,5rem)] leading-none text-accent-text">
                  {fmt.km(total, { withCurrency: false })}
                  <span className="text-[1.75rem] text-ink-muted">KM</span>
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-ink-faint">{t.price.sameNextStep}</p>
            <Button
              to="reservation"
              size="lg"
              arrow
              fullWidth
              onClick={reserve}
              aria-disabled={errorCode ? true : undefined}
              className="mt-6"
            >
              {t.nav.book}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
