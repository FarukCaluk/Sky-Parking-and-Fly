import { describe, expect, it, vi } from 'vitest';
import type { GuestDetails, StayDraft } from '@/types';
import { calculateQuote } from '@/utils/pricing';
import { buildMailFields, ReservationError, submitReservation, type ReservationSubmission } from './reservationGateway';

const stay: StayDraft = {
  dropOffDate: '2026-10-20',
  dropOffTime: '10:00',
  pickUpDate: '2026-10-27',
  pickUpTime: '18:30',
};
const guest: GuestDetails = {
  name: ' Amar Hodžić ',
  phone: '062 963 901',
  email: '',
  make: 'VW Golf 7',
  flight: 'fr 1234',
  note: '',
};
const submission: ReservationSubmission = { stay, quote: calculateQuote(8), guest, lang: 'en' };

const reply = (body: unknown, ok = true) => vi.fn(async () => ({ ok, json: async () => body }) as Response);

describe('buildMailFields', () => {
  it('writes the mail in Bosnian and leaves out empty optional fields', () => {
    const fields = buildMailFields(submission);
    expect(fields).toMatchObject({
      _subject: 'Nova rezervacija: Amar Hodžić, 20.10.2026 - 27.10.2026',
      'Ime i prezime': 'Amar Hodžić',
      Telefon: '+38762963901',
      Dolazak: '20.10.2026 u 10:00',
      Odlazak: '27.10.2026 u 18:30',
      Boravak: '8 dana',
      'Okvirna cijena': '64 KM',
      'Marka vozila': 'VW Golf 7',
      'Broj leta': 'FR 1234',
      'Jezik stranice': 'en',
    });
    expect(fields).not.toHaveProperty('email');
    expect(fields).not.toHaveProperty('Napomena');
  });

  it('uses the visitor e-mail as the reply address when there is one', () => {
    const fields = buildMailFields({ ...submission, guest: { ...guest, email: 'amar@example.ba' } });
    expect(fields.email).toBe('amar@example.ba');
  });
});

describe('submitReservation', () => {
  it('posts the reservation as JSON and resolves when the mail was accepted', async () => {
    const fetcher = reply({ success: 'true' });
    await expect(submitReservation(submission, fetcher)).resolves.toBeUndefined();
    const [url, init] = fetcher.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toMatch(/^https:\/\/formsubmit\.co\/ajax\/[^%]+@[^%]+$/);
    expect(init.method).toBe('POST');
    expect(JSON.parse(String(init.body))['Ime i prezime']).toBe('Amar Hodžić');
  });

  it('rejects when the service does not accept the mail', async () => {
    await expect(submitReservation(submission, reply({ success: 'false', message: 'x' }))).rejects.toMatchObject({
      code: 'rejected',
    });
    await expect(submitReservation(submission, reply({}, false))).rejects.toBeInstanceOf(ReservationError);
  });

  it('reports a network failure', async () => {
    const fetcher = vi.fn(async () => {
      throw new TypeError('offline');
    });
    await expect(submitReservation(submission, fetcher)).rejects.toMatchObject({ code: 'network' });
  });
});
