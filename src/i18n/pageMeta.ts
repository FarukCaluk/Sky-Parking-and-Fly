import { MESSAGES, type Messages } from './messages';
import { isArticleRoute, LANGS, newsIdOf, pathFor, type Lang, type RouteId } from '../router/routes';

export type PageKey = RouteId | 'notFound';

/** Title and description of a page. An article takes them from its own text: the title and the excerpt. */
export function pageMeta(t: Messages, page: PageKey): { title: string; description: string } {
  if (page !== 'notFound' && isArticleRoute(page)) {
    const article = t.news.items[newsIdOf(page)];
    return { title: `${article.title} | ${t.meta.siteName}`, description: article.excerpt };
  }
  return t.meta.pages[page];
}

export interface PageHead {
  lang: Lang;
  title: string;
  description: string;
  ogLocale: string;
  siteName: string;
  /** Unknown pages are not indexed and have no canonical address or alternates */
  noindex: boolean;
  canonical?: string;
  /** One per language, then `x-default` */
  alternates: { hreflang: string; href: string }[];
}

/**
 * Everything the head of a page says about it. The browser keeps it up to date while the visitor moves around
 * (`usePageMeta`), and the build writes the same into the HTML of every page, so crawlers and link previews, which do
 * not run the app, read the right title, description and language versions.
 */
export function pageHead(origin: string, page: PageKey, lang: Lang): PageHead {
  const t = MESSAGES[lang];
  const { title, description } = pageMeta(t, page);
  const base = { lang, title, description, ogLocale: t.meta.ogLocale, siteName: t.meta.siteName };
  if (page === 'notFound') return { ...base, noindex: true, alternates: [] };

  return {
    ...base,
    noindex: false,
    canonical: `${origin}${pathFor(lang, page)}`,
    alternates: [
      ...LANGS.map((code) => ({ hreflang: code, href: `${origin}${pathFor(code, page)}` })),
      { hreflang: 'x-default', href: `${origin}${pathFor('bs', page)}` },
    ],
  };
}
