import { ArrowRight, Bus, Cctv, Star, Wallet, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Card } from '@/components/ui/Card';
import { Container, Section, SectionHeading } from '@/components/ui/Layout';
import { Reveal } from '@/components/ui/Reveal';
import { GOOGLE_RATING } from '@/data/content';
import { PRICING_TIERS } from '@/data/pricing';
import { useNow } from '@/hooks/useNow';
import { useI18n } from '@/i18n/context';
import { useFormat } from '@/i18n/useFormat';
import { Link } from '@/router/Link';
import type { RouteId } from '@/router/routes';
import { formatCountdown, nextDepartures } from '@/utils/shuttle';

interface TeaserProps {
  route: RouteId;
  icon: LucideIcon;
  eyebrow: string;
  headline: ReactNode;
  badge?: string;
  text: string;
  link: string;
  delay: number;
}

function Teaser({ route, icon: Icon, eyebrow, headline, badge, text, link, delay }: TeaserProps) {
  return (
    <li className="min-w-0">
      <Reveal delay={delay} className="h-full">
        <Link route={route} className="group block h-full rounded-[1.75rem] outline-offset-4">
          <Card interactive className="flex h-full flex-col">
            <span className="flex items-center gap-2.5 text-sm font-semibold text-ink-muted">
              <span className="grid size-9 place-items-center rounded-xl bg-accent-soft text-accent">
                <Icon className="size-[1.125rem]" strokeWidth={2} aria-hidden="true" />
              </span>
              {eyebrow}
            </span>
            <p className="mt-6 text-[clamp(1.75rem,1.4rem+1.2vw,2.25rem)] font-bold leading-tight tracking-[-0.04em] tabular">
              {headline}
            </p>
            {badge && <p className="mt-1 text-sm font-semibold text-accent tabular">{badge}</p>}
            <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-muted">{text}</p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
              {link}
              <ArrowRight
                className="size-4 transition-transform duration-300 ease-apple group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </Card>
        </Link>
      </Reveal>
    </li>
  );
}

/** Entry points to the inner pages — each one a short, live-looking preview with a clear next step. */
export function HomeTeasers() {
  const { t } = useI18n();
  const fmt = useFormat();
  const now = useNow(15_000);

  const cheapest = Math.min(...PRICING_TIERS.map((tier) => Math.min(tier.rates.open, tier.rates.covered)));
  const next = nextDepartures(now, 'parking', 1)[0];

  return (
    <Section className="pt-4 sm:pt-6">
      <Container>
        <SectionHeading
          eyebrow={t.home.exploreEyebrow}
          title={t.home.exploreTitle}
          description={t.home.exploreDescription}
        />

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Teaser
            route="pricing"
            icon={Wallet}
            eyebrow={t.home.pricing.eyebrow}
            headline={t.home.pricing.headline(fmt.km(cheapest))}
            text={t.home.pricing.text}
            link={t.home.pricing.link}
            delay={0}
          />
          <Teaser
            route="facilities"
            icon={Cctv}
            eyebrow={t.home.facilities.eyebrow}
            headline={t.home.facilities.headline}
            badge={t.home.facilities.badge}
            text={t.home.facilities.text}
            link={t.home.facilities.link}
            delay={0.07}
          />
          <Teaser
            route="shuttle"
            icon={Bus}
            eyebrow={t.home.shuttle.eyebrow}
            headline={next ? next.time : '—'}
            badge={
              next ? `${t.home.shuttle.next} · ${formatCountdown(next.inMinutes, t.shuttle.countdown)}` : undefined
            }
            text={t.home.shuttle.text}
            link={t.home.shuttle.link}
            delay={0.14}
          />
          <Teaser
            route="reviews"
            icon={Star}
            eyebrow={t.home.reviews.eyebrow}
            headline={t.home.reviews.headline(fmt.number(GOOGLE_RATING.score, 1))}
            text={t.home.reviews.text(fmt.number(GOOGLE_RATING.count))}
            link={t.home.reviews.link}
            delay={0.21}
          />
        </ul>
      </Container>
    </Section>
  );
}
