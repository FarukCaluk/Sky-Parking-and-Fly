import { lazy } from 'react';
import { runWhenIdle } from '@/utils/browser';

/**
 * Below-the-fold sections are split into their own chunks. They are prefetched once the browser is idle,
 * so by the time the visitor scrolls (or clicks an anchor link) they are already in the cache.
 */
const loaders = {
  pricing: () => import('@/components/sections/PricingCalculator').then((m) => ({ default: m.PricingCalculator })),
  facilities: () => import('@/components/sections/Facilities'),
  testimonials: () => import('@/components/sections/Testimonials'),
  contact: () => import('@/components/sections/Contact'),
  footer: () => import('@/components/layout/Footer'),
  booking: () => import('@/components/booking/BookingModal'),
} as const;

export const PricingCalculator = lazy(loaders.pricing);
export const Facilities = lazy(loaders.facilities);
export const Testimonials = lazy(loaders.testimonials);
export const Contact = lazy(loaders.contact);
export const Footer = lazy(loaders.footer);
export const BookingModal = lazy(loaders.booking);

/** Stagger the idle prefetch so chunks never compete with first-paint work. */
export function prefetchSections(): void {
  Object.values(loaders).forEach((load, index) => {
    runWhenIdle(() => void load(), 2000 + index * 400);
  });
}
