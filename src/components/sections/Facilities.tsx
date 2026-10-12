import { BarrierCard } from '@/components/facilities/BarrierCard';
import { CameraPanel } from '@/components/facilities/CameraPanel';
import { OccupancyCard } from '@/components/facilities/OccupancyCard';
import { ShuttlePanel } from '@/components/facilities/ShuttlePanel';
import { Card } from '@/components/ui/Card';
import { Container, Section, SectionHeading } from '@/components/ui/Layout';
import { Reveal } from '@/components/ui/Reveal';
import { FACILITY_FEATURES } from '@/data/content';

/** Security, live status and shuttle: everything a traveller wants to know before handing over the keys. */
export default function Facilities() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Objekat i sigurnost"
          title="Vaše vozilo je pod nadzorom 24 sata dnevno."
          description="Pogledajte kako izgleda parking upravo sada — kamere, zauzetost, automatska rampa i raspored shuttlea na jednom mjestu."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-6 lg:gap-5">
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
          <Reveal className="lg:col-span-6">
            <ShuttlePanel />
          </Reveal>
        </div>

        <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {FACILITY_FEATURES.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="min-w-0">
              <Reveal delay={(i % 3) * 0.07} className="h-full">
                <Card interactive className="h-full">
                  <span className="grid size-11 place-items-center rounded-2xl bg-accent-soft text-accent">
                    <Icon className="size-[1.375rem]" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold tracking-[-0.02em]">{title}</h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-muted">{text}</p>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
