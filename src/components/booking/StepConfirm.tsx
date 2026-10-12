import { CircleAlert, Wallet } from 'lucide-react';
import { AnimatedPrice } from '@/components/ui/AnimatedPrice';
import { Card } from '@/components/ui/Card';
import { Checkbox } from '@/components/ui/Checkbox';
import { useBooking } from '@/context/bookingContext';
import type { BookingWizard } from '@/hooks/useBookingWizard';
import { useI18n } from '@/i18n/context';
import { useFormat } from '@/i18n/useFormat';
import { ReservationSummary } from './ReservationSummary';

export function StepConfirm({ wizard }: { wizard: BookingWizard }) {
  const { stay, quote } = useBooking();
  const { t } = useI18n();
  const fmt = useFormat();
  const { state, setConsent } = wizard;
  const s = t.booking.confirmStep;
  const consentError = state.attempted[3] && !state.consent ? s.consentError : undefined;

  return (
    <div className="space-y-5">
      <Card variant="tinted" padded={false} className="px-5 py-1 sm:px-6">
        <ReservationSummary stay={stay} quote={quote} driver={state.driver} vehicle={state.vehicle} />
      </Card>

      <div className="flex items-end justify-between gap-4 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white shadow-[0_20px_40px_-20px_rgb(0_91_189/0.8)]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/70">{s.totalToPay}</p>
          <p className="mt-1 text-4xl font-bold leading-none tracking-[-0.04em]">
            <AnimatedPrice value={quote.total} />
          </p>
        </div>
        <p className="text-right text-xs leading-snug text-white/75">
          {s.vatIncluded}
          <span className="block tabular">{s.ofWhichVat(fmt.km(quote.vat))}</span>
        </p>
      </div>

      <p className="flex items-start gap-2.5 rounded-2xl bg-ink/[0.045] p-4 text-sm leading-relaxed text-ink-muted">
        <Wallet className="mt-0.5 size-[1.125rem] shrink-0 text-accent" aria-hidden="true" />
        <span>
          {s.paymentBefore}
          <strong className="font-semibold text-ink">{s.paymentStrong}</strong>
          {s.paymentAfter}
        </span>
      </p>

      <div>
        <details className="group mb-3 rounded-2xl border border-line px-4 py-3 text-sm">
          <summary className="cursor-pointer list-none font-semibold text-ink marker:hidden [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between">
              {s.termsSummary}
              <span className="text-xs font-medium text-accent group-open:hidden">{s.show}</span>
              <span className="hidden text-xs font-medium text-accent group-open:inline">{s.hide}</span>
            </span>
          </summary>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ink-muted marker:text-ink-faint">
            {s.terms.map((term) => (
              <li key={term}>{term}</li>
            ))}
          </ul>
        </details>
        <Checkbox
          checked={state.consent}
          onChange={(e) => setConsent(e.target.checked)}
          error={consentError}
          label={s.consent}
        />
      </div>

      {state.status === 'error' && state.error && (
        <p
          role="alert"
          className="flex items-start gap-2.5 rounded-2xl bg-red-500/10 p-4 text-sm font-medium text-red-700 dark:text-red-300"
        >
          <CircleAlert className="mt-0.5 size-[1.125rem] shrink-0" aria-hidden="true" />
          {t.booking.errors[state.error]}
        </p>
      )}
    </div>
  );
}
