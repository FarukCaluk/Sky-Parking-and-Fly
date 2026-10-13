import { ArrowUpRight, Mail, MessageCircle, MessagesSquare, Phone, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { PageHeader } from '@/components/layout/PageHeader';
import { MapEmbed } from '@/components/sections/MapEmbed';
import { MAPS_LINKS, SITE, telLink, viberLink, whatsappLink } from '@/data/site';
import { useI18n } from '@/i18n/context';
import { PageShell } from './PageShell';

export default function Contact() {
  const { t } = useI18n();

  const channels: {
    id: keyof typeof t.contact.channels;
    href: string;
    value: string;
    icon: LucideIcon;
    external?: boolean;
  }[] = [
    { id: 'phone', href: telLink, value: SITE.phone.display, icon: Phone },
    {
      id: 'whatsapp',
      href: whatsappLink(t.contact.whatsappGeneric),
      value: SITE.phone.display,
      icon: MessageCircle,
      external: true,
    },
    { id: 'viber', href: viberLink(), value: SITE.phone.display, icon: MessagesSquare },
    { id: 'email', href: `mailto:${SITE.email}`, value: SITE.email, icon: Mail },
  ];

  return (
    <PageShell page="contact">
      <PageHeader title={t.contact.title} lead={t.contact.lead} />

      <section aria-label={t.nav.pages.contact} className="pb-20 sm:pb-28">
        <Container>
          <ul className="border-t border-line-strong">
            {channels.map(({ id, href, value, icon: Icon, external }) => (
              <li key={id} className="border-b border-line">
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group/row grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-1 py-6 transition-colors duration-300 hover:bg-ink/[0.035] sm:grid-cols-[auto_12rem_1fr_auto] sm:px-4"
                >
                  <Icon className="size-7 text-accent-text" strokeWidth={1.5} aria-hidden="true" />
                  <span className="sm:contents">
                    <span className="label block text-[1.0625rem] text-ink sm:text-ink">
                      {t.contact.channels[id].label}
                    </span>
                    <span className="block text-sm text-ink-faint sm:hidden">{t.contact.channels[id].hint}</span>
                  </span>
                  <span className="tabular col-span-2 col-start-1 row-start-2 break-all font-display text-[clamp(1.75rem,1.1rem+2.6vw,3.25rem)] font-extrabold leading-none sm:col-span-1 sm:col-start-3 sm:row-start-1">
                    {value}
                  </span>
                  <ArrowUpRight
                    className="size-7 text-ink-faint transition-[transform,color] duration-300 ease-signal group-hover/row:-translate-y-1 group-hover/row:translate-x-1 group-hover/row:text-accent-text"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="where-title" className="pb-24 sm:pb-32">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h2 id="where-title" className="label text-[1.0625rem] text-ink-faint">
              {t.contact.addressTitle}
            </h2>
            <address className="display mt-3 text-[clamp(2rem,1.4rem+2vw,3rem)] not-italic leading-none">
              {SITE.address.street}
              <br />
              {SITE.address.city}
            </address>

            <h3 className="label mt-10 text-[1.0625rem] text-ink-faint">{t.contact.hoursTitle}</h3>
            <p className="mt-3 max-w-[30ch] text-lg">{t.contact.hours}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={MAPS_LINKS.google} target="_blank" rel="noopener noreferrer" arrow>
                {t.contact.map.google}
              </Button>
              <Button variant="secondary" href={MAPS_LINKS.apple} target="_blank" rel="noopener noreferrer">
                {t.contact.map.apple}
              </Button>
            </div>

            <figure className="mt-12">
              <div className="aspect-[16/10] overflow-hidden rounded-[10px] bg-surface-2">
                <Photo
                  id="sign"
                  alt={t.photos.sign}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  position="42% 50%"
                  className="size-full object-cover"
                />
              </div>
              <figcaption className="mt-3 max-w-[44ch] text-sm text-ink-faint">{t.facilities.find.text}</figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <h2 className="label mb-3 text-[1.0625rem] text-ink-faint">{t.contact.map.title}</h2>
            <MapEmbed />
          </Reveal>
        </Container>
      </section>
    </PageShell>
  );
}
