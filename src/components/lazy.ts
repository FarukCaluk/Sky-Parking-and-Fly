import { lazy } from 'react';
import { runWhenIdle } from '@/utils/browser';

/** The footer is not needed for first paint: split it out and warm it up when the browser is idle. */
const loadFooter = () => import('@/components/layout/Footer');

export const Footer = lazy(loadFooter);

export function prefetchChrome(): void {
  runWhenIdle(() => void loadFooter(), 1500);
}
