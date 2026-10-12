import { useEffect } from 'react';
import { MESSAGES } from '@/i18n/messages';
import { LANGS, pathFor, type Lang, type RouteId } from '@/router/routes';

type PageKey = RouteId | 'notFound';

function upsert(selector: string, create: () => HTMLElement, apply: (el: HTMLElement) => void): void {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  apply(el);
}

const setMeta = (attr: 'name' | 'property', key: string, content: string): void =>
  upsert(
    `meta[${attr}="${key}"]`,
    () => {
      const el = document.createElement('meta');
      el.setAttribute(attr, key);
      return el;
    },
    (el) => el.setAttribute('content', content),
  );

function setLink(rel: string, href: string, hreflang?: string): void {
  const selector = `link[rel="${rel}"]${hreflang ? `[hreflang="${hreflang}"]` : ':not([hreflang])'}`;
  upsert(
    selector,
    () => {
      const el = document.createElement('link');
      el.setAttribute('rel', rel);
      if (hreflang) el.setAttribute('hreflang', hreflang);
      return el;
    },
    (el) => el.setAttribute('href', href),
  );
}

/**
 * Keeps the document head in step with the page: title, description, Open Graph, canonical URL
 * and `hreflang` alternates for every language. Unknown pages are marked `noindex`.
 */
export function usePageMeta(page: PageKey, lang: Lang): void {
  useEffect(() => {
    const t = MESSAGES[lang];
    const { title, description } = t.meta.pages[page];
    const origin = window.location.origin;

    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:locale', t.meta.ogLocale);
    setMeta('property', 'og:site_name', t.meta.siteName);

    if (page === 'notFound') {
      setMeta('name', 'robots', 'noindex');
      document.head.querySelector('link[rel="canonical"]')?.remove();
      document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
      return;
    }

    document.head.querySelector('meta[name="robots"]')?.remove();
    const url = `${origin}${pathFor(lang, page)}`;
    setLink('canonical', url);
    setMeta('property', 'og:url', url);
    for (const code of LANGS) setLink('alternate', `${origin}${pathFor(code, page)}`, code);
    setLink('alternate', `${origin}${pathFor('bs', page)}`, 'x-default');
  }, [page, lang]);
}
