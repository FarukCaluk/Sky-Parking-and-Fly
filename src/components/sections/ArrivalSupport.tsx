import { Check, Headset } from 'lucide-react';
import { Container } from '@/components/ui/Layout';
import { Reveal } from '@/components/ui/Reveal';
import { useI18n } from '@/i18n/context';

/** "Support on arrival and return": the team is there for the arrival, a changed flight and the return transfer. */
export function ArrivalSupport() {
  const { t } = useI18n();

  return (
    <section aria-labelledby="support-title" className="pb-16 sm:pb-24">
      <Container>
        <Reveal className="grid items-center gap-8 rounded-[10px] border border-line bg-surface-2 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <span aria-hidden="true" className="grid size-12 place-items-center rounded-full bg-accent text-accent-ink">
              <Headset className="size-6" strokeWidth={2} />
            </span>
            <h2 id="support-title" className="display text-heading mt-5 max-w-[14ch]">
              {t.price.supportTitle}
            </h2>
            <p className="mt-4 max-w-[52ch] text-lg text-ink-muted">{t.price.supportText}</p>
          </div>
          <p className="flex items-start gap-3 rounded-[10px] border border-line bg-surface p-5 text-lg lg:col-span-5">
            <Check className="mt-1 size-5 shrink-0 text-accent-text" strokeWidth={2.5} aria-hidden="true" />
            {t.price.supportIncluded}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
