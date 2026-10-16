import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import App from '@/App';
import { PHOTOS, photoSrcSet } from '@/data/photos';
import { setBuildTime } from '@/hooks/useNow';
import { pageHead, type PageHead, type PageKey } from '@/i18n/pageMeta';
import { setPrerenderedPath } from '@/router/navigation';
import { isArticleRoute, LANGS, matchPath, pathFor, ROUTE_IDS, type ArticleRouteId, type Lang } from '@/router/routes';

/**
 * The build's way of drawing a page: `scripts/prerender.mjs` calls `render` for every address of the site and writes
 * the result into the HTML file of that address. The browser then attaches React to the markup (`src/main.tsx`).
 */

export interface PageToRender {
  /** Address of the page, as in the browser bar */
  pathname: string;
  /** File in the output folder; the host serves it at `pathname` without the extension */
  file: string;
  page: PageKey;
  lang: Lang;
  /** Source file of the page's own chunk (everything but the home page has one), for the browser to fetch it early */
  chunk: string | null;
}

/** The source file behind each lazily loaded page (see `src/pages/loaders.ts`). */
const CHUNK_OF: Record<Exclude<PageKey, 'home' | ArticleRouteId>, string> = {
  pricing: 'Pricing',
  facilities: 'Facilities',
  shuttle: 'Shuttle',
  reviews: 'Reviews',
  news: 'News',
  faq: 'Faq',
  contact: 'Contact',
  reservation: 'Reservation',
  confirmed: 'Confirmed',
  terms: 'Legal',
  privacy: 'Legal',
  cookies: 'Legal',
  notFound: 'NotFound',
};

function chunkOf(page: PageKey): string | null {
  if (page === 'home') return null;
  return `src/pages/${isArticleRoute(page) ? 'Article' : CHUNK_OF[page]}.tsx`;
}

/** Every page of the site in every language, and the page for unknown addresses. */
export function pagesToRender(): PageToRender[] {
  const pages: PageToRender[] = [];
  for (const lang of LANGS) {
    for (const route of ROUTE_IDS) {
      const pathname = pathFor(lang, route);
      const file = pathname === '/' ? 'index.html' : `${pathname.slice(1)}.html`;
      pages.push({ pathname, file, page: route, lang, chunk: chunkOf(route) });
    }
  }
  pages.push({ pathname: '/404', file: '404.html', page: 'notFound', lang: 'bs', chunk: chunkOf('notFound') });
  return pages;
}

export interface RenderedPage {
  html: string;
  head: PageHead;
  /** The photograph the page opens on, to be fetched before anything else (only the home page has one) */
  heroPreload: { media: string; srcset: string }[];
}

export async function render(page: PageToRender, origin: string, builtAt: Date): Promise<RenderedPage> {
  setBuildTime(builtAt);
  setPrerenderedPath(page.pathname);

  // React sends a large part of the page (more than 12.8 kB, by default) after the rest, hidden at the end of the
  // document and moved into place by a script, so that a slow part cannot hold up the rest. Here nothing is slow, and
  // the visitor must see the whole page in the first paint, so everything is written in place.
  const { prelude } = await prerender(
    <StrictMode>
      <App />
    </StrictMode>,
    { progressiveChunkSize: Infinity },
  );
  const html = await new Response(prelude).text();
  if (html.includes('<template id="B:') || html.includes('$RC(')) {
    throw new Error(`prerender: ${page.pathname} still contains parts that arrive out of order`);
  }

  const route = matchPath(page.pathname).route;
  const hero = PHOTOS.jet;
  return {
    html,
    head: pageHead(origin, page.page, page.lang),
    heroPreload:
      route === 'home' && hero.portrait
        ? [
            { media: '(max-width: 767px)', srcset: photoSrcSet(hero.portrait, 'avif') },
            { media: '(min-width: 768px)', srcset: photoSrcSet(hero.main, 'avif') },
          ]
        : [],
  };
}
