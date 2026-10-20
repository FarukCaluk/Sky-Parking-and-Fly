import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { useI18n } from '@/i18n/context';

const FACTS = ['fenced', 'cctv', 'staff', 'keys'] as const;

/** The lot, shown with the real photographs: the entrance as a wide strip, then the facts and the camera pole. */
export function Lot() {
  const { t } = useI18n();

  return (
    <section aria-labelledby="lot-title" className="relative py-20 sm:py-28 lg:py-36">
      <Container>
        <Reveal>
          <h2 id="lot-title" className="display text-heading max-w-[15ch]">
            {t.lot.title}
          </h2>
        </Reveal>

        <Reveal className="mt-12">
          <figure>
            <div className="aspect-[4/3] overflow-hidden rounded-[10px] bg-surface-2 sm:aspect-[16/9] lg:aspect-[21/9]">
              <Photo
                id="entrance"
                alt={t.photos.entrance}
                sizes="(min-width: 1344px) 1344px, 100vw"
                position="30% 58%"
                className="size-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-ink-faint">{t.lot.entranceCaption}</figcaption>
          </figure>
        </Reveal>

        <div className="mt-6 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="h-full rounded-[10px] bg-surface-2 p-7 sm:p-10">
              <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {FACTS.map((id) => (
                  <div key={id}>
                    <dt className="display text-[1.75rem] leading-none">{t.lot.facts[id].title}</dt>
                    <dd className="mt-2.5 max-w-[34ch] text-ink-muted">{t.lot.facts[id].text}</dd>
                  </div>
                ))}
              </dl>
              <Button to="facilities" variant="text" arrow className="mt-10">
                {t.lot.link}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <figure className="flex h-full flex-col">
              <div className="relative min-h-[16rem] flex-1 overflow-hidden rounded-[10px] bg-surface-2">
                <Photo
                  id="pole"
                  alt={t.photos.pole}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  position="64% 42%"
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm text-ink-faint">{t.lot.poleCaption}</figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
