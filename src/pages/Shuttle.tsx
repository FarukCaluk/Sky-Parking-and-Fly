import { Gift, PlaneLanding, Repeat, type LucideIcon } from 'lucide-react';
import { ShuttlePanel } from '@/components/facilities/ShuttlePanel';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Container, Section } from '@/components/ui/Layout';
import { Reveal } from '@/components/ui/Reveal';
import { useI18n } from '@/i18n/context';
import { PageShell } from './PageShell';

const FACTS = [
  { id: 'free', icon: Gift },
  { id: 'frequent', icon: Repeat },
  { id: 'onCall', icon: PlaneLanding },
] as const satisfies readonly { id: 'free' | 'frequent' | 'onCall'; icon: LucideIcon }[];

export default function Shuttle() {
  const { t } = useI18n();
  return (
    <PageShell page="shuttle">
      <PageHeader eyebrow={t.shuttle.eyebrow} title={t.shuttle.title} description={t.shuttle.description} />
      <Section className="pt-4 sm:pt-6 lg:pt-8">
        <Container>
          <Reveal>
            <ShuttlePanel />
          </Reveal>
          <ul className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
            {FACTS.map(({ id, icon: Icon }, i) => (
              <li key={id} className="min-w-0">
                <Reveal delay={i * 0.07} className="h-full">
                  <Card interactive className="h-full">
                    <span className="grid size-11 place-items-center rounded-2xl bg-accent-soft text-accent">
                      <Icon className="size-[1.375rem]" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <h2 className="mt-5 text-lg font-bold tracking-[-0.02em]">{t.shuttle.facts[id].title}</h2>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-muted">{t.shuttle.facts[id].text}</p>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </PageShell>
  );
}
