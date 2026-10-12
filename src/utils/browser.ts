/** Trigger a client-side download of generated text content. */
export function downloadTextFile(filename: string, content: string, mime: string): void {
  const url = URL.createObjectURL(new Blob([content], { type: `${mime};charset=utf-8` }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Revoke on the next tick so the download has started in every browser
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Run `task` when the browser is idle (falls back to a short timeout). */
export function runWhenIdle(task: () => void, timeout = 2000): void {
  if (typeof window === 'undefined') return;
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(task, { timeout });
  } else {
    globalThis.setTimeout(task, 400);
  }
}

/** Smoothly scroll to an in-page section and keep the URL hash in sync. */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  history.replaceState(null, '', `#${id}`);
}
