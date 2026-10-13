import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Container } from '@/components/ui/Layout';
import { Photo } from '@/components/ui/Photo';
import { useI18n } from '@/i18n/context';
import { cn } from '@/utils/cn';
import { StayBar } from './StayBar';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Headline words rise in one by one; the number is picked out in the accent colour. */
function HeroTitle({ text }: { text: string }) {
  const reduce = useReducedMotion();
  return (
    <h1 className="display text-hero max-w-[12ch] text-white">
      {text.split(' ').map((word, index) => (
        <m.span
          key={`${word}-${index}`}
          initial={reduce ? false : { y: 56, opacity: 0, filter: 'blur(10px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.12 + index * 0.075, ease: EASE }}
          className={cn('mr-[0.22em] inline-block', /^\d/.test(word) && 'text-accent')}
        >
          {word}
        </m.span>
      ))}
    </h1>
  );
}

export function Hero() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '11%']);

  return (
    <section ref={ref} className="relative pb-12 lg:pb-20">
      <div className="relative isolate min-h-[68dvh] overflow-hidden bg-night md:min-h-[min(calc(100dvh_-_7rem),52rem)]">
        <m.div
          style={{ y: photoY }}
          initial={reduce ? false : { scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: EASE }}
          className="absolute inset-x-0 -top-[12%] bottom-0 -z-20 will-change-transform"
        >
          <Photo
            id="jet"
            alt={t.photos.jet}
            priority
            sizes="100vw"
            position="60% 58%"
            className="size-full object-cover"
          />
        </m.div>
        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-0 -z-10',
            'bg-[linear-gradient(180deg,rgb(7_13_26/0.62)_0%,rgb(7_13_26/0)_24%),linear-gradient(0deg,rgb(7_13_26/0.94)_0%,rgb(7_13_26/0.4)_42%,rgb(7_13_26/0.12)_100%)]',
            'md:bg-[linear-gradient(180deg,rgb(7_13_26/0.55)_0%,rgb(7_13_26/0)_22%),linear-gradient(90deg,rgb(7_13_26/0.84)_0%,rgb(7_13_26/0.5)_42%,rgb(7_13_26/0.04)_76%),linear-gradient(0deg,rgb(7_13_26/0.55)_0%,rgb(7_13_26/0)_34%)]',
          )}
        />

        <Container className="flex min-h-[inherit] flex-col justify-end pb-24 pt-28 md:pt-24">
          <HeroTitle text={t.hero.title} />
          <m.p
            initial={reduce ? false : { y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
            className="mt-6 max-w-[34ch] text-lg text-white/85 sm:text-xl"
          >
            {t.hero.lead}
          </m.p>
        </Container>
      </div>

      <Container className="relative z-10 -mt-16 md:-mt-14">
        <m.div
          initial={reduce ? false : { y: 36, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.95, ease: EASE }}
        >
          <StayBar />
        </m.div>
      </Container>
    </section>
  );
}
