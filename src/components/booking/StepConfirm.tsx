import { CircleAlert, Wallet } from 'lucide-react';
import { AnimatedPrice } from '@/components/ui/AnimatedPrice';
import { Card } from '@/components/ui/Card';
import { Checkbox } from '@/components/ui/Checkbox';
import { useBooking } from '@/context/bookingContext';
import type { BookingWizard } from '@/hooks/useBookingWizard';
import { formatKM } from '@/utils/format';
import { ReservationSummary } from './ReservationSummary';

export function StepConfirm({ wizard }: { wizard: BookingWizard }) {
  const { stay, quote } = useBooking();
  const { state, setConsent } = wizard;
  const consentError = state.attempted[3] && !state.consent ? 'Potvrdite da ste upoznati s uslovima.' : undefined;

  return (
    <div className="space-y-5">
      <Card variant="tinted" padded={false} className="px-5 py-1 sm:px-6">
        <ReservationSummary stay={stay} quote={quote} driver={state.driver} vehicle={state.vehicle} />
      </Card>

      <div className="flex items-end justify-between gap-4 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white shadow-[0_20px_40px_-20px_rgb(0_91_189/0.8)]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/70">Ukupno za plaćanje</p>
          <p className="mt-1 text-4xl font-bold leading-none tracking-[-0.04em]">
            <AnimatedPrice value={quote.total} />
          </p>
        </div>
        <p className="text-right text-xs leading-snug text-white/75">
          PDV uključen
          <span className="block tabular">od toga PDV {formatKM(quote.vat)}</span>
        </p>
      </div>

      <p className="flex items-start gap-2.5 rounded-2xl bg-ink/[0.045] p-4 text-sm leading-relaxed text-ink-muted">
        <Wallet className="mt-0.5 size-[1.125rem] shrink-0 text-accent" aria-hidden="true" />
        <span>
          Plaćanje se vrši <strong className="font-semibold text-ink">pri preuzimanju vozila</strong> — gotovinom ili
          karticom. Ne naplaćujemo avans.
        </span>
      </p>

      <div>
        <details className="group mb-3 rounded-2xl border border-line px-4 py-3 text-sm">
          <summary className="cursor-pointer list-none font-semibold text-ink marker:hidden [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between">
              Sažetak uslova
              <span className="text-xs font-medium text-accent group-open:hidden">Prikaži</span>
              <span className="hidden text-xs font-medium text-accent group-open:inline">Sakrij</span>
            </span>
          </summary>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ink-muted marker:text-ink-faint">
            <li>Besplatno otkazivanje ili izmjena do 24 sata prije dolaska.</li>
            <li>Svaki započeti period od 24 sata obračunava se kao cijeli dan.</li>
            <li>Vozilo je osigurano osiguranjem od odgovornosti operatera.</li>
            <li>Molimo ne ostavljajte dokumente i vrijedne predmete u vozilu.</li>
          </ul>
        </details>
        <Checkbox
          checked={state.consent}
          onChange={(e) => setConsent(e.target.checked)}
          error={consentError}
          label="Upoznat/a sam s uslovima korištenja i politikom privatnosti i slažem se s obradom podataka za potrebe rezervacije."
        />
      </div>

      {state.status === 'error' && state.error && (
        <p
          role="alert"
          className="flex items-start gap-2.5 rounded-2xl bg-red-500/10 p-4 text-sm font-medium text-red-700 dark:text-red-300"
        >
          <CircleAlert className="mt-0.5 size-[1.125rem] shrink-0" aria-hidden="true" />
          {state.error}
        </p>
      )}
    </div>
  );
}
