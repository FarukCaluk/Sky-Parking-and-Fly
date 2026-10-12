import { createContext, useContext } from 'react';
import type { ExtraId, Quote, StayDraft, StayErrors } from '@/types';

export interface BookingContextValue {
  stay: StayDraft;
  /** Today's date (ISO, local) and the current time — refreshed every minute. */
  today: string;
  now: Date;
  quote: Quote;
  stayErrors: StayErrors;
  /** `true` when the dates are valid and the stay can be reserved online. */
  isBookable: boolean;
  update: (patch: Partial<StayDraft>) => void;
  setDateRange: (dropOffDate: string, pickUpDate: string) => void;
  /** Keep the drop-off and set the pick-up to exactly `days` later at the same time of day. */
  setDays: (days: number) => void;
  toggleExtra: (id: ExtraId) => void;
  isBookingOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
}

export const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>');
  return ctx;
}
