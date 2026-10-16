import { describe, expect, it, vi } from 'vitest';
import type { GuestDetails, StayDraft } from '@/types';
import { calculateQuote } from '@/utils/pricing';
import { RESERVATION_CODE_PATTERN } from '@/utils/reservationCode';
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
  email: 'amar@example.ba',
  make: 'VW Golf 7',
  flight: 'fr 1234',
  note: '',
};
const submission: ReservationSubmission = { stay, quote: calculateQuote(8), guest, lang: 'en' };

const json = (body: unknown, status = 200) =>
  ({ ok: status >= 200 && status < 300, status, json: async () => body }) as Response;
const html = () =>
  ({ ok: true, status: 200, json: async () => Promise.reject(new SyntaxError('not json')) }) as unknown as Response;

describe('buildMailFields', () => {
  it('writes the mail in Bosnian and leaves out empty optional fields', () => {
    const fields = buildMailFields(submission, 'SKY-2010-7K3Q');
    expect(fields).toMatchObject({
      _subject: 'Nova rezervacija SKY-2010-7K3Q: Amar Hodžić, 20.10.2026 - 27.10.2026',
      'Kod rezervacije': 'SKY-2010-7K3Q',
      'Ime i prezime': 'Amar Hodžić',
      Telefon: '+38762963901',
      Dolazak: '20.10.2026 u 10:00',
      Odlazak: '27.10.2026 u 18:30',
      Boravak: '8 dana',
      'Okvirna cijena': '64 KM',
      email: 'amar@example.ba',
      'Marka vozila': 'VW Golf 7',
      'Broj leta': 'FR 1234',
      'Jezik stranice': 'en',
    });
    expect(fields).not.toHaveProperty('Napomena');
  });
});

describe('submitReservation through the mail function', () => {
  it('posts the stay and the guest, and takes the code the function made', async () => {
    const fetcher = vi.fn(async () => json({ ok: true, code: 'SKY-2010-AB23', customerMail: true }));
    await expect(submitReservation(submission, fetcher)).resolves.toEqual({
      code: 'SKY-2010-AB23',
      customerMail: true,
    });

    expect(fetcher).toHaveBeenCalledTimes(1);
    const [url, init] = fetcher.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('/api/reservation');
    expect(JSON.parse(String(init.body))).toEqual({ lang: 'en', stay, guest });
  });

  it('says so when the confirmation could not be mailed to the guest', async () => {
    const fetcher = vi.fn(async () => json({ ok: true, code: 'SKY-2010-AB23', customerMail: false }));
    await expect(submitReservation(submission, fetcher)).resolves.toMatchObject({ customerMail: false });
  });

  it('is an error, not a detour, when the function refuses the reservation', async () => {
    for (const status of [400, 429]) {
      const fetcher = vi.fn(async () => json({ error: 'invalid' }, status));
      await expect(submitReservation(submission, fetcher)).rejects.toMatchObject({ code: 'rejected' });
      expect(fetcher).toHaveBeenCalledTimes(1);
    }
  });
});

describe('submitReservation when the mail function is not available', () => {
  /** First call is the function (answered by `first`), second is FormSubmit */
  const withFallback = (first: () => Promise<Response>, second = async () => json({ success: 'true' })) =>
    vi.fn().mockImplementationOnce(first).mockImplementationOnce(second);

  it.each([
    ['not set up (503)', async () => json({ error: 'not-configured' }, 503)],
    ['missing (404)', async () => json({}, 404)],
    ['answered by the page itself', async () => html()],
    ['broken (502)', async () => json({ error: 'send-failed' }, 502)],
    ['unreachable', async () => Promise.reject(new TypeError('offline'))],
  ])('falls back to FormSubmit when it is %s', async (_name, first) => {
    const fetcher = withFallback(first);
    const result = await submitReservation(submission, fetcher);

    expect(result.code).toMatch(RESERVATION_CODE_PATTERN);
    expect(result.customerMail).toBe(false);
    expect(fetcher).toHaveBeenCalledTimes(2);
    const [url, init] = fetcher.mock.calls[1] as unknown as [string, RequestInit];
    expect(url).toMatch(/^https:\/\/formsubmit\.co\/ajax\/[^%]+@[^%]+$/);
    const sent = JSON.parse(String(init.body));
    expect(sent['Kod rezervacije']).toBe(result.code);
    expect(sent['Ime i prezime']).toBe('Amar Hodžić');
  });

  it('fails when FormSubmit does not accept the mail either', async () => {
    const down = async () => json({}, 503);
    await expect(
      submitReservation(
        submission,
        withFallback(down, async () => json({ success: 'false' })),
      ),
    ).rejects.toMatchObject({
      code: 'rejected',
    });
    await expect(
      submitReservation(
        submission,
        withFallback(down, async () => json({}, 500)),
      ),
    ).rejects.toBeInstanceOf(ReservationError);
  });

  it('reports a network failure of the fallback', async () => {
    const down = async () => json({}, 503);
    const offline = async (): Promise<Response> => Promise.reject(new TypeError('offline'));
    await expect(submitReservation(submission, withFallback(down, offline))).rejects.toMatchObject({ code: 'network' });
  });
});
