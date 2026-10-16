import { useCallback, useSyncExternalStore } from 'react';

const subscribe = (notify: () => void) => {
  window.addEventListener('scroll', notify, { passive: true });
  return () => window.removeEventListener('scroll', notify);
};

/**
 * `true` once the page has scrolled past `threshold` px. On the server, and for the render that attaches React to the
 * prerendered HTML, it is `false`, which is what that HTML shows; a page reloaded half way down catches up right after.
 */
export function useScrolled(threshold = 12): boolean {
  const getSnapshot = useCallback(() => window.scrollY > threshold, [threshold]);
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
