import { describe, expect, it } from 'vitest';
import { LANGS } from '@/router/routes';
import { fieldMessage, stayMessage } from './helpers';
import { MESSAGES } from './messages';

type Leaf = { path: string; value: string };

/** Flatten a dictionary into its string leaves (functions are skipped; arrays are indexed). */
function leaves(node: unknown, path = ''): Leaf[] {
  if (typeof node === 'string') return [{ path, value: node }];
  if (Array.isArray(node)) return node.flatMap((item, i) => leaves(item, `${path}[${i}]`));
  if (typeof node === 'object' && node !== null) {
    return Object.entries(node).flatMap(([key, value]) => leaves(value, path ? `${path}.${key}` : key));
  }
  return [];
}

/** Every key path, functions included, to prove the three dictionaries have identical structure. */
function paths(node: unknown, path = ''): string[] {
  if (typeof node === 'function') return [path];
  if (typeof node === 'string') return [path];
  if (Array.isArray(node))
    return [`${path}.length=${node.length}`, ...node.flatMap((item, i) => paths(item, `${path}[${i}]`))];
  if (typeof node === 'object' && node !== null) {
    return Object.entries(node).flatMap(([key, value]) => paths(value, path ? `${path}.${key}` : key));
  }
  return [path];
}

describe('dictionaries', () => {
  it('have an identical structure in every language', () => {
    const reference = paths(MESSAGES.bs);
    for (const lang of LANGS) expect(paths(MESSAGES[lang])).toEqual(reference);
  });

  it('contain no empty strings', () => {
    for (const lang of LANGS) {
      const empty = leaves(MESSAGES[lang]).filter((leaf) => leaf.value.trim() === '');
      expect(empty, `${lang}: ${empty.map((e) => e.path).join(', ')}`).toEqual([]);
    }
  });

  it('translate: English and German differ from Bosnian for visible titles', () => {
    for (const lang of ['en', 'de'] as const) {
      // The name is the same everywhere; the distance line is what gets translated
      expect(MESSAGES[lang].hero.distance).not.toBe(MESSAGES.bs.hero.distance);
      expect(MESSAGES[lang].nav.pages.pricing).not.toBe(MESSAGES.bs.nav.pages.pricing);
      expect(MESSAGES[lang].faq.items[0]?.q).not.toBe(MESSAGES.bs.faq.items[0]?.q);
    }
  });

  it('use no em or en dashes in visible copy', () => {
    for (const lang of LANGS) {
      const dashed = leaves(MESSAGES[lang]).filter((leaf) => /[–—]/.test(leaf.value));
      expect(
        dashed.map((d) => d.path),
        lang,
      ).toEqual([]);
    }
  });

  it('list every band of the price list in the FAQ answer', () => {
    for (const lang of LANGS) {
      const priceItem = MESSAGES[lang].faq.items.find((item) => item.list);
      expect(priceItem?.list?.map((row) => row.value.match(/\d+/)?.[0])).toEqual(['9', '8', '7', '6', '5']);
    }
  });

  it('have working date vocabularies (7 weekdays, 12 months)', () => {
    for (const lang of LANGS) {
      const { date } = MESSAGES[lang];
      expect(date.weekdaysLong).toHaveLength(7);
      expect(date.weekdaysShort).toHaveLength(7);
      expect(date.monthsLong).toHaveLength(12);
      expect(date.monthsShort).toHaveLength(12);
    }
  });
});

describe('helpers', () => {
  it('resolve guest field messages per language', () => {
    expect(fieldMessage(MESSAGES.bs, 'name', 'required')).toBe('Unesite ime i prezime.');
    expect(fieldMessage(MESSAGES.en, 'name', 'required')).toBe('Enter your name.');
    expect(fieldMessage(MESSAGES.de, 'name', 'required')).toBe('Geben Sie Ihren Namen ein.');
    // A phone number is needed to send the form, but not to compose a message
    expect(fieldMessage(MESSAGES.en, 'phone', 'required')).toBe(
      'Enter your phone number so we can confirm your dates.',
    );
    // The confirmation goes to the e-mail address, so the form asks for it
    expect(fieldMessage(MESSAGES.en, 'email', 'required')).toBe(
      'Enter the e-mail address where we should send the confirmation.',
    );
    expect(fieldMessage(MESSAGES.bs, 'email', 'invalid')).toBe('E-mail adresa nije ispravna.');
  });

  it('resolve stay messages, including the one that needs a number', () => {
    expect(stayMessage(MESSAGES.en, 'dropOffPast')).toBe('The arrival time has already passed.');
    expect(stayMessage(MESSAGES.en, 'rangeTooLong')).toContain('60 days');
    expect(stayMessage(MESSAGES.de, 'rangeTooLong')).toContain('60 Tage');
    expect(stayMessage(MESSAGES.bs, 'rangeTooLong')).toContain('60 dana');
  });
});
