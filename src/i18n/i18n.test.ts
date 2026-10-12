import { describe, expect, it } from 'vitest';
import { LANGS } from '@/router/routes';
import { bs } from './bs';
import { fieldMessage, stayMessage } from './helpers';
import { MESSAGES } from './messages';
import { fillTemplate } from './template';

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

/** Every key path, functions included — to prove the three dictionaries have identical structure. */
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

  it('use the same {{placeholders}} as the source language', () => {
    const placeholders = (text: string) => [...text.matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1]).sort();
    const source = new Map(leaves(bs).map((leaf) => [leaf.path, placeholders(leaf.value)]));
    for (const lang of LANGS) {
      for (const leaf of leaves(MESSAGES[lang])) {
        expect(placeholders(leaf.value), `${lang}:${leaf.path}`).toEqual(source.get(leaf.path));
      }
    }
  });

  it('translate: English and German differ from Bosnian for visible titles', () => {
    for (const lang of ['en', 'de'] as const) {
      expect(MESSAGES[lang].hero.titleLine1).not.toBe(MESSAGES.bs.hero.titleLine1);
      expect(MESSAGES[lang].nav.pages.pricing).not.toBe(MESSAGES.bs.nav.pages.pricing);
    }
  });

  it('have working date vocabularies (7 weekdays, 12 months)', () => {
    for (const lang of LANGS) {
      const { date } = MESSAGES[lang];
      expect(date.weekdaysLong).toHaveLength(7);
      expect(date.weekdaysShort).toHaveLength(7);
      expect(date.calendarHeader).toHaveLength(7);
      expect(date.monthsLong).toHaveLength(12);
      expect(date.monthsShort).toHaveLength(12);
    }
  });
});

describe('helpers', () => {
  it('resolve validation messages per language', () => {
    expect(fieldMessage(MESSAGES.bs, 'email', 'required')).toBe('Unesite e-mail adresu.');
    expect(fieldMessage(MESSAGES.en, 'email', 'required')).toBe('Enter your e-mail address.');
    expect(fieldMessage(MESSAGES.de, 'email', 'required')).toBe('Geben Sie Ihre E-Mail-Adresse ein.');
    expect(fieldMessage(MESSAGES.en, 'make', 'invalid')).toBeUndefined();
  });

  it('resolve stay messages, including the one that needs a number', () => {
    expect(stayMessage(MESSAGES.en, 'dropOffPast', 60)).toBe('The drop-off time has already passed.');
    expect(stayMessage(MESSAGES.en, 'rangeTooLong', 60)).toContain('60 days');
    expect(stayMessage(MESSAGES.de, 'rangeTooLong', 60)).toContain('60 Tagen');
    expect(stayMessage(MESSAGES.bs, 'rangeTooLong', 60)).toContain('60 dana');
  });
});

describe('fillTemplate', () => {
  it('replaces known placeholders only', () => {
    expect(fillTemplate('{{a}} and {{b}} and {{c}}', { a: 'X', b: 'Y' })).toBe('X and Y and {{c}}');
  });
});
