import { BarrierCard } from '@/components/facilities/BarrierCard';
import { CameraPanel } from '@/components/facilities/CameraPanel';
import { OccupancyCard } from '@/components/facilities/OccupancyCard';
import { Card } from '@/components/ui/Card';
import { Container, Section } from '@/components/ui/Layout';
import { Reveal } from '@/components/ui/Reveal';
import { FACILITY_FEATURES } from '@/data/content';
import { useI18n } from '@/i18n/context';

/** Live camera, occupancy and gate status, followed by the security features. */
export default function Facilities() {
  const { t } = useI18n();

  return (
    <Section className="pt-4 sm:pt-6 lg:pt-8">
      <Container>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-6 lg:gap-5">
          <Reveal className="lg:col-span-4">
            <CameraPanel />
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1 lg:gap-5">
            <Reveal delay={0.08}>
              <OccupancyCard className="h-full" />
            </Reveal>
            <Reveal delay={0.14}>
              <BarrierCard className="h-full" />
            </Reveal>
          </div>
        </div>

        <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {FACILITY_FEATURES.map(({ id, icon: Icon }, i) => (
            <li key={id} className="min-w-0">
              <Reveal delay={(i % 3) * 0.07} className="h-full">
                <Card interactive className="h-full">
                  <span className="grid size-11 place-items-center rounded-2xl bg-accent-soft text-accent">
                    <Icon className="size-[1.375rem]" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 text-lg font-bold tracking-[-0.02em]">{t.facilities.features[id].title}</h2>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-muted">
                    {t.facilities.features[id].text}
                  </p>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
