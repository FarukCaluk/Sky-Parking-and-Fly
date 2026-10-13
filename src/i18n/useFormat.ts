import { useMemo } from 'react';
import { formatDateLong, formatDateShort } from '@/utils/date';
import { formatKM } from '@/utils/format';
import { useI18n } from './context';

/** Formatters bound to the active language, so components never pass `lang` around. */
export function useFormat() {
  const { lang, t } = useI18n();
  return useMemo(
    () => ({
      km: (amount: number, options?: { withCurrency?: boolean }) => formatKM(amount, lang, options),
      dateShort: (iso: string) => formatDateShort(iso, t.date),
      dateLong: (iso: string) => formatDateLong(iso, t.date),
      /** `Monday, October 12, 2026 at 10:00` */
      when: (iso: string, time: string) => t.date.at(formatDateLong(iso, t.date), time),
    }),
    [lang, t],
  );
}
