import { useEffect, useLayoutEffect, type ReactNode } from 'react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useI18n } from '@/i18n/context';
import { lastNavigationType, savedScroll, shouldKeepScroll } from '@/router/navigation';
import { track } from '@/utils/analytics';
import type { RouteId } from '@/router/routes';

/**
 * Wraps every page: sets the document head for the page and language, restores or resets the scroll
 * position, and moves keyboard / screen-reader focus to the main region after in-app navigation.
 */
export function PageShell({ page, children }: { page: RouteId | 'notFound'; children: ReactNode }) {
  const { lang } = useI18n();
  usePageMeta(page, lang);

  useLayoutEffect(() => {
    const type = lastNavigationType();
    if (type === 'initial') return;
    if (type !== 'pop' && shouldKeepScroll()) return;
    window.scrollTo({ top: type === 'pop' ? (savedScroll() ?? 0) : 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    if (lastNavigationType() === 'initial') return;
    document.getElementById('sadrzaj')?.focus({ preventScroll: true });
    track('virtual_page_view', { page_path: window.location.pathname });
  }, []);

  return <>{children}</>;
}
