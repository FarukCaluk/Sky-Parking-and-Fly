import { describe, expect, it } from 'vitest';
import {
  DEFAULT_LANG,
  LANGS,
  matchPath,
  pathFor,
  ROUTE_IDS,
  SLUGS,
  switchLangPath,
  type Lang,
  type RouteId,
} from './routes';

describe('pathFor', () => {
  it('builds language-prefixed, localised paths', () => {
    expect(pathFor('bs', 'home')).toBe('/');
    expect(pathFor('bs', 'pricing')).toBe('/cijene');
    expect(pathFor('en', 'home')).toBe('/en');
    expect(pathFor('en', 'pricing')).toBe('/en/pricing');
    expect(pathFor('de', 'pricing')).toBe('/de/preise');
    expect(pathFor('de', 'privacy')).toBe('/de/datenschutz');
  });

  it('keeps the FAQ at the same address as the original site', () => {
    expect(pathFor('bs', 'faq')).toBe('/cesta-pitanja');
    expect(pathFor('en', 'faq')).toBe('/en/faq');
    expect(pathFor('de', 'faq')).toBe('/de/haeufige-fragen');
  });
});

describe('matchPath', () => {
  it('round-trips every route in every language', () => {
    for (const lang of LANGS) {
      for (const route of ROUTE_IDS) {
        expect(matchPath(pathFor(lang, route))).toEqual({ lang, route });
      }
    }
  });

  it('treats unprefixed paths as the default language', () => {
    expect(matchPath('/')).toEqual({ lang: DEFAULT_LANG, route: 'home' });
    expect(matchPath('/kontakt')).toEqual({ lang: 'bs', route: 'contact' });
  });

  it('ignores trailing slashes and letter case', () => {
    expect(matchPath('/en/pricing/')).toEqual({ lang: 'en', route: 'pricing' });
    expect(matchPath('/DE/Preise')).toEqual({ lang: 'de', route: 'pricing' });
  });

  it("does not accept another language's slug", () => {
    expect(matchPath('/en/cijene').route).toBeNull();
    expect(matchPath('/pricing').route).toBeNull();
    expect(matchPath('/de/pricing').route).toBeNull();
  });

  it('keeps the language for unknown pages so the 404 is localised', () => {
    expect(matchPath('/de/nirgendwo')).toEqual({ lang: 'de', route: null });
    expect(matchPath('/en/pricing/extra')).toEqual({ lang: 'en', route: null });
    expect(matchPath('/nope')).toEqual({ lang: 'bs', route: null });
  });

  it('treats an explicit /bs prefix as a page of the default language, not as a language', () => {
    expect(matchPath('/bs').route).toBeNull();
  });
});

describe('switchLangPath', () => {
  it('maps a page to the same page in the target language', () => {
    expect(switchLangPath('/cijene', 'en')).toBe('/en/pricing');
    expect(switchLangPath('/en/pricing', 'de')).toBe('/de/preise');
    expect(switchLangPath('/de/kontakt', 'bs')).toBe('/kontakt');
  });

  it('falls back to the home page for unknown paths', () => {
    expect(switchLangPath('/nope', 'de')).toBe('/de');
  });
});

describe('slugs', () => {
  it('are unique within a language', () => {
    for (const lang of LANGS as readonly Lang[]) {
      const slugs = (ROUTE_IDS as readonly RouteId[]).map((id) => SLUGS[id][lang]);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });

  it('are URL-safe', () => {
    for (const id of ROUTE_IDS) for (const lang of LANGS) expect(SLUGS[id][lang]).toMatch(/^[a-z0-9-]*$/);
  });

  it('keep the news at the addresses of the original site', () => {
    expect(pathFor('bs', 'news')).toBe('/novosti');
    expect(pathFor('bs', 'article-transfer')).toBe('/transfer-do-aerodroma-korak-po-korak');
    expect(pathFor('en', 'article-transfer')).toBe('/en/airport-transfer-step-by-step');
    expect(switchLangPath('/transfer-do-aerodroma-korak-po-korak', 'de')).toBe(
      '/de/transfer-zum-flughafen-schritt-fuer-schritt',
    );
  });
});
