import type { ReactNode } from 'react';
import { useI18n } from '@/i18n/context';
import { useFormat } from '@/i18n/useFormat';
import type { DriverDetails, Quote, StayDraft, VehicleDetails } from '@/types';
import { normalizeFlight, normalizePlate } from '@/utils/validation';

interface ReservationSummaryProps {
  stay: StayDraft;
  quote: Quote;
  driver?: DriverDetails;
  vehicle?: VehicleDetails;
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <dt className="shrink-0 text-sm text-ink-muted">{label}</dt>
      <dd className="min-w-0 text-right text-sm font-semibold leading-snug tracking-[-0.01em] [overflow-wrap:anywhere]">
        {children}
      </dd>
    </div>
  );
}

/** Read-only overview of a reservation, shared by the review step and the success ticket. */
export function ReservationSummary({ stay, quote, driver, vehicle }: ReservationSummaryProps) {
  const { t } = useI18n();
  const fmt = useFormat();
  const s = t.booking.summary;
  const plate = vehicle ? normalizePlate(vehicle.plate) : '';
  const flight = vehicle ? normalizeFlight(vehicle.flightNumber) : '';

  return (
    <dl className="divide-y divide-line">
      <Row label={s.dropOff}>
        {fmt.dateLong(stay.dropOffDate)}
        <span className="block font-medium text-ink-muted tabular">{s.at(stay.dropOffTime)}</span>
      </Row>
      <Row label={s.pickUp}>
        {fmt.dateLong(stay.pickUpDate)}
        <span className="block font-medium text-ink-muted tabular">{s.at(stay.pickUpTime)}</span>
      </Row>
      <Row label={s.duration}>{t.units.days(quote.days)}</Row>
      <Row label={s.parking}>{t.pricing.covers[stay.cover].label}</Row>
      {vehicle && (
        <Row label={s.vehicle}>
          {vehicle.make.trim()}
          <span className="block font-medium text-ink-muted">
            {plate} · {t.pricing.vehicles[stay.vehicle].label}
          </span>
        </Row>
      )}
      {vehicle && (
        <Row label={s.passengers}>
          {vehicle.passengers}
          {flight && <span className="block font-medium text-ink-muted">{s.flight(flight)}</span>}
        </Row>
      )}
      {driver && (
        <Row label={s.contact}>
          {driver.fullName.trim()}
          <span className="block font-medium text-ink-muted">{driver.phone.trim()}</span>
          <span className="block font-medium text-ink-muted">{driver.email.trim()}</span>
        </Row>
      )}
      <Row label={s.parkingPrice}>
        <span className="tabular">{fmt.km(quote.parking)}</span>
        <span className="block font-medium text-ink-muted tabular">
          {quote.days} × {fmt.km(quote.ratePerDay)}
        </span>
      </Row>
      {quote.extras.map((line) => (
        <Row key={line.id} label={t.pricing.extras[line.id].label}>
          <span className="tabular">{fmt.km(line.amount)}</span>
          {line.billing === 'perDay' && (
            <span className="block font-medium text-ink-muted tabular">
              {line.quantity} × {fmt.km(line.unit)}
            </span>
          )}
        </Row>
      ))}
    </dl>
  );
}
