import { Check } from 'lucide-react';
import { Container } from '@/components/ui/Layout';
import { Reveal } from '@/components/ui/Reveal';
import { useI18n } from '@/i18n/context';

/** "How is the number of days calculated?": the four rules of the count, as a check list. */
export function DayCount() {
  const { t } = useI18n();

  return (
    <section aria-labelledby="count-title" className="py-16 sm:py-24">
      <Container>
        <Reveal className="grid gap-8 rounded-[10px] border border-line bg-surface p-6 shadow-panel sm:p-10 lg:grid-cols-12 lg:gap-12">
          <h2 id="count-title" className="display text-heading max-w-[12ch] lg:col-span-5">
            {t.price.howTitle}
          </h2>
          <ul role="list" className="grid content-center gap-5 text-[1.0625rem] sm:text-lg lg:col-span-7">
            {t.price.how.map((rule) => (
              <li key={rule} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-accent text-accent-ink"
                >
                  <Check className="size-4" strokeWidth={3} />
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
