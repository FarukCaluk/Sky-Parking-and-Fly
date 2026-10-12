import { useMemo, useSyncExternalStore } from 'react';
import { matchPath, type RouteMatch } from './routes';

/**
 * Minimal History-API navigation layer.
 * The URL is the single source of truth: components read it with `useRoute()` and change it with `navigate()`.
 */

const NAVIGATE_EVENT = 'spf:navigate';

export type NavigationType = 'initial' | 'push' | 'replace' | 'pop';

export interface NavigateOptions {
  replace?: boolean;
  /** Keep the current scroll position (used when only the language changes). */
  keepScroll?: boolean;
}

interface HistoryState {
  key: string;
}

let lastNavigation: NavigationType = 'initial';
let keepScrollKey: string | null = null;
let keyCounter = 0;
const scrollPositions = new Map<string, number>();

const isHistoryState = (value: unknown): value is HistoryState =>
  typeof value === 'object' && value !== null && 'key' in value && typeof value.key === 'string';

const newKey = (): string => `${Date.now().toString(36)}-${(keyCounter += 1)}`;

export function currentKey(): string {
  return isHistoryState(window.history.state) ? window.history.state.key : '';
}

/** Install once: give the first entry a key and take over scroll restoration from the browser. */
export function initNavigation(): void {
  if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
  if (!isHistoryState(window.history.state)) window.history.replaceState({ key: newKey() }, '');
  window.addEventListener('popstate', () => {
    lastNavigation = 'pop';
  });
  // Remember where the visitor was when leaving via the browser's own controls / closing the tab
  window.addEventListener('pagehide', () => scrollPositions.set(currentKey(), window.scrollY));
}

export function navigate(to: string, { replace = false, keepScroll = false }: NavigateOptions = {}): void {
  const url = new URL(to, window.location.href);
  if (url.origin !== window.location.origin) {
    window.location.assign(url.href);
    return;
  }

  if (url.pathname === window.location.pathname && url.search === window.location.search) {
    if (url.hash) window.location.hash = url.hash;
    else window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  scrollPositions.set(currentKey(), window.scrollY);
  const state: HistoryState = { key: newKey() };
  if (replace) window.history.replaceState(state, '', url);
  else window.history.pushState(state, '', url);
  lastNavigation = replace ? 'replace' : 'push';
  keepScrollKey = keepScroll ? state.key : null;
  window.dispatchEvent(new Event(NAVIGATE_EVENT));
}

/** What brought the visitor to the page that is now showing. */
export function lastNavigationType(): NavigationType {
  return lastNavigation;
}

/** `true` when the history entry now showing was reached with `keepScroll` (a language switch). */
export function shouldKeepScroll(): boolean {
  return keepScrollKey !== null && keepScrollKey === currentKey();
}

export function savedScroll(): number | undefined {
  return scrollPositions.get(currentKey());
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener('popstate', onChange);
  window.addEventListener(NAVIGATE_EVENT, onChange);
  return () => {
    window.removeEventListener('popstate', onChange);
    window.removeEventListener(NAVIGATE_EVENT, onChange);
  };
}

export function usePathname(): string {
  return useSyncExternalStore(
    subscribe,
    () => window.location.pathname,
    () => '/',
  );
}

/** Current language and page, derived from the URL. */
export function useRoute(): RouteMatch & { pathname: string } {
  const pathname = usePathname();
  return useMemo(() => ({ pathname, ...matchPath(pathname) }), [pathname]);
}
