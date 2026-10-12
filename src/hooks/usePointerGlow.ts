import { useCallback, type PointerEvent } from 'react';

/**
 * Feeds the pointer position into `--mx` / `--my` on the hovered element.
 * Used by the `spotlight` and `glow-border` utilities — no React state, no re-renders.
 */
export function usePointerGlow<T extends HTMLElement>(): (event: PointerEvent<T>) => void {
  return useCallback((event: PointerEvent<T>) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }, []);
}
