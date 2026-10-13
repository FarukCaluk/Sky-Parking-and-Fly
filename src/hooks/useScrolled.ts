import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';

/** `true` once the page has scrolled past `threshold` px. Driven by Framer Motion's shared scroll observer. */
export function useScrolled(threshold = 12): boolean {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > threshold);
  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > threshold));
  return scrolled;
}
