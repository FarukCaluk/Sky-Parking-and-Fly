import { useSyncExternalStore } from 'react';

/**
 * The current time, refreshed every minute and when the tab becomes visible again.
 *
 * The pages are rendered to HTML at build time, so the first render in the browser must agree with that HTML, not with
 * the clock of the visitor. While the page is being prerendered (and while React attaches to that HTML) the time is
 * the moment of the build, written to `<html data-built>`; the real time follows as soon as the page is alive.
 */
const REFRESH_MS = 60_000;

let built: Date | null = null;
let current: Date | null = null;
const listeners = new Set<() => void>();
let timer: number | undefined;

/** Called by the prerenderer with the time it writes to `<html data-built>`. */
export function setBuildTime(date: Date): void {
  built = date;
}

function buildTime(): Date {
  if (!built) {
    const stamp = typeof document === 'undefined' ? undefined : document.documentElement.dataset.built;
    built = stamp ? new Date(stamp) : new Date();
  }
  return built;
}

function tick(): void {
  current = new Date();
  listeners.forEach((listener) => listener());
}

function onVisible(): void {
  if (document.visibilityState === 'visible') tick();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  if (listeners.size === 1) {
    timer = window.setInterval(tick, REFRESH_MS);
    document.addEventListener('visibilitychange', onVisible);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
    }
  };
}

const getSnapshot = (): Date => (current ??= new Date());

export function useNow(): Date {
  return useSyncExternalStore(subscribe, getSnapshot, buildTime);
}
