import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { MAX_STAY_DAYS, MIN_STAY_DAYS } from '@/data/pricing';
import { useNow } from '@/hooks/useNow';
import type { StayDraft } from '@/types';
import { addDays, toISODate } from '@/utils/date';
import { calculateQuote, createDefaultStay, stayDays, validateStay } from '@/utils/pricing';
import { StayContext, type StayContextValue } from './stayContext';

/** One stay draft shared by the hero bar, the price slider and the reservation form, so they never disagree. */
export function StayProvider({ children }: { children: ReactNode }) {
  // Re-validate every minute so a stale "tomorrow" never slips into the past unnoticed
  const now = useNow();
  // Until the visitor changes something the stay is "tomorrow for a week", worked out from the current time; their
  // first change turns it into a draft of their own
  const [edited, setEdited] = useState<StayDraft | null>(null);
  const stay = useMemo(() => edited ?? createDefaultStay(now), [edited, now]);

  const stayErrors = useMemo(() => validateStay(stay, now), [stay, now]);
  const days = stayDays(stay);
  const quote = useMemo(() => calculateQuote(days ?? MIN_STAY_DAYS), [days]);

  const update = useCallback(
    (patch: Partial<StayDraft>) => setEdited((prev) => ({ ...(prev ?? createDefaultStay()), ...patch })),
    [],
  );

  const setDays = useCallback((value: number) => {
    const clamped = Math.min(MAX_STAY_DAYS, Math.max(MIN_STAY_DAYS, Math.round(value)));
    setEdited((prev) => {
      const base = prev ?? createDefaultStay();
      return { ...base, pickUpDate: addDays(base.dropOffDate, clamped), pickUpTime: base.dropOffTime };
    });
  }, []);

  const value = useMemo<StayContextValue>(
    () => ({ stay, today: toISODate(now), now, quote, stayErrors, update, setDays }),
    [stay, now, quote, stayErrors, update, setDays],
  );

  return <StayContext value={value}>{children}</StayContext>;
}
