import { LazyMotion, MotionConfig } from 'framer-motion';
import { Suspense, useEffect, useState } from 'react';
import {
  BookingModal,
  Contact,
  Facilities,
  Footer,
  prefetchSections,
  PricingCalculator,
  Testimonials,
} from '@/components/lazy';
import { LazySection } from '@/components/layout/LazySection';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { BookingProvider } from '@/context/BookingProvider';
import { useBooking } from '@/context/bookingContext';

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

export default function App() {
  useEffect(() => {
    prefetchSections();
  }, []);

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <BookingProvider>
          <a
            href="#sadrzaj"
            className="fixed left-4 top-4 z-[200] -translate-y-24 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform duration-200 focus:translate-y-0"
          >
            Preskoči na sadržaj
          </a>
          <Navbar />
          <main id="sadrzaj">
            <Hero />
            <HowItWorks />
            <LazySection id="cijene" minHeight="70rem">
              <PricingCalculator />
            </LazySection>
            <LazySection id="objekat" minHeight="80rem">
              <Facilities />
            </LazySection>
            <LazySection id="recenzije" minHeight="55rem">
              <Testimonials />
            </LazySection>
            <LazySection id="kontakt" minHeight="45rem">
              <Contact />
            </LazySection>
          </main>
          <LazySection minHeight="30rem">
            <Footer />
          </LazySection>
          <BookingDialog />
        </BookingProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
