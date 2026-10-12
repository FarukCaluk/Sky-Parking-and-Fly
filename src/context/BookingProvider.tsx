import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { MAX_STAY_DAYS } from '@/data/pricing';
import { useNow } from '@/hooks/useNow';
import type { ExtraId, StayDraft } from '@/types';
import { addDays, toISODate } from '@/utils/date';
import { calculateQuote, createDefaultStay, stayDays, validateStay } from '@/utils/pricing';
import { BookingContext, type BookingContextValue } from './bookingContext';

export function BookingProvider({ children }: { children: ReactNode }) {
  const [stay, setStay] = useState<StayDraft>(() => createDefaultStay());
  const [isBookingOpen, setBookingOpen] = useState(false);
  // Re-validate every minute so a stale "tomorrow" never slips into the past unnoticed
  const now = useNow(60_000);

  const stayErrors = useMemo(() => validateStay(stay, now), [stay, now]);
  const days = stayDays(stay);

  const quote = useMemo(
    () => calculateQuote({ days: days ?? 1, cover: stay.cover, vehicle: stay.vehicle, extras: stay.extras }),
    [days, stay.cover, stay.vehicle, stay.extras],
  );

  const update = useCallback((patch: Partial<StayDraft>) => setStay((prev) => ({ ...prev, ...patch })), []);

  const setDateRange = useCallback(
    (dropOffDate: string, pickUpDate: string) => setStay((prev) => ({ ...prev, dropOffDate, pickUpDate })),
    [],
  );

  const setDays = useCallback((value: number) => {
    const clamped = Math.min(MAX_STAY_DAYS, Math.max(1, Math.round(value)));
    setStay((prev) => ({ ...prev, pickUpDate: addDays(prev.dropOffDate, clamped), pickUpTime: prev.dropOffTime }));
  }, []);

  const toggleExtra = useCallback((id: ExtraId) => {
    setStay((prev) => ({
      ...prev,
      extras: prev.extras.includes(id) ? prev.extras.filter((e) => e !== id) : [...prev.extras, id],
    }));
  }, []);

  const openBooking = useCallback(() => setBookingOpen(true), []);
  const closeBooking = useCallback(() => setBookingOpen(false), []);

  const value = useMemo<BookingContextValue>(
    () => ({
      stay,
      today: toISODate(now),
      now,
      quote,
      stayErrors,
      isBookable: Object.keys(stayErrors).length === 0,
      update,
      setDateRange,
      setDays,
      toggleExtra,
      isBookingOpen,
      openBooking,
      closeBooking,
    }),
    [
      stay,
      now,
      quote,
      stayErrors,
      update,
      setDateRange,
      setDays,
      toggleExtra,
      isBookingOpen,
      openBooking,
      closeBooking,
    ],
  );

  return <BookingContext value={value}>{children}</BookingContext>;
}
