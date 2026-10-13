import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { PageHeader } from '@/components/layout/PageHeader';
import { MAPS_LINKS, SITE } from '@/data/site';
import { useI18n } from '@/i18n/context';
import { PageShell } from './PageShell';

const FEATURES = ['fenced', 'lit', 'cctv', 'staff', 'keys', 'check'] as const;

export default function Facilities() {
  const { t } = useI18n();

  return (
    <PageShell page="facilities">
      <PageHeader
        title={t.facilities.title}
        lead={t.facilities.lead}
        photo={{ id: 'entrance', alt: t.photos.entrance, position: '38% 55%' }}
      />

      <section className="py-20 sm:py-28 lg:py-32">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <figure>
                <div className="aspect-[4/3] overflow-hidden rounded-[10px] bg-surface-2 lg:aspect-[4/5]">
                  <Photo
                    id="pole"
                    alt={t.photos.pole}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    position="100% 45%"
                    className="size-full object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-ink-faint">{t.lot.poleCaption}</figcaption>
              </figure>
            </div>
          </Reveal>

          <ul className="lg:col-span-7">
            {FEATURES.map((id) => (
              <li key={id} className="border-t border-line py-7 first:border-t-0 first:pt-0">
                <Reveal>
                  <h2 className="display text-[clamp(2rem,1.5rem+1.8vw,3rem)] leading-none">
                    {t.facilities.features[id].title}
                  </h2>
                  <p className="mt-3 max-w-[52ch] text-lg text-ink-muted">{t.facilities.features[id].text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="find-title" className="pb-24 sm:pb-32">
        <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7 lg:order-2">
            <div className="aspect-[4/3] overflow-hidden rounded-[10px] bg-surface-2 sm:aspect-[16/10]">
              <Photo
                id="sign"
                alt={t.photos.sign}
                sizes="(min-width: 1024px) 58vw, 100vw"
                position="40% 50%"
                className="size-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5 lg:order-1">
            <h2 id="find-title" className="display text-heading max-w-[10ch]">
              {t.facilities.find.title}
            </h2>
            <p className="mt-5 max-w-[40ch] text-lg text-ink-muted">{t.facilities.find.text}</p>
            <address className="mt-6 text-lg not-italic text-ink">
              {SITE.address.street}
              <br />
              {SITE.address.city}
            </address>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={MAPS_LINKS.google} target="_blank" rel="noopener noreferrer" arrow>
                {t.facilities.find.cta}
              </Button>
              <Button variant="secondary" to="contact">
                {t.nav.pages.contact}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </PageShell>
  );
}
