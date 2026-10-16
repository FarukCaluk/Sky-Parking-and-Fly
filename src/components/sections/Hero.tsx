import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { MessageCircle, MessagesSquare } from 'lucide-react';
import { useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout';
import { Photo } from '@/components/ui/Photo';
import { viberLink, whatsappLink } from '@/data/site';
import { useI18n } from '@/i18n/context';
import { cn } from '@/utils/cn';
import { StayBar } from './StayBar';

const messengerButton = 'bg-white/10 backdrop-blur-[6px] max-sm:flex-1';

/**
 * One screen: headline, the two quickest ways to reach us, and the reservation bar docked at the bottom. The
 * headline scales with the height of the window (see `--text-hero`), so the bar stays in view on laptop screens.
 *
 * Nothing here fades or slides in: the first screen is in the prerendered HTML and must be readable the moment it is
 * painted, on a phone on a slow connection too. Only the photograph drifts a little as the page scrolls.
 */
export function Hero() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '11%']);

  return (
    <section ref={ref} className="relative isolate z-10 flex min-h-svh flex-col bg-night">
      {/* Clipped here rather than on the section, so the date pickers can reach outside the hero */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <m.div style={{ y: photoY }} className="absolute inset-x-0 -top-[12%] bottom-0 will-change-transform">
          <Photo
            id="jet"
            alt={t.photos.jet}
            priority
            sizes="100vw"
            position="60% 58%"
            className="size-full object-cover"
          />
        </m.div>
      </div>
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-0 -z-10',
          'bg-[linear-gradient(180deg,rgb(7_13_26/0.62)_0%,rgb(7_13_26/0)_24%),linear-gradient(0deg,rgb(7_13_26/0.94)_0%,rgb(7_13_26/0.55)_55%,rgb(7_13_26/0.12)_100%)]',
          'md:bg-[linear-gradient(180deg,rgb(7_13_26/0.55)_0%,rgb(7_13_26/0)_22%),linear-gradient(90deg,rgb(7_13_26/0.84)_0%,rgb(7_13_26/0.5)_42%,rgb(7_13_26/0.04)_76%),linear-gradient(0deg,rgb(7_13_26/0.7)_0%,rgb(7_13_26/0)_42%)]',
        )}
      />

      <Container className="flex flex-1 flex-col justify-end pb-5 pt-[5.5rem] sm:pb-6">
        <h1 className="display text-hero max-w-[12ch] text-white">
          {t.hero.title}
          <span className="mt-[0.2em] block text-[0.46em] leading-none text-accent">{t.hero.distance}</span>
        </h1>
        <p className="mt-4 max-w-[46ch] text-lg text-white/85 sm:mt-5 sm:text-xl lg:max-w-[56ch]">{t.hero.lead}</p>

        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 sm:mt-6">
          <p className="label hidden pr-1 text-[0.9375rem] text-white/75 sm:block">{t.hero.message}</p>
          <Button
            variant="onPhoto"
            href={whatsappLink(t.contact.whatsappGeneric)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t.hero.message} WhatsApp`}
            leftIcon={<MessageCircle className="size-5" aria-hidden="true" />}
            className={messengerButton}
          >
            WhatsApp
          </Button>
          <Button
            variant="onPhoto"
            href={viberLink()}
            aria-label={`${t.hero.message} Viber`}
            leftIcon={<MessagesSquare className="size-5" aria-hidden="true" />}
            className={messengerButton}
          >
            Viber
          </Button>
        </div>

        <div className="mt-4">
          <StayBar />
        </div>
      </Container>
    </section>
  );
}
