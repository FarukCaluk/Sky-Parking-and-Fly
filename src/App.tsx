import { LazyMotion, MotionConfig } from 'framer-motion';
import { Suspense, useEffect } from 'react';
import { Footer, prefetchChrome } from '@/components/lazy';
import { Navbar } from '@/components/layout/Navbar';
import { RouteAnnouncer } from '@/components/layout/RouteAnnouncer';
import { ViberFallback } from '@/components/layout/ViberFallback';
import { Container } from '@/components/ui/Layout';
import { Skeleton } from '@/components/ui/Skeleton';
import { StayProvider } from '@/context/StayProvider';
import { I18nProvider } from '@/i18n/I18nProvider';
import { useI18n } from '@/i18n/context';
import { PAGES, prefetchMainPages } from '@/pages/loaders';
import { useRoute } from '@/router/navigation';

const loadMotionFeatures = () => import('@/lib/motionFeatures').then((mod) => mod.default);

function PageFallback() {
  return (
    <Container className="min-h-[70svh] pt-32 sm:pt-40" aria-hidden="true">
      <Skeleton className="h-24 max-w-3xl" />
      <Skeleton className="mt-6 h-5 max-w-xl" />
      <Skeleton className="mt-16 h-96 w-full" />
    </Container>
  );
}

function SkipLink() {
  const { t } = useI18n();
  return (
    <a
      href="#sadrzaj"
      className="fixed left-4 top-4 z-[70] -translate-y-24 rounded-[6px] bg-accent px-5 py-2.5 font-display text-lg font-bold uppercase tracking-[0.07em] text-accent-ink transition-transform duration-200 focus:translate-y-0"
    >
      {t.common.skipToContent}
    </a>
  );
}

function Shell() {
  const { pathname, route } = useRoute();
  const Page = PAGES[route ?? 'notFound'];

  useEffect(() => {
    prefetchMainPages();
    prefetchChrome();
  }, []);

  return (
    <StayProvider>
      <SkipLink />
      <Navbar />
      <main id="sadrzaj" tabIndex={-1} className="outline-none">
        <Suspense fallback={<PageFallback />}>
          <Page key={pathname} />
        </Suspense>
      </main>
      <Suspense fallback={<div className="min-h-[40rem]" aria-hidden="true" />}>
        <Footer />
      </Suspense>
      <RouteAnnouncer />
      <ViberFallback />
      {/* Film grain: one fixed layer, never part of the scrolling content */}
      <div
        aria-hidden="true"
        className="grain pointer-events-none fixed inset-0 z-[60] opacity-[0.045] dark:opacity-[0.07]"
      />
    </StayProvider>
  );
}

export default function App() {
  const { lang } = useRoute();

  return (
    <I18nProvider lang={lang}>
      <LazyMotion features={loadMotionFeatures} strict>
        <MotionConfig reducedMotion="user">
          <Shell />
        </MotionConfig>
      </LazyMotion>
    </I18nProvider>
  );
}
