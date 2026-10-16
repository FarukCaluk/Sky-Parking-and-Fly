declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Tell Google Tag Manager that something happened (it is loaded only when the build has a `GTM_ID`, see
 * `scripts/prerender.mjs`; without it this only fills a list that nobody reads).
 */
export function track(event: string, data: Record<string, unknown> = {}): void {
  (window.dataLayer ??= []).push({ event, ...data });
}
