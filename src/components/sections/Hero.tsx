import { ArrowRight, Star } from 'lucide-react';
import { m } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { GOOGLE_RATING, VALUE_PROPS } from '@/data/content';
import { SITE } from '@/data/site';
import { useBooking } from '@/context/bookingContext';
import { BookingWidget } from './BookingWidget';
import { HeroBackdrop } from './HeroBackdrop';

const EASE = [0.16, 1, 0.3, 1] as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

export function Hero() {
  const { openBooking } = useBooking();

  return (
    <section id="pocetna" className="relative isolate overflow-x-clip text-white xl:flex xl:min-h-svh xl:items-center">
      <HeroBackdrop />

      <Container className="grid gap-10 pb-24 pt-28 sm:pt-36 xl:grid-cols-[minmax(0,1fr)_30rem] xl:items-center xl:gap-16 xl:pb-28 xl:pt-32">
        <div className="min-w-0">
          <m.div {...rise(0.05)}>
            <Badge tone="glass" className="py-1.5 pl-2.5 pr-3.5 text-[0.8125rem]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-emerald-400" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Aerodrom Sarajevo · otvoreno 0–24h
            </Badge>
          </m.div>

          <m.h1
            {...rise(0.15)}
            className="display-title mt-6 text-[clamp(2.5rem,1.35rem+5.4vw,4.75rem)] text-balance xl:text-[3.75rem] 2xl:text-[4rem]"
          >
            Parkirajte bez brige.
            <span className="block bg-gradient-to-r from-brand-300 via-sky-200 to-cyan-300 bg-clip-text text-transparent">
              Letite bez stresa.
            </span>
          </m.h1>

          <m.p {...rise(0.25)} className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/70 sm:text-xl">
            Čuvan, video nadziran parking {SITE.shuttleMinutes} minuta od terminala. Besplatan shuttle, osigurano vozilo
            i cijena koju vidite unaprijed.
          </m.p>

          <m.div {...rise(0.35)} className="mt-8 flex flex-col gap-3 min-[26rem]:flex-row">
            <Button
              size="lg"
              onClick={openBooking}
              rightIcon={<ArrowRight className="size-5" aria-hidden="true" />}
              className="max-sm:w-full"
            >
              Rezerviši parking
            </Button>
            <Button size="lg" variant="glass" href="#cijene" className="max-sm:w-full">
              Pogledaj cijene
            </Button>
          </m.div>

          <m.div {...rise(0.42)} className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/60">
            <span className="flex items-center gap-0.5 text-amber-300" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="size-4" fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            <span>
              <strong className="font-semibold text-white">{GOOGLE_RATING.score}</strong> na Googleu ·{' '}
              {GOOGLE_RATING.count} recenzija
            </span>
          </m.div>

          <m.ul {...rise(0.5)} className="mt-10 grid grid-cols-2 gap-3">
            {VALUE_PROPS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="min-w-0">
                <GlassContainer tone="dark" className="h-full rounded-2xl p-4">
                  <span className="mb-3 grid size-9 place-items-center rounded-xl bg-brand-500/20 text-brand-300">
                    <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <p className="text-[0.9375rem] font-semibold leading-snug tracking-[-0.01em]">{title}</p>
                  <p className="mt-1 text-[0.8125rem] leading-snug text-white/55">{text}</p>
                </GlassContainer>
              </li>
            ))}
          </m.ul>
        </div>

        <m.div {...rise(0.3)} className="mx-auto w-full max-w-xl min-w-0 xl:mx-0 xl:ml-auto">
          <BookingWidget />
        </m.div>
      </Container>
    </section>
  );
}
