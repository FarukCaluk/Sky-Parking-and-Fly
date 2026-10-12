import type { RouteId } from './routes';

type Prefetcher = (route: RouteId | 'notFound') => void;

let prefetcher: Prefetcher | null = null;

/** The page registry installs its chunk loader here, so `Link` can warm a page without importing the pages. */
export function registerPrefetcher(fn: Prefetcher): void {
  prefetcher = fn;
}

export function prefetchRoute(route: RouteId | 'notFound'): void {
  prefetcher?.(route);
}
