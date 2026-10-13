/** Run `task` when the browser is idle (falls back to a short timeout). */
export function runWhenIdle(task: () => void, timeout = 2000): void {
  if (typeof window === 'undefined') return;
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(task, { timeout });
  } else {
    globalThis.setTimeout(task, 400);
  }
}
