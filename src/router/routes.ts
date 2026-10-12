/**
 * Route table. Pure data with no imports, so it can also be used by the Vite config
 * (sitemap generation) and by tests.
 *
 * URL scheme: Bosnian (default language) lives at the root, English under `/en`, German under `/de`.
 * Slugs are localised for SEO, e.g. `/cijene` · `/en/pricing` · `/de/preise`.
 */

export const LANGS = ['bs', 'en', 'de'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'bs';

export const ROUTE_IDS = [
  'home',
  'pricing',
  'facilities',
  'shuttle',
  'reviews',
  'contact',
  'terms',
  'privacy',
  'cookies',
] as const;
export type RouteId = (typeof ROUTE_IDS)[number];

export const SLUGS: Record<RouteId, Record<Lang, string>> = {
  home: { bs: '', en: '', de: '' },
  pricing: { bs: 'cijene', en: 'pricing', de: 'preise' },
  facilities: { bs: 'objekat', en: 'facilities', de: 'einrichtungen' },
  shuttle: { bs: 'shuttle', en: 'shuttle', de: 'shuttle' },
  reviews: { bs: 'recenzije', en: 'reviews', de: 'bewertungen' },
  contact: { bs: 'kontakt', en: 'contact', de: 'kontakt' },
  terms: { bs: 'uslovi-koristenja', en: 'terms', de: 'nutzungsbedingungen' },
  privacy: { bs: 'politika-privatnosti', en: 'privacy', de: 'datenschutz' },
  cookies: { bs: 'kolacici', en: 'cookies', de: 'cookies' },
};

/** Pages shown in the main navigation, in order. */
export const NAV_ROUTES = [
  'pricing',
  'facilities',
  'shuttle',
  'reviews',
  'contact',
] as const satisfies readonly RouteId[];
/** Legal pages linked from the footer. */
export const LEGAL_ROUTES = ['terms', 'privacy', 'cookies'] as const satisfies readonly RouteId[];

export const isLang = (value: string): value is Lang => (LANGS as readonly string[]).includes(value);

/** Public path for a route in a language: `/`, `/cijene`, `/en`, `/en/pricing`, `/de/preise`. */
export function pathFor(lang: Lang, route: RouteId): string {
  const slug = SLUGS[route][lang];
  const prefix = lang === DEFAULT_LANG ? '' : `/${lang}`;
  const path = slug ? `${prefix}/${slug}` : prefix;
  return path === '' ? '/' : path;
}

export interface RouteMatch {
  lang: Lang;
  /** `null` when the path does not belong to any page (404). */
  route: RouteId | null;
}

/** Resolve a pathname (query and hash already removed) to a language and a page. */
export function matchPath(pathname: string): RouteMatch {
  const segments = pathname
    .toLowerCase()
    .split('/')
    .filter((segment) => segment !== '');

  let lang: Lang = DEFAULT_LANG;
  const first = segments[0];
  if (first && isLang(first) && first !== DEFAULT_LANG) {
    lang = first;
    segments.shift();
  }

  if (segments.length === 0) return { lang, route: 'home' };
  if (segments.length > 1) return { lang, route: null };

  const slug = segments[0];
  const route = ROUTE_IDS.find((id) => id !== 'home' && SLUGS[id][lang] === slug) ?? null;
  return { lang, route };
}

/** Path of the same page in another language (404s fall back to that language's home page). */
export function switchLangPath(pathname: string, target: Lang): string {
  const { route } = matchPath(pathname);
  return pathFor(target, route ?? 'home');
}
