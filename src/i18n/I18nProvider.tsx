import { useEffect, useMemo, type ReactNode } from 'react';
import type { Lang } from '@/router/routes';
import { I18nContext } from './context';
import { MESSAGES } from './messages';

/** Provides the dictionary for `lang` and keeps `<html lang>` in sync for screen readers and translation tools. */
export function I18nProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const value = useMemo(() => ({ lang, t: MESSAGES[lang] }), [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return <I18nContext value={value}>{children}</I18nContext>;
}
