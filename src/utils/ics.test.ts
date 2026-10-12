import { describe, expect, it } from 'vitest';
import type { BookingConfirmation } from '@/types';
import { MESSAGES } from '@/i18n/messages';
import { buildIcs } from './ics';

const confirmation: BookingConfirmation = {
  reference: 'SPF-7K3M9Q',
  createdAt: '2026-10-12T09:15:30.123Z',
  request: {
    stay: {
      dropOffDate: '2026-10-20',
      dropOffTime: '10:00',
      pickUpDate: '2026-10-25',
      pickUpTime: '18:30',
      cover: 'covered',
      vehicle: 'car',
      extras: [],
    },
    days: 6,
    driver: { fullName: 'Amar Hodžić', email: 'amar@example.com', phone: '061 000 000' },
    vehicle: { plate: 'A12-K-345', make: 'VW Golf 7', color: '', passengers: '2', flightNumber: '' },
    total: 63,
    currency: 'BAM',
    locale: 'bs-BA',
  },
};

describe('buildIcs', () => {
  const ics = buildIcs(confirmation, MESSAGES.bs.booking.ics);

  it('produces a CRLF-terminated calendar with both events', () => {
    expect(ics.startsWith('BEGIN:VCALENDAR\r\n')).toBe(true);
    expect(ics.endsWith('END:VCALENDAR\r\n')).toBe(true);
    expect(ics.match(/BEGIN:VEVENT/g)).toHaveLength(2);
  });

  it('uses floating local times with a one-hour window', () => {
    expect(ics).toContain('DTSTART:20261020T100000');
    expect(ics).toContain('DTEND:20261020T110000');
    expect(ics).toContain('DTSTART:20261025T183000');
    expect(ics).toContain('DTEND:20261025T193000');
  });

  it('keeps every physical line within 75 octets', () => {
    const encoder = new TextEncoder();
    for (const line of ics.split('\r\n')) {
      expect(encoder.encode(line).length).toBeLessThanOrEqual(75);
    }
  });

  it('references the booking code', () => {
    expect(ics).toContain('SPF-7K3M9Q');
  });

  it('localises event titles', () => {
    expect(ics).toContain('SUMMARY:Parking — ostavljanje vozila');
    const en = buildIcs(confirmation, MESSAGES.en.booking.ics);
    expect(en).toContain('SUMMARY:Parking — vehicle drop-off');
    const de = buildIcs(confirmation, MESSAGES.de.booking.ics);
    expect(de).toContain('SUMMARY:Parkplatz — Fahrzeugabgabe');
  });
});
