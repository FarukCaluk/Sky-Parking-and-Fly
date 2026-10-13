import { m, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Container } from '@/components/ui/Layout';
import { Reveal } from '@/components/ui/Reveal';
import { useMediaQuery, usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { useI18n } from '@/i18n/context';
import { cn } from '@/utils/cn';
import { RouteMap } from './RouteMap';

const STEP_IDS = ['book', 'park', 'ride', 'back'] as const;

/** Scroll position (0..1 through the pinned section) at which each step takes over. */
const THRESHOLDS = [0.16, 0.4, 0.7];
const stepAt = (progress: number): number => THRESHOLDS.filter((limit) => progress >= limit).length;

/**
 * The four steps of a stay. On large screens the section pins and scrolling drives the shuttle along the
 * route; on phones and for reduced motion it is a plain list next to the finished diagram.
 */
export function Journey() {
  const { t } = useI18n();
  // Pinning needs room for the whole story to fit in one screen
  const wide = useMediaQuery('(min-width: 1024px) and (min-height: 680px)');
  const reduced = usePrefersReducedMotion();
  const pinned = wide && !reduced;

  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (pinned) setActive(stepAt(value));
  });

  const dot = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0, 0, 1, 0]);
  const drawn = useTransform(scrollYProgress, [0, 0.4, 0.7], [0, 0, 1]);
  const finished = useMotionValue(1);

  return (
    <section
      ref={section}
      aria-labelledby="journey-title"
      className={cn('relative', pinned ? 'h-[300dvh]' : 'py-20 sm:py-28')}
    >
      <div className={cn(pinned && 'sticky top-0 flex h-dvh items-center pt-16')}>
        <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16 xl:gap-24">
          <div>
            <Reveal>
              <h2 id="journey-title" className="display text-heading max-w-[14ch]">
                {t.journey.title}
              </h2>
              <p className="mt-5 max-w-[44ch] text-lg text-ink-muted">{t.journey.lead}</p>
            </Reveal>

            <ol className="relative mt-10">
              <span aria-hidden="true" className="absolute bottom-6 left-[5px] top-6 w-px bg-line" />
              {STEP_IDS.map((id, index) => {
                const current = !pinned || index === active;
                const reached = !pinned || index <= active;
                return (
                  <li
                    key={id}
                    aria-current={pinned && current ? 'step' : undefined}
                    className={cn('relative py-4 pl-9 transition-opacity duration-500', !current && 'opacity-45')}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute left-0 top-[1.55rem] size-[0.7rem] rounded-full border-2 transition-colors duration-500',
                        reached ? 'border-accent bg-accent' : 'border-line-strong bg-canvas',
                      )}
                    />
                    <h3 className="display text-sub">{t.journey.steps[id].title}</h3>
                    <div
                      className={cn(
                        'grid transition-[grid-template-rows] duration-500 ease-signal',
                        current ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                      )}
                    >
                      <p className="overflow-hidden text-ink-muted [text-wrap:pretty]">
                        <span className="mt-2 block max-w-[46ch]">{t.journey.steps[id].text}</span>
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <m.div
            initial={pinned ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <RouteMap
              dot={pinned ? dot : finished}
              drawn={pinned ? drawn : finished}
              activeStep={pinned ? active : 2}
              className="aspect-[600/520] w-full"
            />
          </m.div>
        </Container>
      </div>
    </section>
  );
}
