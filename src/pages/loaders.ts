import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import { registerPrefetcher } from '@/router/prefetch';
import type { RouteId } from '@/router/routes';
import { runWhenIdle } from '@/utils/browser';
import Home from './Home';

export type PageKey = RouteId | 'notFound';
type PageComponent = ComponentType | LazyExoticComponent<ComponentType>;
type Loader = () => Promise<{ default: ComponentType }>;

/** Every page except the landing page is its own chunk, fetched on demand. */
const LOADERS: Record<Exclude<PageKey, 'home'>, Loader> = {
  pricing: () => import('./Pricing'),
  facilities: () => import('./Facilities'),
  shuttle: () => import('./Shuttle'),
  reviews: () => import('./Reviews'),
  contact: () => import('./Contact'),
  terms: () => import('./Legal').then((m) => ({ default: m.Terms })),
  privacy: () => import('./Legal').then((m) => ({ default: m.Privacy })),
  cookies: () => import('./Legal').then((m) => ({ default: m.Cookies })),
  notFound: () => import('./NotFound'),
};

export const PAGES: Record<PageKey, PageComponent> = {
  home: Home,
  pricing: lazy(LOADERS.pricing),
  facilities: lazy(LOADERS.facilities),
  shuttle: lazy(LOADERS.shuttle),
  reviews: lazy(LOADERS.reviews),
  contact: lazy(LOADERS.contact),
  terms: lazy(LOADERS.terms),
  privacy: lazy(LOADERS.privacy),
  cookies: lazy(LOADERS.cookies),
  notFound: lazy(LOADERS.notFound),
};

/** Warm a page's chunk (hover, focus or idle). Failures are ignored — the real navigation will retry. */
export function prefetchPage(page: PageKey): void {
  if (page === 'home') return;
  void LOADERS[page]().catch(() => undefined);
}

registerPrefetcher(prefetchPage);

/** After first paint, fetch the main pages one by one so navigation feels instant. */
export function prefetchMainPages(): void {
  (['pricing', 'facilities', 'shuttle', 'reviews', 'contact'] as const).forEach((page, index) => {
    runWhenIdle(() => prefetchPage(page), 2000 + index * 500);
  });
}
