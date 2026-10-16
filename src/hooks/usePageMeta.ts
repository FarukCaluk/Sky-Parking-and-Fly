import { useEffect } from 'react';
import { SITE_ORIGIN } from '@/data/site';
import { pageHead, type PageKey } from '@/i18n/pageMeta';
import type { Lang } from '@/router/routes';

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
    const head = pageHead(SITE_ORIGIN || window.location.origin, page, lang);

    document.title = head.title;
    setMeta('name', 'description', head.description);
    setMeta('property', 'og:title', head.title);
    setMeta('property', 'og:description', head.description);
    setMeta('property', 'og:locale', head.ogLocale);
    setMeta('property', 'og:site_name', head.siteName);

    if (head.noindex || !head.canonical) {
      setMeta('name', 'robots', 'noindex');
      document.head.querySelector('link[rel="canonical"]')?.remove();
      document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
      return;
    }

    document.head.querySelector('meta[name="robots"]')?.remove();
    setLink('canonical', head.canonical);
    setMeta('property', 'og:url', head.canonical);
    for (const { hreflang, href } of head.alternates) setLink('alternate', href, hreflang);
  }, [page, lang]);
}
