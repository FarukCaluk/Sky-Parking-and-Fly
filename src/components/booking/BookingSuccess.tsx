import { m } from 'framer-motion';
import { CalendarPlus, Check, Copy, MessageCircle, PhoneCall } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { SITE, whatsappLink } from '@/data/site';
import { useI18n } from '@/i18n/context';
import { useFormat } from '@/i18n/useFormat';
import type { BookingConfirmation } from '@/types';
import { downloadTextFile } from '@/utils/browser';
import { buildIcs } from '@/utils/ics';
import { normalizePlate } from '@/utils/validation';

export function BookingSuccess({ confirmation }: { confirmation: BookingConfirmation }) {
  const { t } = useI18n();
  const fmt = useFormat();
  const { reference, request } = confirmation;
  const { stay, vehicle } = request;
  const [copied, setCopied] = useState(false);
  const s = t.booking.success;
  const plate = normalizePlate(vehicle.plate);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(reference);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the code is still visible on screen */
    }
  };

  const dropOff = `${fmt.dateShort(stay.dropOffDate)}, ${stay.dropOffTime}`;
  const pickUp = `${fmt.dateShort(stay.pickUpDate)}, ${stay.pickUpTime}`;
  const shareText = s.shareText(reference, SITE.name, dropOff, pickUp, plate);

  return (
    <div className="text-center">
      <m.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
        className="mx-auto grid size-20 place-items-center rounded-full bg-emerald-500 text-white shadow-[0_16px_40px_-10px_rgb(16_185_129/0.7)]"
      >
        <Check className="size-10" strokeWidth={3.2} aria-hidden="true" />
      </m.div>

      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <h3 className="mt-5 text-2xl font-bold tracking-[-0.03em]">{t.booking.confirmedHeading}</h3>
        <p className="mx-auto mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-ink-muted">
          {s.heldBefore}
          <strong className="font-semibold text-ink">{plate}</strong>
          {s.heldAfter}
        </p>

        <div className="mx-auto mt-6 max-w-sm overflow-hidden rounded-3xl border border-line bg-surface text-left shadow-card">
          <div className="bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">{s.referenceCode}</p>
            <div className="mt-1 flex items-center justify-between gap-3">
              <p
                className="select-all font-mono text-3xl font-bold tracking-[0.06em]"
                aria-label={s.codeAria(reference)}
              >
                {reference}
              </p>
              <button
                type="button"
                onClick={copy}
                aria-label={s.copyCode}
                className="grid size-10 shrink-0 place-items-center rounded-full bg-white/15 transition-[background-color,transform] duration-200 hover:bg-white/25 active:scale-90"
              >
                {copied ? (
                  <Check className="size-[1.125rem]" strokeWidth={3} aria-hidden="true" />
                ) : (
                  <Copy className="size-[1.125rem]" aria-hidden="true" />
                )}
              </button>
            </div>
            <span className="sr-only" aria-live="polite">
              {copied ? s.codeCopied : ''}
            </span>
          </div>

          {/* Ticket perforation */}
          <div className="relative h-0 border-t border-dashed border-line-strong">
            <span className="absolute -left-3 -top-3 size-6 rounded-full bg-[color-mix(in_oklab,var(--canvas)_88%,var(--surface))]" />
            <span className="absolute -right-3 -top-3 size-6 rounded-full bg-[color-mix(in_oklab,var(--canvas)_88%,var(--surface))]" />
          </div>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-4 px-6 py-5 text-sm">
            <div>
              <dt className="text-ink-faint">{s.arrival}</dt>
              <dd className="mt-0.5 font-semibold tabular">{dropOff}</dd>
            </div>
            <div>
              <dt className="text-ink-faint">{s.returning}</dt>
              <dd className="mt-0.5 font-semibold tabular">{pickUp}</dd>
            </div>
            <div>
              <dt className="text-ink-faint">{s.duration}</dt>
              <dd className="mt-0.5 font-semibold">{t.units.days(request.days)}</dd>
            </div>
            <div>
              <dt className="text-ink-faint">{s.payOnPickup}</dt>
              <dd className="mt-0.5 font-semibold tabular">{fmt.km(request.total)}</dd>
            </div>
          </dl>
        </div>

        <div className="mx-auto mt-6 grid max-w-sm gap-2.5 sm:grid-cols-2">
          <Button
            variant="secondary"
            leftIcon={<CalendarPlus className="size-[1.125rem]" aria-hidden="true" />}
            onClick={() => downloadTextFile(`${reference}.ics`, buildIcs(confirmation, t.booking.ics), 'text/calendar')}
          >
            {s.addToCalendar}
          </Button>
          <Button
            variant="secondary"
            href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            leftIcon={<MessageCircle className="size-[1.125rem]" aria-hidden="true" />}
          >
            {s.share}
          </Button>
        </div>

        <p className="mx-auto mt-5 flex max-w-sm items-start justify-center gap-2 text-xs leading-relaxed text-ink-faint">
          <PhoneCall className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          <span>
            {s.changesBefore}
            <a className="font-medium text-accent hover:underline" href={`tel:${SITE.phone.e164}`}>
              {SITE.phone.display}
            </a>
            {s.changesOr}
            <a
              className="font-medium text-accent hover:underline"
              href={whatsappLink(s.whatsappGreeting(reference))}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            {s.changesAfter}
          </span>
        </p>
      </m.div>
    </div>
  );
}
