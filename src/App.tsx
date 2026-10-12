import { LazyMotion, MotionConfig } from 'framer-motion';
import { Suspense, useEffect, useState } from 'react';
import { BookingModal, Footer, prefetchChrome } from '@/components/lazy';
import { Navbar } from '@/components/layout/Navbar';
import { RouteAnnouncer } from '@/components/layout/RouteAnnouncer';
import { Container } from '@/components/ui/Layout';
import { Skeleton } from '@/components/ui/Skeleton';
import { BookingProvider } from '@/context/BookingProvider';
import { useBooking } from '@/context/bookingContext';
import { I18nProvider } from '@/i18n/I18nProvider';
import { useI18n } from '@/i18n/context';
import { PAGES, prefetchMainPages } from '@/pages/loaders';
import { useRoute } from '@/router/navigation';

const loadMotionFeatures = () => import('@/lib/motionFeatures').then((mod) => mod.default);

/** Mounts the wizard only once the visitor asks for it, then keeps it (and the draft) alive. */
function BookingDialog() {
  const { isBookingOpen } = useBooking();
  const [requested, setRequested] = useState(false);
  // Derived during render (React's recommended alternative to an effect)
  if (isBookingOpen && !requested) setRequested(true);
  return requested ? (
    <Suspense fallback={null}>
      <BookingModal />
    </Suspense>
  ) : null;
}

function PageFallback() {
  return (
    <Container className="min-h-[70svh] pt-32 sm:pt-40" aria-hidden="true">
      <Skeleton className="mx-auto h-12 max-w-xl" />
      <Skeleton className="mx-auto mt-6 h-5 max-w-2xl" />
      <Skeleton className="mt-16 h-96 w-full" />
    </Container>
  );
}

function SkipLink() {
  const { t } = useI18n();
  return (
    <a
      href="#sadrzaj"
      className="fixed left-4 top-4 z-[200] -translate-y-24 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform duration-200 focus:translate-y-0"
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
    <BookingProvider>
      <SkipLink />
      <Navbar />
      <main id="sadrzaj" tabIndex={-1} className="outline-none">
        <Suspense fallback={<PageFallback />}>
          <Page key={pathname} />
        </Suspense>
      </main>
      <Suspense fallback={<div className="min-h-[30rem]" aria-hidden="true" />}>
        <Footer />
      </Suspense>
      <BookingDialog />
      <RouteAnnouncer />
    </BookingProvider>
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
