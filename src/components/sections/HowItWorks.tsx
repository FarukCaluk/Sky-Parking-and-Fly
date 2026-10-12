import { Card } from '@/components/ui/Card';
import { Container, Section, SectionHeading } from '@/components/ui/Layout';
import { Reveal } from '@/components/ui/Reveal';
import { PROCESS_STEPS } from '@/data/content';
import { useI18n } from '@/i18n/context';

export function HowItWorks() {
  const { t } = useI18n();

  return (
    <Section className="pb-4 pt-12 sm:pb-6 sm:pt-16 lg:pt-20">
      <Container>
        <SectionHeading eyebrow={t.how.eyebrow} title={t.how.title} description={t.how.description} />

        <ol className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map(({ id, icon: Icon }, index) => (
            <li key={id} className="min-w-0">
              <Reveal delay={index * 0.08} className="h-full">
                <Card interactive className="h-full">
                  <div className="flex items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.3),0_10px_24px_-10px_rgb(0_113_227/0.8)]">
                      <Icon className="size-6" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span
                      className="tabular text-5xl font-bold leading-none tracking-[-0.05em] text-ink/[0.08]"
                      aria-hidden="true"
                    >
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold tracking-[-0.025em]">{t.how.steps[id].title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{t.how.steps[id].text}</p>
                </Card>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
