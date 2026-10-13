import { useMotionValue } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout';
import { Reveal } from '@/components/ui/Reveal';
import { PageHeader } from '@/components/layout/PageHeader';
import { RouteMap } from '@/components/sections/RouteMap';
import { useI18n } from '@/i18n/context';
import { PageShell } from './PageShell';

export default function Shuttle() {
  const { t } = useI18n();
  const finished = useMotionValue(1);

  return (
    <PageShell page="shuttle">
      <PageHeader
        title={t.shuttle.title}
        lead={t.shuttle.lead}
        photo={{ id: 'jet', alt: t.photos.jet, position: '60% 52%' }}
      />

      <section aria-labelledby="how-title" className="py-20 sm:py-28 lg:py-32">
        <Container className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:col-span-5">
            <RouteMap dot={finished} drawn={finished} activeStep={2} className="aspect-[600/520] w-full" />
          </Reveal>

          <div className="lg:col-span-7">
            <h2 id="how-title" className="display text-heading">
              {t.shuttle.howTitle}
            </h2>
            <ol className="mt-10">
              {t.shuttle.steps.map((step, index) => (
                <li key={step.title} className="border-t border-line py-6">
                  <Reveal className="grid grid-cols-[3.5rem_1fr] items-baseline gap-x-4 sm:grid-cols-[5rem_1fr]">
                    <span
                      aria-hidden="true"
                      className="display tabular text-[3rem] leading-none text-accent-text sm:text-[4rem]"
                    >
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="display text-sub">{step.title}</h3>
                      <p className="mt-2 max-w-[48ch] text-ink-muted">{step.text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
            <p className="mt-6 max-w-[52ch] border-t border-line pt-6 text-lg">{t.shuttle.closing}</p>
          </div>
        </Container>
      </section>

      <section className="pb-24 sm:pb-32">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="rounded-[10px] bg-surface-2 p-7 sm:p-9">
              <h2 className="display text-[2.25rem] leading-none">{t.shuttle.delay.title}</h2>
              <p className="mt-4 text-lg text-ink-muted">{t.shuttle.delay.text}</p>
              <Button to="contact" variant="text" arrow className="mt-6">
                {t.nav.pages.contact}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-7">
            <h2 className="display text-heading">{t.shuttle.checklist.title}</h2>
            <ul className="mt-8 grid gap-4">
              {t.shuttle.checklist.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-lg">
                  <Check className="mt-1.5 size-5 shrink-0 text-accent-text" strokeWidth={2.5} aria-hidden="true" />
                  <span className="max-w-[52ch]">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>
    </PageShell>
  );
}
