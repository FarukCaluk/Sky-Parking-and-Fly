import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { MAX_STAY_DAYS } from '@/data/pricing';
import { useNow } from '@/hooks/useNow';
import type { StayDraft } from '@/types';
import { addDays, toISODate } from '@/utils/date';
import { calculateQuote, createDefaultStay, stayDays, validateStay } from '@/utils/pricing';
import { StayContext, type StayContextValue } from './stayContext';

/** One stay draft shared by the hero bar, the price slider and the reservation form, so they never disagree. */
export function StayProvider({ children }: { children: ReactNode }) {
  const [stay, setStay] = useState<StayDraft>(() => createDefaultStay());
  // Re-validate every minute so a stale "tomorrow" never slips into the past unnoticed
  const now = useNow(60_000);

  const stayErrors = useMemo(() => validateStay(stay, now), [stay, now]);
  const days = stayDays(stay);
  const quote = useMemo(() => calculateQuote(days ?? 1), [days]);

  const update = useCallback((patch: Partial<StayDraft>) => setStay((prev) => ({ ...prev, ...patch })), []);

  const setDays = useCallback((value: number) => {
    const clamped = Math.min(MAX_STAY_DAYS, Math.max(1, Math.round(value)));
    setStay((prev) => ({ ...prev, pickUpDate: addDays(prev.dropOffDate, clamped), pickUpTime: prev.dropOffTime }));
  }, []);

  const value = useMemo<StayContextValue>(
    () => ({ stay, today: toISODate(now), now, quote, stayErrors, update, setDays }),
    [stay, now, quote, stayErrors, update, setDays],
  );

  return <StayContext value={value}>{children}</StayContext>;
}
