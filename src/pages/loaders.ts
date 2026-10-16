import type { ComponentType } from 'react';
import { lazyComponent } from '@/components/lazy';
import { registerPrefetcher } from '@/router/prefetch';
import { ARTICLE_ROUTE_IDS, type ArticleRouteId, type RouteId } from '@/router/routes';
import { runWhenIdle } from '@/utils/browser';
import Home from './Home';

export type PageKey = RouteId | 'notFound';
type Loader = () => Promise<{ default: ComponentType }>;

/** Every news article is its own route, but they all render through the one `Article` page. */
const forArticles = <T>(value: T): Record<ArticleRouteId, T> =>
  Object.fromEntries(ARTICLE_ROUTE_IDS.map((id) => [id, value])) as Record<ArticleRouteId, T>;

const loadArticle: Loader = () => import('./Article');

/** Every page except the landing page is its own chunk, fetched on demand. */
const LOADERS: Record<Exclude<PageKey, 'home'>, Loader> = {
  pricing: () => import('./Pricing'),
  facilities: () => import('./Facilities'),
  shuttle: () => import('./Shuttle'),
  reviews: () => import('./Reviews'),
  news: () => import('./News'),
  faq: () => import('./Faq'),
  contact: () => import('./Contact'),
  reservation: () => import('./Reservation'),
  terms: () => import('./Legal').then((m) => ({ default: m.Terms })),
  privacy: () => import('./Legal').then((m) => ({ default: m.Privacy })),
  cookies: () => import('./Legal').then((m) => ({ default: m.Cookies })),
  notFound: () => import('./NotFound'),
  ...forArticles(loadArticle),
};

const LAZY = Object.fromEntries(
  Object.entries(LOADERS).map(([page, load]) => [page, lazyComponent(load)] as const),
) as Record<Exclude<PageKey, 'home'>, ReturnType<typeof lazyComponent<object>>>;

export const PAGES: Record<PageKey, ComponentType> = {
  home: Home,
  ...(Object.fromEntries(Object.entries(LAZY).map(([page, lazy]) => [page, lazy.Component] as const)) as Record<
    Exclude<PageKey, 'home'>,
    ComponentType
  >),
};

/** Fetch a page's code. The home page is part of the main bundle. Once fetched, the page renders without a loading state. */
export const loadPage = (page: PageKey): Promise<unknown> =>
  page === 'home' ? Promise.resolve() : LAZY[page].preload();

/** Warm a page's chunk (hover, focus or idle). Failures are ignored, the real navigation will retry. */
export function prefetchPage(page: PageKey): void {
  void loadPage(page).catch(() => undefined);
}

registerPrefetcher(prefetchPage);

/** After first paint, fetch the pages people go to next, one by one, so navigation feels instant. */
export function prefetchMainPages(): void {
  (['reservation', 'pricing', 'faq', 'contact', 'facilities'] as const).forEach((page, index) => {
    runWhenIdle(() => prefetchPage(page), 2000 + index * 500);
  });
}
