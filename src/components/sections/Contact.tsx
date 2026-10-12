import { Clock, Mail, MessageCircle, Phone, Send, type LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Container, Section } from '@/components/ui/Layout';
import { Reveal } from '@/components/ui/Reveal';
import { useBooking } from '@/context/bookingContext';
import { SITE, viberLink, whatsappLink } from '@/data/site';
import { useI18n } from '@/i18n/context';
import { useFormat } from '@/i18n/useFormat';
import { cn } from '@/utils/cn';
import { LocationMap } from './LocationMap';

type ChannelId = 'whatsapp' | 'viber' | 'phone' | 'email';

interface Channel {
  id: ChannelId;
  value: string;
  href: string;
  icon: LucideIcon;
  tint: string;
  external?: boolean;
}

/** Contact channels, opening hours and the interactive location map. */
export default function Contact() {
  const { stay, isBookable } = useBooking();
  const { t } = useI18n();
  const fmt = useFormat();
  const c = t.contact;

  // Pre-fill the chat with the dates the visitor already chose
  const message = isBookable
    ? c.whatsappDates(fmt.dateShort(stay.dropOffDate), fmt.dateShort(stay.pickUpDate))
    : c.whatsappGeneric;

  const channels: Channel[] = [
    {
      id: 'whatsapp',
      value: SITE.phone.display,
      href: whatsappLink(message),
      icon: MessageCircle,
      tint: 'bg-[#25d366] text-white shadow-[0_10px_24px_-10px_rgb(37_211_102/0.9)]',
      external: true,
    },
    {
      id: 'viber',
      value: SITE.phone.display,
      href: viberLink(),
      icon: Send,
      tint: 'bg-[#7360f2] text-white shadow-[0_10px_24px_-10px_rgb(115_96_242/0.9)]',
    },
    {
      id: 'phone',
      value: SITE.phone.display,
      href: `tel:${SITE.phone.e164}`,
      icon: Phone,
      tint: 'bg-brand-600 text-white shadow-[0_10px_24px_-10px_rgb(0_113_227/0.9)]',
    },
    {
      id: 'email',
      value: SITE.email,
      href: `mailto:${SITE.email}`,
      icon: Mail,
      tint: 'bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900',
    },
  ];

  const hours = [c.hours.parking, c.hours.reception, c.hours.admin];

  return (
    <Section className="pt-4 sm:pt-6 lg:pt-8">
      <Container>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="grid grid-cols-1 content-start gap-4">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {channels.map((channel, i) => {
                const Icon = channel.icon;
                const label = c.channels[channel.id].label;
                return (
                  <li key={channel.id} className="min-w-0">
                    <Reveal delay={i * 0.06} className="h-full">
                      <a
                        href={channel.href}
                        {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        aria-label={c.channelAria(label, channel.value)}
                        className="block h-full rounded-[1.75rem] outline-offset-4"
                      >
                        <Card interactive className="flex h-full flex-col p-5 sm:p-6">
                          <span className={cn('grid size-12 place-items-center rounded-2xl', channel.tint)}>
                            <Icon className="size-6" strokeWidth={1.9} aria-hidden="true" />
                          </span>
                          <span className="mt-5 text-lg font-bold tracking-[-0.02em]">{label}</span>
                          <span className="mt-0.5 truncate text-[0.9375rem] font-medium text-accent">
                            {channel.value}
                          </span>
                          <span className="mt-1 text-[0.8125rem] text-ink-muted">{c.channels[channel.id].hint}</span>
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
                  <h2 className="flex items-center gap-2.5 text-lg font-bold tracking-[-0.02em]">
                    <Clock className="size-5 text-accent" aria-hidden="true" />
                    {c.hours.title}
                  </h2>
                  <Badge tone="success">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-emerald-500" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                    </span>
                    {c.hours.openNow}
                  </Badge>
                </div>
                <dl className="mt-4 divide-y divide-line">
                  {hours.map((row) => (
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
