import { Clock, Mail, MessageCircle, Phone, Send, type LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Container, Section, SectionHeading } from '@/components/ui/Layout';
import { Reveal } from '@/components/ui/Reveal';
import { useBooking } from '@/context/bookingContext';
import { SITE, viberLink, whatsappLink } from '@/data/site';
import { cn } from '@/utils/cn';
import { formatDateShort } from '@/utils/date';
import { LocationMap } from './LocationMap';

interface Channel {
  id: string;
  label: string;
  value: string;
  hint: string;
  href: string;
  icon: LucideIcon;
  tint: string;
  external?: boolean;
}

export default function Contact() {
  const { stay, isBookable } = useBooking();

  const message = isBookable
    ? `Zdravo! Zanima me parking od ${formatDateShort(stay.dropOffDate)} do ${formatDateShort(stay.pickUpDate)}.`
    : 'Zdravo! Zanima me parking na aerodromu.';

  const channels: Channel[] = [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      value: SITE.phone.display,
      hint: 'Odgovaramo za par minuta',
      href: whatsappLink(message),
      icon: MessageCircle,
      tint: 'bg-[#25d366] text-white shadow-[0_10px_24px_-10px_rgb(37_211_102/0.9)]',
      external: true,
    },
    {
      id: 'viber',
      label: 'Viber',
      value: SITE.phone.display,
      hint: 'Poruka ili poziv',
      href: viberLink(),
      icon: Send,
      tint: 'bg-[#7360f2] text-white shadow-[0_10px_24px_-10px_rgb(115_96_242/0.9)]',
    },
    {
      id: 'phone',
      label: 'Telefon',
      value: SITE.phone.display,
      hint: 'Non-stop, 0–24h',
      href: `tel:${SITE.phone.e164}`,
      icon: Phone,
      tint: 'bg-brand-600 text-white shadow-[0_10px_24px_-10px_rgb(0_113_227/0.9)]',
    },
    {
      id: 'email',
      label: 'E-mail',
      value: SITE.email,
      hint: 'Odgovor u roku od sat vremena',
      href: `mailto:${SITE.email}`,
      icon: Mail,
      tint: 'bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900',
    },
  ];

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Kontakt"
          title="Tu smo — 0–24h, svaki dan."
          description="Pitanje o rezervaciji, kašnjenju leta ili preuzimanju vozila? Javite se kanalom koji vam najviše odgovara."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="grid grid-cols-1 content-start gap-4">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {channels.map((channel, i) => {
                const Icon = channel.icon;
                return (
                  <li key={channel.id} className="min-w-0">
                    <Reveal delay={i * 0.06} className="h-full">
                      <a
                        href={channel.href}
                        {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        aria-label={`${channel.label}: ${channel.value}`}
                        className="block h-full rounded-[1.75rem] outline-offset-4"
                      >
                        <Card interactive className="flex h-full flex-col p-5 sm:p-6">
                          <span className={cn('grid size-12 place-items-center rounded-2xl', channel.tint)}>
                            <Icon className="size-6" strokeWidth={1.9} aria-hidden="true" />
                          </span>
                          <span className="mt-5 text-lg font-bold tracking-[-0.02em]">{channel.label}</span>
                          <span className="mt-0.5 truncate text-[0.9375rem] font-medium text-accent">
                            {channel.value}
                          </span>
                          <span className="mt-1 text-[0.8125rem] text-ink-muted">{channel.hint}</span>
                        </Card>
                      </a>
                    </Reveal>
                  </li>
                );
              })}
            </ul>

            <Reveal delay={0.1}>
              <Card>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="flex items-center gap-2.5 text-lg font-bold tracking-[-0.02em]">
                    <Clock className="size-5 text-accent" aria-hidden="true" />
                    Radno vrijeme
                  </h3>
                  <Badge tone="success">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-emerald-500" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                    </span>
                    Otvoreno sada
                  </Badge>
                </div>
                <dl className="mt-4 divide-y divide-line">
                  {SITE.hours.map((row) => (
                    <div key={row.label} className="flex items-center justify-between gap-4 py-3 text-[0.9375rem]">
                      <dt className="text-ink-muted">{row.label}</dt>
                      <dd className="text-right font-semibold">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </Card>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="h-full">
            <Card className="h-full p-4 sm:p-5">
              <LocationMap />
            </Card>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
