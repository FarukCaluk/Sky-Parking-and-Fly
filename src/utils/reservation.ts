import type { Messages } from '@/i18n/messages';
import type { GuestDetails, Quote, StayDraft } from '@/types';
import { normalizeCode, toInternationalPhone } from './validation';

export interface ReservationFormat {
  /** `2026-10-12` + `10:00` in the visitor's language */
  when: (isoDate: string, time: string) => string;
  days: (count: number) => string;
  km: (amount: number) => string;
}

/**
 * Plain-text reservation request. It goes out through the visitor's own WhatsApp, Viber or mail app,
 * so nothing is stored by the site and the sender stays in control of what is sent.
 */
export function buildReservationText(
  m: Messages['reservation']['message'],
  fmt: ReservationFormat,
  stay: StayDraft,
  quote: Quote,
  guest: GuestDetails,
): string {
  const lines = [
    m.greeting,
    '',
    m.arrival(fmt.when(stay.dropOffDate, stay.dropOffTime)),
    m.departure(fmt.when(stay.pickUpDate, stay.pickUpTime)),
    m.stay(fmt.days(quote.days), fmt.km(quote.total)),
  ];

  const name = guest.name.trim();
  if (name) lines.push(m.name(name));
  const phone = guest.phone.trim();
  if (phone) lines.push(m.phone(toInternationalPhone(phone)));
  const plate = normalizeCode(guest.plate);
  if (plate) lines.push(m.plate(plate));
  const flight = normalizeCode(guest.flight);
  if (flight) lines.push(m.flight(flight));
  const note = guest.note.trim();
  if (note) lines.push(m.note(note));

  return lines.join('\n');
}
