import { createElement, lazy, type ComponentType } from 'react';
import { runWhenIdle } from '@/utils/browser';

/**
 * `lazy`, except that a component whose code has been fetched with `preload()` renders at once. A plain `lazy`
 * suspends on its first render even when the file is already there, and while React attaches to prerendered HTML that
 * would swap the finished page for a loading state for a moment. Once preloaded (or prefetched) it also opens without
 * a loading state when the visitor navigates to it.
 */
export function lazyComponent<P extends object>(load: () => Promise<{ default: ComponentType<P> }>) {
  let ready: ComponentType<P> | undefined;
  const Lazy = lazy(load);
  const Component = (props: P) => createElement((ready ?? Lazy) as ComponentType<P>, props);
  const preload = () =>
    load().then((module) => {
      ready = module.default;
      return module;
    });
  return { Component, preload };
}

/** The footer is not needed for first paint: split it out and warm it up when the browser is idle. */
const footer = lazyComponent(() => import('@/components/layout/Footer'));

export const Footer = footer.Component;
export const preloadFooter = footer.preload;

export function prefetchChrome(): void {
  runWhenIdle(() => void preloadFooter(), 1500);
}
