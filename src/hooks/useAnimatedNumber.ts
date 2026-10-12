import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './useMediaQuery';

/** Tween towards `target` with an ease-out curve. Instant for reduced-motion users. */
export function useAnimatedNumber(target: number, duration = 520): number {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(target);
  const current = useRef(target);

  useEffect(() => {
    if (reduced) {
      current.current = target;
      return;
    }
    const from = current.current;
    const delta = target - from;
    if (delta === 0) return;

    const startedAt = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startedAt) / duration);
      const next = from + delta * (1 - Math.pow(1 - t, 4));
      current.current = next;
      setValue(next);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, reduced]);

  return reduced ? target : value;
}
