import { describe, expect, it } from 'vitest';
import type { GuestDetails, StayDraft } from '../types/index.ts';
import { buildConfirmation, confirmationHtml, confirmationText, escapeHtml } from './confirmation';
import { calculateQuote } from './pricing';

const stay: StayDraft = {
  dropOffDate: '2026-10-20',
  dropOffTime: '10:00',
  pickUpDate: '2026-10-27',
  pickUpTime: '18:30',
};
const guest: GuestDetails = {
  name: 'Amar Hodžić',
  phone: '062 963 901',
  email: 'amar@example.ba',
  make: 'VW Golf 7',
  flight: 'fr 1234',
  note: '',
};
const input = { code: 'SKY-2010-7K3Q', stay, quote: calculateQuote(8), guest, lang: 'bs' as const };

describe('buildConfirmation', () => {
  it('says what was booked, for how long and what it costs', () => {
    const c = buildConfirmation(input);
    expect(c.title).toBe('Uspješna rezervacija');
    expect(c.period).toBe('od 20.10.2026, 10:00 do 27.10.2026, 18:30');
    expect(c.code).toBe('SKY-2010-7K3Q');
    expect(c.subject).toContain('SKY-2010-7K3Q');
    expect(c.details).toEqual([
      { label: 'Dolazak', value: 'utorak, 20. oktobar 2026. u 10:00' },
      { label: 'Odlazak', value: 'utorak, 27. oktobar 2026. u 18:30' },
      { label: 'Obračunati dani', value: '8 dana' },
      { label: 'Vozilo', value: 'VW Golf 7' },
      { label: 'Ime i prezime', value: 'Amar Hodžić' },
      { label: 'Telefon', value: '062 963 901' },
      { label: 'E-mail', value: 'amar@example.ba' },
      { label: 'Broj leta', value: 'FR 1234' },
    ]);
    expect(c.priceLines).toEqual([{ label: '8 dana × 8 KM po danu', value: '64 KM' }]);
    expect(c.total).toBe('64 KM');
  });

  it('spells out the days past the 30th', () => {
    const c = buildConfirmation({ ...input, quote: calculateQuote(34) });
    expect(c.priceLines).toEqual([
      { label: '30 dana × 6 KM po danu', value: '180 KM' },
      { label: 'Dodatni dani: 4 × 5 KM', value: '20 KM' },
    ]);
    expect(c.total).toBe('200 KM');
  });

  it('lists the rules, with the counting rule first and the delay rule among them', () => {
    const c = buildConfirmation(input);
    expect(c.rules).toHaveLength(9);
    expect(c.rules[0]).toMatch(/24 sata/);
    expect(c.rules[1]).toContain('5 KM');
    expect(c.rules.join(' ')).toMatch(/kašnjenj/i);
  });

  it('is written in the language of the guest, with the same structure', () => {
    const bs = buildConfirmation(input);
    for (const lang of ['en', 'de'] as const) {
      const c = buildConfirmation({ ...input, lang });
      expect(c.rules).toHaveLength(bs.rules.length);
      expect(c.details).toHaveLength(bs.details.length);
      expect(c.title).not.toBe(bs.title);
      expect(c.code).toBe(bs.code);
      expect(c.total).toBe(lang === 'en' ? '64 KM' : '64 KM');
    }
    expect(buildConfirmation({ ...input, lang: 'en' }).title).toBe('Reservation successful');
    expect(buildConfirmation({ ...input, lang: 'de' }).title).toBe('Reservierung erfolgreich');
  });

  it('leaves out what the guest did not fill in', () => {
    const c = buildConfirmation({ ...input, guest: { ...guest, make: '', flight: '', note: '' } });
    expect(c.details.map((row) => row.label)).not.toContain('Vozilo');
    expect(c.details.map((row) => row.label)).not.toContain('Broj leta');
  });
});

describe('the mail', () => {
  it('has the code, the period and the rules in plain text', () => {
    const text = confirmationText(buildConfirmation(input), { banner: 'Nova rezervacija' });
    expect(text.startsWith('Nova rezervacija')).toBe(true);
    expect(text).toContain('Kod rezervacije: SKY-2010-7K3Q');
    expect(text).toContain('od 20.10.2026, 10:00 do 27.10.2026, 18:30');
    expect(text).toContain('Ukupna cijena: 64 KM');
    expect(text).toContain('- Obračun počinje tačnim vremenom dolaska');
  });

  it('never lets what the guest typed become markup', () => {
    const hostile = { ...guest, name: '<script>alert(1)</script>', note: '"><img src=x onerror=alert(1)>' };
    const html = confirmationHtml(buildConfirmation({ ...input, guest: hostile }));
    expect(html).not.toContain('<script>');
    expect(html).not.toContain('<img');
    expect(html).toContain('&lt;script&gt;');
    expect(escapeHtml(`a&b<c>"d"'e'`)).toBe('a&amp;b&lt;c&gt;&quot;d&quot;&#39;e&#39;');
  });

  it('is a complete HTML document in the guest language', () => {
    const html = confirmationHtml(buildConfirmation({ ...input, lang: 'de' }));
    expect(html.startsWith('<!doctype html>')).toBe(true);
    expect(html).toContain('<html lang="de">');
    expect(html).toContain('Reservierung erfolgreich');
    expect(html).toContain('SKY-2010-7K3Q');
  });
});
