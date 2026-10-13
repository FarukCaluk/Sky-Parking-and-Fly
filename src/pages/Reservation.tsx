import { Mail, MessageCircle, MessagesSquare, Phone } from 'lucide-react';
import { useId, useMemo, useRef, useState, type ChangeEvent, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout';
import { Field } from '@/components/ui/Field';
import { PageHeader } from '@/components/layout/PageHeader';
import { StayFields } from '@/components/sections/StayFields';
import { MAX_STAY_DAYS } from '@/data/pricing';
import { mailLink, telLink, viberLink, whatsappLink } from '@/data/site';
import { useStay } from '@/context/stayContext';
import { fieldMessage, stayMessage } from '@/i18n/helpers';
import { useI18n } from '@/i18n/context';
import { useFormat } from '@/i18n/useFormat';
import type { GuestDetails, GuestField } from '@/types';
import { cn } from '@/utils/cn';
import { buildReservationText } from '@/utils/reservation';
import { hasErrors, validateGuest } from '@/utils/validation';
import { PageShell } from './PageShell';

const EMPTY_GUEST: GuestDetails = { name: '', phone: '', plate: '', flight: '', note: '' };

/**
 * The reservation is a message the visitor sends from their own phone or mail app. Nothing is submitted to a
 * server, so there is no fake confirmation: the text is shown, and they send it through the channel they prefer.
 */
export default function Reservation() {
  const { t } = useI18n();
  const fmt = useFormat();
  const { stay, quote, stayErrors } = useStay();
  const formRef = useRef<HTMLFormElement>(null);
  const statusId = useId();

  const [guest, setGuest] = useState<GuestDetails>(EMPTY_GUEST);
  const [touched, setTouched] = useState<Partial<Record<GuestField, true>>>({});
  const [attempted, setAttempted] = useState(false);
  const [copied, setCopied] = useState(false);

  const guestErrors = validateGuest(guest);
  const stayError = stayErrors.dropOff ?? stayErrors.pickUp ?? stayErrors.range;
  const invalid = hasErrors(guestErrors) || stayError !== undefined;

  const text = useMemo(
    () =>
      buildReservationText(
        t.reservation.message,
        { when: fmt.when, days: t.units.days, km: fmt.km },
        stay,
        quote,
        guest,
      ),
    [t, fmt, stay, quote, guest],
  );

  const set = (field: GuestField) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCopied(false);
    setGuest((prev) => ({ ...prev, [field]: event.target.value }));
  };
  const touch = (field: GuestField) => () => setTouched((prev) => ({ ...prev, [field]: true }));
  const errorFor = (field: GuestField): string | undefined => {
    const code = guestErrors[field];
    return code && (attempted || touched[field]) ? fieldMessage(t, field, code) : undefined;
  };

  /** Stops the action and points at the first problem; returns `true` when it is fine to go on. */
  const guard = (event: MouseEvent): boolean => {
    if (!invalid) return true;
    event.preventDefault();
    // Render the errors first so the invalid fields carry aria-invalid, then move focus to the first one
    flushSync(() => setAttempted(true));
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    return false;
  };

  const sendViber = (event: MouseEvent) => {
    if (!guard(event)) return;
    void navigator.clipboard?.writeText(text).then(() => setCopied(true));
    window.location.href = viberLink();
  };

  const subject = t.reservation.message.subject;

  return (
    <PageShell page="reservation">
      <PageHeader title={t.reservation.title} lead={t.reservation.lead} />

      <Container className="grid gap-12 pb-24 sm:pb-32 lg:grid-cols-12 lg:gap-16">
        <form
          ref={formRef}
          noValidate
          onSubmit={(event) => event.preventDefault()}
          className="grid content-start gap-10 lg:col-span-7"
        >
          <fieldset>
            <legend className="display text-sub mb-5">{t.reservation.stayTitle}</legend>
            <div className="grid gap-px overflow-hidden rounded-[10px] border border-line bg-line sm:grid-cols-2">
              <StayFields idPrefix="form" arrivalClassName="bg-surface p-5" departureClassName="bg-surface p-5" />
            </div>
            {stayError && (
              <p role="alert" className="mt-3 text-sm text-danger">
                {stayMessage(t, stayError, MAX_STAY_DAYS)}
              </p>
            )}
          </fieldset>

          <fieldset>
            <legend className="display text-sub mb-5">{t.reservation.guestTitle}</legend>
            <div className="grid gap-x-5 sm:grid-cols-2">
              <Field label={t.reservation.fields.name.label} error={errorFor('name')} className="sm:col-span-2">
                {(p) => (
                  <input
                    {...p}
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={guest.name}
                    onChange={set('name')}
                    onBlur={touch('name')}
                    placeholder={t.reservation.fields.name.placeholder}
                    required
                    className={cn(p.className, 'h-12')}
                  />
                )}
              </Field>
              <Field label={t.reservation.fields.phone.label} optional error={errorFor('phone')}>
                {(p) => (
                  <input
                    {...p}
                    type="tel"
                    name="phone"
                    inputMode="tel"
                    autoComplete="tel"
                    value={guest.phone}
                    onChange={set('phone')}
                    onBlur={touch('phone')}
                    placeholder={t.reservation.fields.phone.placeholder}
                    className={cn(p.className, 'h-12')}
                  />
                )}
              </Field>
              <Field label={t.reservation.fields.plate.label} optional error={errorFor('plate')}>
                {(p) => (
                  <input
                    {...p}
                    type="text"
                    name="plate"
                    autoComplete="off"
                    autoCapitalize="characters"
                    spellCheck={false}
                    value={guest.plate}
                    onChange={set('plate')}
                    onBlur={touch('plate')}
                    placeholder={t.reservation.fields.plate.placeholder}
                    className={cn(p.className, 'h-12 uppercase placeholder:normal-case')}
                  />
                )}
              </Field>
              <Field label={t.reservation.fields.flight.label} optional error={errorFor('flight')}>
                {(p) => (
                  <input
                    {...p}
                    type="text"
                    name="flight"
                    autoComplete="off"
                    autoCapitalize="characters"
                    spellCheck={false}
                    value={guest.flight}
                    onChange={set('flight')}
                    onBlur={touch('flight')}
                    placeholder={t.reservation.fields.flight.placeholder}
                    className={cn(p.className, 'h-12 uppercase placeholder:normal-case')}
                  />
                )}
              </Field>
              <Field label={t.reservation.fields.note.label} optional className="sm:col-span-2">
                {(p) => (
                  <textarea
                    {...p}
                    name="note"
                    rows={3}
                    maxLength={400}
                    value={guest.note}
                    onChange={set('note')}
                    placeholder={t.reservation.fields.note.placeholder}
                    className={cn(p.className, 'resize-y py-3')}
                  />
                )}
              </Field>
            </div>
          </fieldset>
        </form>

        <aside aria-label={t.reservation.summary.title} className="lg:col-span-5">
          <div className="grid gap-6 lg:sticky lg:top-28">
            <div className="rounded-[10px] border border-line bg-surface p-6 shadow-panel sm:p-8">
              <h2 className="label text-[1.0625rem] text-ink-faint">{t.reservation.summary.title}</h2>
              <dl className="mt-5 grid gap-4">
                <div>
                  <dt className="text-sm text-ink-faint">{t.stayBar.arrival}</dt>
                  <dd className="mt-0.5 text-lg">{fmt.when(stay.dropOffDate, stay.dropOffTime)}</dd>
                </div>
                <div>
                  <dt className="text-sm text-ink-faint">{t.stayBar.departure}</dt>
                  <dd className="mt-0.5 text-lg">{fmt.when(stay.pickUpDate, stay.pickUpTime)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4">
                  <dt className="text-ink-muted">{t.reservation.summary.stay}</dt>
                  <dd className="tabular">{t.units.days(quote.days)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-ink-muted">{t.reservation.summary.rate}</dt>
                  <dd className="tabular">{fmt.km(quote.ratePerDay)}</dd>
                </div>
              </dl>
              <div className="mt-5 flex items-end justify-between gap-4 border-t border-line pt-5">
                <p className="label text-[1rem] text-ink-faint">{t.reservation.summary.total}</p>
                <p className="display tabular flex items-baseline gap-2 text-[3.5rem] leading-none">
                  {fmt.km(quote.total, { withCurrency: false })}
                  <span className="text-[1.5rem] text-ink-muted">KM</span>
                </p>
              </div>
              <p className="mt-4 text-sm text-ink-faint">{t.price.payment}</p>
            </div>

            <div>
              <h2 className="display text-sub">{t.reservation.send.title}</h2>
              <p className="mt-2 text-ink-muted">{t.reservation.send.hint}</p>

              <div className="mt-5 grid gap-3">
                <Button
                  size="lg"
                  fullWidth
                  href={whatsappLink(text)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={guard}
                  leftIcon={<MessageCircle className="size-5" aria-hidden="true" />}
                >
                  {t.reservation.send.whatsapp}
                </Button>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant="secondary"
                    onClick={sendViber}
                    leftIcon={<MessagesSquare className="size-[1.1rem]" aria-hidden="true" />}
                    className="px-3"
                  >
                    {t.reservation.send.viber}
                  </Button>
                  <Button
                    variant="secondary"
                    href={mailLink(subject, text)}
                    onClick={guard}
                    leftIcon={<Mail className="size-[1.1rem]" aria-hidden="true" />}
                    className="px-3"
                  >
                    {t.reservation.send.email}
                  </Button>
                  <Button
                    variant="secondary"
                    href={telLink}
                    leftIcon={<Phone className="size-[1.1rem]" aria-hidden="true" />}
                    className="px-3"
                  >
                    {t.reservation.send.call}
                  </Button>
                </div>
              </div>

              <p id={statusId} role="status" className="mt-3 min-h-6 text-sm">
                {attempted && invalid ? (
                  <span className="text-danger">{t.reservation.send.fixErrors}</span>
                ) : copied ? (
                  <span className="text-accent-text">{t.reservation.send.viberCopied}</span>
                ) : null}
              </p>
            </div>

            <div>
              <h3 className="label text-[1rem] text-ink-faint">{t.reservation.send.previewTitle}</h3>
              <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded-[6px] bg-surface-2 p-4 font-sans text-sm text-ink-muted">
                {text}
              </pre>
            </div>
          </div>
        </aside>
      </Container>
    </PageShell>
  );
}
