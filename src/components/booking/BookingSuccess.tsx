import { m } from 'framer-motion';
import { Check, CalendarPlus, Copy, MessageCircle, PhoneCall } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { SITE, whatsappLink } from '@/data/site';
import type { BookingConfirmation } from '@/types';
import { downloadTextFile } from '@/utils/browser';
import { formatDateShort } from '@/utils/date';
import { formatDays, formatKM } from '@/utils/format';
import { buildIcs } from '@/utils/ics';
import { normalizePlate } from '@/utils/validation';

export function BookingSuccess({ confirmation }: { confirmation: BookingConfirmation }) {
  const { reference, request } = confirmation;
  const { stay, vehicle } = request;
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(reference);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the code is still visible on screen */
    }
  };

  const shareText = `Rezervacija ${reference} — ${SITE.name}\nOstavljanje: ${formatDateShort(stay.dropOffDate)} u ${stay.dropOffTime}\nPreuzimanje: ${formatDateShort(stay.pickUpDate)} u ${stay.pickUpTime}\nVozilo: ${normalizePlate(vehicle.plate)}`;

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
        <h3 className="mt-5 text-2xl font-bold tracking-[-0.03em]">Rezervacija je potvrđena</h3>
        <p className="mx-auto mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-ink-muted">
          Vaše mjesto je zadržano. Rampa će prepoznati tablice{' '}
          <strong className="font-semibold text-ink">{normalizePlate(vehicle.plate)}</strong> pri dolasku.
        </p>

        <div className="mx-auto mt-6 max-w-sm overflow-hidden rounded-3xl border border-line bg-surface text-left shadow-card">
          <div className="bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">Referentni kod</p>
            <div className="mt-1 flex items-center justify-between gap-3">
              <p className="select-all font-mono text-3xl font-bold tracking-[0.06em]" aria-label={`Kod: ${reference}`}>
                {reference}
              </p>
              <button
                type="button"
                onClick={copy}
                aria-label="Kopiraj kod"
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
              {copied ? 'Kod je kopiran' : ''}
            </span>
          </div>

          {/* Ticket perforation */}
          <div className="relative h-0 border-t border-dashed border-line-strong">
            <span className="absolute -left-3 -top-3 size-6 rounded-full bg-[color-mix(in_oklab,var(--canvas)_88%,var(--surface))]" />
            <span className="absolute -right-3 -top-3 size-6 rounded-full bg-[color-mix(in_oklab,var(--canvas)_88%,var(--surface))]" />
          </div>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-4 px-6 py-5 text-sm">
            <div>
              <dt className="text-ink-faint">Dolazak</dt>
              <dd className="mt-0.5 font-semibold tabular">
                {formatDateShort(stay.dropOffDate)}, {stay.dropOffTime}
              </dd>
            </div>
            <div>
              <dt className="text-ink-faint">Povratak</dt>
              <dd className="mt-0.5 font-semibold tabular">
                {formatDateShort(stay.pickUpDate)}, {stay.pickUpTime}
              </dd>
            </div>
            <div>
              <dt className="text-ink-faint">Trajanje</dt>
              <dd className="mt-0.5 font-semibold">{formatDays(request.days)}</dd>
            </div>
            <div>
              <dt className="text-ink-faint">Plaćanje pri preuzimanju</dt>
              <dd className="mt-0.5 font-semibold tabular">{formatKM(request.total)}</dd>
            </div>
          </dl>
        </div>

        <div className="mx-auto mt-6 grid max-w-sm gap-2.5 sm:grid-cols-2">
          <Button
            variant="secondary"
            leftIcon={<CalendarPlus className="size-[1.125rem]" aria-hidden="true" />}
            onClick={() => downloadTextFile(`rezervacija-${reference}.ics`, buildIcs(confirmation), 'text/calendar')}
          >
            U kalendar
          </Button>
          <Button
            variant="secondary"
            href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            leftIcon={<MessageCircle className="size-[1.125rem]" aria-hidden="true" />}
          >
            Podijeli
          </Button>
        </div>

        <p className="mx-auto mt-5 flex max-w-sm items-start justify-center gap-2 text-xs leading-relaxed text-ink-faint">
          <PhoneCall className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          <span>
            Izmjene ili otkazivanje: najkasnije 24h prije dolaska na{' '}
            <a className="font-medium text-accent hover:underline" href={`tel:${SITE.phone.e164}`}>
              {SITE.phone.display}
            </a>{' '}
            ili{' '}
            <a
              className="font-medium text-accent hover:underline"
              href={whatsappLink(`Poštovanje, javljam se u vezi rezervacije ${reference}.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            .
          </span>
        </p>
      </m.div>
    </div>
  );
}
