import { useCallback, useRef, useState, type RefCallback } from 'react';

/** `[ref, seen]` — `seen` flips to `true` the first time the element enters the viewport. */
export function useInViewOnce<T extends Element>(threshold = 0.35): [RefCallback<T>, boolean] {
  const [seen, setSeen] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const ref = useCallback<RefCallback<T>>(
    (element) => {
      observer.current?.disconnect();
      observer.current = null;
      if (!element) return;
      if (typeof IntersectionObserver === 'undefined') {
        setSeen(true);
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            setSeen(true);
            io.disconnect();
          }
        },
        { threshold },
      );
      io.observe(element);
      observer.current = io;
    },
    [threshold],
  );

  return [ref, seen];
}
