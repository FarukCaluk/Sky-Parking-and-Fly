import { describe, expect, it } from 'vitest';
import { MESSAGES } from '@/i18n/messages';
import type { GuestDetails, StayDraft } from '@/types';
import { calculateQuote } from './pricing';
import { buildReservationText } from './reservation';

const stay: StayDraft = {
  dropOffDate: '2026-10-20',
  dropOffTime: '10:00',
  pickUpDate: '2026-10-27',
  pickUpTime: '10:00',
};
const quote = calculateQuote(7);
const fmt = {
  when: (date: string, time: string) => `${date} ${time}`,
  days: (n: number) => `${n} d`,
  km: (n: number) => `${n} KM`,
};
const guest: GuestDetails = { name: ' Amar Hodžić ', phone: '', plate: '', flight: '', note: '' };

describe('buildReservationText', () => {
  it('lists the dates and the estimate, and skips empty optional fields', () => {
    const lines = buildReservationText(MESSAGES.bs.reservation.message, fmt, stay, quote, guest).split('\n');
    expect(lines).toEqual([
      'Pozdrav, želim rezervisati parking.',
      '',
      'Dolazak: 2026-10-20 10:00',
      'Odlazak: 2026-10-27 10:00',
      'Boravak: 7 d, okvirno 56 KM',
      'Ime: Amar Hodžić',
    ]);
  });

  it('normalises phone, plate and flight number and keeps the note', () => {
    const text = buildReservationText(MESSAGES.bs.reservation.message, fmt, stay, quote, {
      name: 'Amar',
      phone: '062 963 901',
      plate: ' a12-k-345 ',
      flight: 'fr  1234',
      note: 'Kombi',
    });
    expect(text).toContain('Telefon: +38762963901');
    expect(text).toContain('Vozilo: A12-K-345');
    expect(text).toContain('Let: FR 1234');
    expect(text.endsWith('Napomena: Kombi')).toBe(true);
  });

  it('is written in the language of the dictionary and omits a missing name', () => {
    const text = buildReservationText(MESSAGES.en.reservation.message, fmt, stay, quote, { ...guest, name: '' });
    expect(text.startsWith('Hello, I would like to book parking.')).toBe(true);
    expect(text).toContain('Stay: 7 d, about 56 KM');
    expect(text).not.toContain('Name:');
  });
});
