import { CircleAlert, CircleCheck, Mail, MessageCircle, MessagesSquare, Phone } from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState, type ChangeEvent, type FormEvent, type MouseEvent } from 'react';
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
import { submitReservation } from '@/services/reservationGateway';
import type { GuestDetails, GuestField } from '@/types';
import { cn } from '@/utils/cn';
import { buildReservationText } from '@/utils/reservation';
import { hasErrors, validateGuest } from '@/utils/validation';
import { PageShell } from './PageShell';

const EMPTY_GUEST: GuestDetails = { name: '', phone: '', email: '', make: '', flight: '', note: '' };

type Status = 'idle' | 'sending' | 'sent' | 'failed';
/** What the visitor last tried: sending the form needs a phone number, composing a message does not. */
type Attempt = 'none' | 'message' | 'submit';

const FIRST_INVALID = '[aria-invalid="true"], [data-invalid="true"]';

/**
 * Two ways to book. "Pošalji rezervaciju" mails the reservation to us straight from the form. The side panel
 * composes the same text for WhatsApp, Viber or e-mail, which the visitor then sends from their own app.
 */
export default function Reservation() {
  const { t, lang } = useI18n();
  const fmt = useFormat();
  const { stay, quote, stayErrors } = useStay();
  const formRef = useRef<HTMLFormElement>(null);
  const sentRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const statusId = useId();

  const [guest, setGuest] = useState<GuestDetails>(EMPTY_GUEST);
  const [touched, setTouched] = useState<Partial<Record<GuestField, true>>>({});
  const [attempt, setAttempt] = useState<Attempt>('none');
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);
  const [trap, setTrap] = useState('');

  const guestErrors = validateGuest(guest, { requirePhone: attempt === 'submit' });
  const stayError = stayErrors.dropOff ?? stayErrors.pickUp ?? stayErrors.range;
  const messageInvalid = hasErrors(validateGuest(guest)) || stayError !== undefined;

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

  useEffect(() => {
    if (status === 'sent') sentRef.current?.focus();
  }, [status]);

  const set = (field: GuestField) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCopied(false);
    setGuest((prev) => ({ ...prev, [field]: event.target.value }));
  };
  const touch = (field: GuestField) => () => setTouched((prev) => ({ ...prev, [field]: true }));
  const errorFor = (field: GuestField): string | undefined => {
    const code = guestErrors[field];
    return code && (attempt !== 'none' || touched[field]) ? fieldMessage(t, field, code) : undefined;
  };

  /** Show the problems, then put the cursor on the first one. Errors render first so the fields carry `aria-invalid`. */
  const reveal = (next: Attempt) => {
    flushSync(() => setAttempt((prev) => (prev === 'submit' ? prev : next)));
    formRef.current?.querySelector<HTMLElement>(FIRST_INVALID)?.focus();
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (busy.current) return;
    if (hasErrors(validateGuest(guest, { requirePhone: true })) || stayError !== undefined) {
      reveal('submit');
      return;
    }
    // A person never sees this field; a bot that fills every input does
    if (trap) {
      setStatus('sent');
      return;
    }
    busy.current = true;
    setStatus('sending');
    try {
      await submitReservation({ stay, quote, guest, lang });
      setStatus('sent');
    } catch {
      setStatus('failed');
    } finally {
      busy.current = false;
    }
  };

  const startOver = () => {
    setGuest(EMPTY_GUEST);
    setTouched({});
    setAttempt('none');
    setStatus('idle');
  };

  /** Stops a side-panel action when the form has problems; returns `true` when it is fine to go on. */
  const guard = (event: MouseEvent): boolean => {
    if (!messageInvalid) return true;
    event.preventDefault();
    reveal('message');
    return false;
  };

  /** A Viber chat link cannot carry text, so it is copied first; the browser then follows the link itself. */
  const copyForViber = (event: MouseEvent) => {
    if (!guard(event)) return;
    void navigator.clipboard?.writeText(text).then(() => setCopied(true));
  };

  const sending = status === 'sending';

  return (
    <PageShell page="reservation">
      <PageHeader title={t.reservation.title} lead={t.reservation.lead} />

      <Container className="grid gap-12 pb-24 sm:pb-32 lg:grid-cols-12 lg:gap-16">
        {status === 'sent' ? (
          <div
            ref={sentRef}
            tabIndex={-1}
            role="status"
            className="content-start self-start rounded-[10px] border border-line bg-surface p-8 outline-none sm:p-10 lg:col-span-7"
          >
            <CircleCheck className="size-12 text-accent-text" strokeWidth={1.5} aria-hidden="true" />
            <h2 className="display text-sub mt-5">{t.reservation.sent.title}</h2>
            <p className="mt-3 max-w-[46ch] text-lg text-ink-muted">{t.reservation.sent.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="secondary" onClick={startOver}>
                {t.reservation.sent.another}
              </Button>
              <Button to="home">{t.reservation.sent.home}</Button>
            </div>
          </div>
        ) : (
          <form
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            aria-busy={sending}
            className="grid content-start gap-10 lg:col-span-7"
          >
            <fieldset>
              <legend className="display text-sub mb-5">{t.reservation.stayTitle}</legend>
              <div className="grid gap-px rounded-[10px] border border-line bg-line sm:grid-cols-2">
                <StayFields
                  idPrefix="form"
                  arrivalClassName="bg-surface p-5 max-sm:rounded-t-[9px] sm:rounded-l-[9px]"
                  departureClassName="bg-surface p-5 max-sm:rounded-b-[9px] sm:rounded-r-[9px]"
                />
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
                <Field label={t.reservation.fields.phone.label} error={errorFor('phone')}>
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
                      required
                      className={cn(p.className, 'h-12')}
                    />
                  )}
                </Field>
                <Field label={t.reservation.fields.email.label} optional error={errorFor('email')}>
                  {(p) => (
                    <input
                      {...p}
                      type="email"
                      name="email"
                      inputMode="email"
                      autoComplete="email"
                      spellCheck={false}
                      value={guest.email}
                      onChange={set('email')}
                      onBlur={touch('email')}
                      placeholder={t.reservation.fields.email.placeholder}
                      className={cn(p.className, 'h-12')}
                    />
                  )}
                </Field>
                <Field label={t.reservation.fields.make.label} optional>
                  {(p) => (
                    <input
                      {...p}
                      type="text"
                      name="make"
                      autoComplete="off"
                      value={guest.make}
                      onChange={set('make')}
                      placeholder={t.reservation.fields.make.placeholder}
                      maxLength={60}
                      className={cn(p.className, 'h-12')}
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
                {/* Honeypot: off screen and out of the tab order, so only a script ever fills it */}
                <input
                  type="text"
                  name="contact_ref"
                  value={trap}
                  onChange={(event) => setTrap(event.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] size-px opacity-0"
                />
              </div>
            </fieldset>

            <div className="grid gap-4">
              {/* Phones show the form first and the summary last, so the price is repeated next to the button */}
              <p className="flex items-baseline justify-between gap-4 border-t border-line pt-4 lg:hidden">
                <span className="text-ink-muted">
                  {t.reservation.summary.total} ({t.units.days(quote.days)})
                </span>
                <span className="display tabular text-[1.75rem] leading-none">{fmt.km(quote.total)}</span>
              </p>

              <Button type="submit" size="lg" fullWidth arrow aria-disabled={sending || undefined}>
                {sending ? t.reservation.submit.sending : t.reservation.submit.label}
              </Button>
              <p className="text-sm text-ink-faint">{t.reservation.submit.note}</p>

              {status === 'failed' && (
                <div role="alert" className="flex gap-3 rounded-[10px] border border-danger/50 bg-danger/[0.07] p-4">
                  <CircleAlert className="mt-0.5 size-5 shrink-0 text-danger" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-danger">{t.reservation.failed.title}</p>
                    <p className="mt-1 text-ink-muted">{t.reservation.failed.text}</p>
                  </div>
                </div>
              )}
            </div>
          </form>
        )}

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
                  variant="secondary"
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
                    href={viberLink()}
                    onClick={copyForViber}
                    leftIcon={<MessagesSquare className="size-[1.1rem]" aria-hidden="true" />}
                    className="px-3"
                  >
                    {t.reservation.send.viber}
                  </Button>
                  <Button
                    variant="secondary"
                    href={mailLink(t.reservation.message.subject, text)}
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
                {attempt === 'message' && messageInvalid ? (
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
