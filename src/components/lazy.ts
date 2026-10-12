import { lazy } from 'react';
import { runWhenIdle } from '@/utils/browser';

/** Shared chrome that is not needed for first paint is split out and warmed up when the browser is idle. */
const loadFooter = () => import('@/components/layout/Footer');
const loadBooking = () => import('@/components/booking/BookingModal');

export const Footer = lazy(loadFooter);
export const BookingModal = lazy(loadBooking);

export function prefetchChrome(): void {
  runWhenIdle(() => void loadFooter(), 1500);
  runWhenIdle(() => void loadBooking(), 2500);
}
