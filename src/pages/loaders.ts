import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import { registerPrefetcher } from '@/router/prefetch';
import { ARTICLE_ROUTE_IDS, type ArticleRouteId, type RouteId } from '@/router/routes';
import { runWhenIdle } from '@/utils/browser';
import Home from './Home';

export type PageKey = RouteId | 'notFound';
type PageComponent = ComponentType | LazyExoticComponent<ComponentType>;
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

const ArticlePage = lazy(loadArticle);

export const PAGES: Record<PageKey, PageComponent> = {
  home: Home,
  pricing: lazy(LOADERS.pricing),
  facilities: lazy(LOADERS.facilities),
  shuttle: lazy(LOADERS.shuttle),
  reviews: lazy(LOADERS.reviews),
  news: lazy(LOADERS.news),
  faq: lazy(LOADERS.faq),
  contact: lazy(LOADERS.contact),
  reservation: lazy(LOADERS.reservation),
  terms: lazy(LOADERS.terms),
  privacy: lazy(LOADERS.privacy),
  cookies: lazy(LOADERS.cookies),
  notFound: lazy(LOADERS.notFound),
  ...forArticles(ArticlePage),
};

/** Warm a page's chunk (hover, focus or idle). Failures are ignored, the real navigation will retry. */
export function prefetchPage(page: PageKey): void {
  if (page === 'home') return;
  void LOADERS[page]().catch(() => undefined);
}

registerPrefetcher(prefetchPage);

/** After first paint, fetch the pages people go to next, one by one, so navigation feels instant. */
export function prefetchMainPages(): void {
  (['reservation', 'pricing', 'faq', 'contact', 'facilities'] as const).forEach((page, index) => {
    runWhenIdle(() => prefetchPage(page), 2000 + index * 500);
  });
}
