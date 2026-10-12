import type { ReactNode } from 'react';
import { COVER_OPTIONS, VEHICLES } from '@/data/pricing';
import type { DriverDetails, Quote, StayDraft, VehicleDetails } from '@/types';
import { formatDateLong } from '@/utils/date';
import { formatDays, formatKM } from '@/utils/format';
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
  const cover = COVER_OPTIONS.find((c) => c.id === stay.cover)?.label ?? '';
  const vehicleClass = VEHICLES.find((v) => v.id === stay.vehicle)?.label ?? '';
  const plate = vehicle ? normalizePlate(vehicle.plate) : '';
  const flight = vehicle ? normalizeFlight(vehicle.flightNumber) : '';

  return (
    <dl className="divide-y divide-line">
      <Row label="Ostavljanje">
        {formatDateLong(stay.dropOffDate)}
        <span className="block font-medium text-ink-muted tabular">u {stay.dropOffTime}</span>
      </Row>
      <Row label="Preuzimanje">
        {formatDateLong(stay.pickUpDate)}
        <span className="block font-medium text-ink-muted tabular">u {stay.pickUpTime}</span>
      </Row>
      <Row label="Trajanje">{formatDays(quote.days)}</Row>
      <Row label="Parking">{cover}</Row>
      {vehicle && (
        <Row label="Vozilo">
          {vehicle.make.trim()}
          <span className="block font-medium text-ink-muted">
            {plate} · {vehicleClass}
          </span>
        </Row>
      )}
      {vehicle && (
        <Row label="Putnici">
          {vehicle.passengers}
          {flight && <span className="block font-medium text-ink-muted">Let {flight}</span>}
        </Row>
      )}
      {driver && (
        <Row label="Kontakt">
          {driver.fullName.trim()}
          <span className="block font-medium text-ink-muted">{driver.phone.trim()}</span>
          <span className="block font-medium text-ink-muted">{driver.email.trim()}</span>
        </Row>
      )}
      <Row label="Cijena parkinga">
        <span className="tabular">{formatKM(quote.parking)}</span>
        <span className="block font-medium text-ink-muted tabular">
          {quote.days} × {formatKM(quote.ratePerDay)}
        </span>
      </Row>
      {quote.extras.map((line) => (
        <Row key={line.id} label={line.label}>
          <span className="tabular">{formatKM(line.amount)}</span>
        </Row>
      ))}
    </dl>
  );
}
