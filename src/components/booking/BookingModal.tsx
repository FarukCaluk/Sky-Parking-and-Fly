import { AnimatePresence, m } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';
import { AnimatedPrice } from '@/components/ui/AnimatedPrice';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Stepper, type StepperStep } from '@/components/ui/Stepper';
import { useBooking } from '@/context/bookingContext';
import { useBookingWizard, type WizardStep } from '@/hooks/useBookingWizard';
import type { BookingRequest } from '@/types';
import { formatDays } from '@/utils/format';
import { hasErrors, normalizeFlight, normalizePlate, toInternationalPhone } from '@/utils/validation';
import { BookingSuccess } from './BookingSuccess';
import { StayForm } from './StayForm';
import { StepConfirm } from './StepConfirm';
import { StepVehicle } from './StepVehicle';

const STEPS: readonly StepperStep[] = [
  { id: 1, label: 'Detalji' },
  { id: 2, label: 'Vozilo' },
  { id: 3, label: 'Potvrda' },
];

const STEP_TITLES: Record<WizardStep, string> = {
  1: 'Kada i šta parkirate?',
  2: 'Vozilo i kontakt',
  3: 'Pregled i potvrda',
};

const slide = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 28 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -28 }),
};

/** Three-step reservation wizard: stay details → vehicle & contact → review and instant confirmation. */
export default function BookingModal() {
  const { stay, quote, isBookable, isBookingOpen, closeBooking } = useBooking();
  const wizard = useBookingWizard();
  const { state } = wizard;
  const bodyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const submitting = state.status === 'submitting';
  const succeeded = state.status === 'success' && state.confirmation !== null;

  const close = useCallback(() => {
    if (!submitting) closeBooking();
  }, [submitting, closeBooking]);

  // Start fresh next time after a completed reservation
  const { reset } = wizard;
  useEffect(() => {
    if (isBookingOpen || state.status !== 'success') return;
    const timer = window.setTimeout(reset, 450);
    return () => window.clearTimeout(timer);
  }, [isBookingOpen, state.status, reset]);

  // Reset scroll and move focus to the step heading whenever the step changes
  useEffect(() => {
    if (!isBookingOpen) return;
    bodyRef.current?.scrollTo({ top: 0 });
    headingRef.current?.focus({ preventScroll: true });
  }, [state.step, succeeded, isBookingOpen]);

  const focusFirstInvalid = () => {
    window.requestAnimationFrame(() => {
      bodyRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    });
  };

  const buildRequest = (): BookingRequest => ({
    stay,
    days: quote.days,
    driver: {
      fullName: state.driver.fullName.trim(),
      email: state.driver.email.trim(),
      phone: toInternationalPhone(state.driver.phone),
    },
    vehicle: {
      ...state.vehicle,
      plate: normalizePlate(state.vehicle.plate),
      make: state.vehicle.make.trim(),
      color: state.vehicle.color.trim(),
      flightNumber: normalizeFlight(state.vehicle.flightNumber),
    },
    total: quote.total,
    currency: 'BAM',
    locale: 'bs-BA',
  });

  const next = () => {
    if (state.step === 1) {
      if (!isBookable) return;
      wizard.go(2);
    } else if (state.step === 2) {
      wizard.attempt(2);
      if (hasErrors(wizard.driverErrors) || hasErrors(wizard.vehicleErrors)) {
        focusFirstInvalid();
        return;
      }
      wizard.go(3);
    } else {
      wizard.attempt(3);
      if (!state.consent) return;
      if (!isBookable) {
        wizard.go(1);
        return;
      }
      void wizard.submit(buildRequest());
    }
  };

  const back = () => {
    if (state.step === 2) wizard.go(1);
    if (state.step === 3) wizard.go(2);
  };

  const footer = succeeded ? (
    <Button size="lg" fullWidth onClick={closeBooking}>
      Gotovo
    </Button>
  ) : (
    <div className="flex items-center gap-3">
      {state.step > 1 ? (
        <Button
          variant="secondary"
          size="lg"
          onClick={back}
          disabled={submitting}
          aria-label="Nazad"
          className="px-4 sm:px-6"
          leftIcon={<ArrowLeft className="size-5" aria-hidden="true" />}
        >
          <span className="max-sm:hidden">Nazad</span>
        </Button>
      ) : (
        <div className="min-w-0 pl-1" aria-live="polite">
          <p className="text-xs font-medium text-ink-faint">Ukupno</p>
          <p className="text-xl font-bold leading-tight tracking-[-0.03em]">
            <AnimatedPrice value={quote.total} />
          </p>
        </div>
      )}
      <Button
        size="lg"
        className="flex-1"
        loading={submitting}
        disabled={state.step === 1 && !isBookable}
        onClick={next}
        rightIcon={
          state.step === 3 ? (
            <Check className="size-5" strokeWidth={2.6} aria-hidden="true" />
          ) : (
            <ArrowRight className="size-5" aria-hidden="true" />
          )
        }
      >
        {state.step === 3 ? 'Potvrdi rezervaciju' : 'Nastavi'}
      </Button>
    </div>
  );

  return (
    <Modal
      open={isBookingOpen}
      onClose={close}
      title={succeeded ? 'Hvala vam!' : 'Rezervacija parkinga'}
      eyebrow={succeeded ? 'Gotovo' : `Korak ${state.step} od 3 · ${formatDays(quote.days)}`}
      size="lg"
      bodyRef={bodyRef}
      headerExtra={succeeded ? undefined : <Stepper steps={STEPS} current={state.step} />}
      footer={footer}
    >
      <AnimatePresence mode="wait" custom={state.direction} initial={false}>
        <m.div
          key={succeeded ? 'success' : state.step}
          custom={state.direction}
          variants={slide}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
        >
          {succeeded && state.confirmation ? (
            <>
              <h3 ref={headingRef} tabIndex={-1} className="sr-only">
                Rezervacija je potvrđena
              </h3>
              <BookingSuccess confirmation={state.confirmation} />
            </>
          ) : (
            <>
              <h3 ref={headingRef} tabIndex={-1} className="mb-5 text-lg font-bold tracking-[-0.02em] outline-none">
                {STEP_TITLES[state.step]}
              </h3>
              {state.step === 1 && <StayForm variant="wizard" />}
              {state.step === 2 && <StepVehicle wizard={wizard} />}
              {state.step === 3 && <StepConfirm wizard={wizard} />}
            </>
          )}
        </m.div>
      </AnimatePresence>
    </Modal>
  );
}
