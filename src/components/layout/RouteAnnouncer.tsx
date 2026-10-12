import { useEffect, useState } from 'react';
import { lastNavigationType, useRoute } from '@/router/navigation';

/** Screen-reader announcement of the new page title after in-app navigation (a SPA has no page load to announce). */
export function RouteAnnouncer() {
  const { pathname } = useRoute();
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (lastNavigationType() === 'initial') return;
    // Wait for the page to set its <title>
    const timer = window.setTimeout(() => setTitle(document.title), 150);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <div role="status" aria-live="polite" className="sr-only">
      {title}
    </div>
  );
}
