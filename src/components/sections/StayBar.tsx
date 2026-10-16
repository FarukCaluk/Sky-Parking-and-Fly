import { useRef, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { useStay } from '@/context/stayContext';
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';
import { stayMessage } from '@/i18n/helpers';
import { useI18n } from '@/i18n/context';
import { useFormat } from '@/i18n/useFormat';
import { navigate } from '@/router/navigation';
import { pathFor } from '@/router/routes';
import { cn } from '@/utils/cn';
import { StayFields } from './StayFields';

/**
 * Reservation bar: arrival, departure, an instant price and one action. It edits the shared stay,
 * so the price slider and the reservation form below always agree with it.
 */
export function StayBar({ className }: { className?: string }) {
  const { t, lang } = useI18n();
  const fmt = useFormat();
  const { quote, stayErrors } = useStay();
  const formRef = useRef<HTMLFormElement>(null);
  const total = Math.round(useAnimatedNumber(quote.total));
  const errorCode = stayErrors.dropOff ?? stayErrors.pickUp ?? stayErrors.range;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (errorCode) {
      formRef.current?.querySelector<HTMLElement>('[data-invalid="true"]')?.focus();
      return;
    }
    navigate(pathFor(lang, 'reservation'));
  };

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      aria-label={t.stayBar.aria}
      noValidate
      className={cn('rounded-[10px] border border-line bg-surface text-ink shadow-panel', className)}
    >
      {/* One column on phones, two rows of two on tablets, a single row from 1280 px */}
      <div className="grid md:grid-cols-2 xl:grid-cols-[1fr_1fr_auto_auto] xl:items-stretch">
        <StayFields
          idPrefix="bar"
          arrivalClassName="p-4 sm:p-5"
          departureClassName="border-t border-line p-4 sm:p-5 md:border-l md:border-t-0"
        />

        <div
          aria-live="polite"
          className="flex flex-col justify-center border-t border-line px-5 py-4 xl:min-w-[14.5rem] xl:border-l xl:border-t-0"
        >
          <span className="label text-[0.9375rem] text-ink-faint">{t.stayBar.estimate}</span>
          <span className="display tabular mt-0.5 flex items-baseline gap-2 text-[2.75rem] leading-none">
            {fmt.km(total, { withCurrency: false })}
            <span className="text-[1.375rem] text-ink-muted">KM</span>
          </span>
          <span className="tabular mt-1.5 text-[0.8125rem] text-ink-muted">{fmt.quoteLine(quote)}</span>
        </div>

        <div className="flex items-center border-t border-line p-4 sm:p-5 md:border-l xl:border-t-0">
          <Button type="submit" size="lg" arrow fullWidth>
            {t.nav.book}
          </Button>
        </div>
      </div>

      {errorCode && (
        <p role="alert" className="border-t border-line px-5 py-3 text-sm text-danger">
          {stayMessage(t, errorCode)}
        </p>
      )}
    </form>
  );
}
