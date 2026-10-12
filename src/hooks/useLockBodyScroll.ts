import { useLayoutEffect } from 'react';

let activeLocks = 0;

/**
 * Prevent the page behind a dialog from scrolling.
 * `html { scrollbar-gutter: stable }` keeps the layout from jumping when the scrollbar disappears.
 */
export function useLockBodyScroll(active: boolean): void {
  useLayoutEffect(() => {
    if (!active) return;
    activeLocks += 1;
    document.body.style.overflow = 'hidden';
    return () => {
      activeLocks -= 1;
      if (activeLocks === 0) document.body.style.overflow = '';
    };
  }, [active]);
}
