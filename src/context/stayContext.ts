import { createContext, useContext } from 'react';
import type { Quote, StayDraft, StayErrors } from '@/types';

export interface StayContextValue {
  stay: StayDraft;
  /** Today's date (ISO, local) and the current time, refreshed every minute. */
  today: string;
  now: Date;
  quote: Quote;
  stayErrors: StayErrors;
  update: (patch: Partial<StayDraft>) => void;
  /** Keep the arrival and put the departure exactly `days` later, at the same time of day. */
  setDays: (days: number) => void;
}

export const StayContext = createContext<StayContextValue | null>(null);

export function useStay(): StayContextValue {
  const ctx = useContext(StayContext);
  if (!ctx) throw new Error('useStay must be used inside <StayProvider>');
  return ctx;
}
