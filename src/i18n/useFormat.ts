import { useMemo } from 'react';
import { EXTRA_DAY_RATE, EXTRA_DAYS_AFTER } from '@/data/pricing';
import type { Quote } from '@/types';
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
      /** `7 days × 8 KM per day`, or `31 days: 30 × 6 KM + 1 × 5 KM` once a stay runs past 30 days */
      quoteLine: (quote: Quote) =>
        quote.extraDays > 0
          ? t.stayBar.lineExtra(
              t.units.days(quote.days),
              `${EXTRA_DAYS_AFTER} × ${formatKM(quote.ratePerDay, lang)}`,
              `${quote.extraDays} × ${formatKM(EXTRA_DAY_RATE, lang)}`,
            )
          : t.stayBar.line(t.units.days(quote.days), formatKM(quote.ratePerDay, lang)),
      /** `Monday, October 12, 2026 at 10:00` */
      when: (iso: string, time: string) => t.date.at(formatDateLong(iso, t.date), time),
    }),
    [lang, t],
  );
}
