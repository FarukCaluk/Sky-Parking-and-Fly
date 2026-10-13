import { Container } from '@/components/ui/Layout';
import { Reveal } from '@/components/ui/Reveal';
import { PageHeader } from '@/components/layout/PageHeader';
import { PriceLadder } from '@/components/sections/PriceLadder';
import { PRICING_TIERS } from '@/data/pricing';
import { useI18n } from '@/i18n/context';
import { PageShell } from './PageShell';

export default function Pricing() {
  const { t } = useI18n();

  return (
    <PageShell page="pricing">
      <PageHeader title={t.nav.pages.pricing} />

      <section aria-label={t.nav.pages.pricing} className="pb-6">
        <Container>
          <ul className="border-t border-line-strong">
            {PRICING_TIERS.map((tier) => (
              <li key={tier.id} className="border-b border-line">
                <Reveal className="grid items-center gap-x-10 gap-y-3 py-8 sm:grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_auto]">
                  <h2 className="display text-[clamp(2.5rem,1.6rem+3.4vw,4.5rem)] leading-none">
                    {t.price.tiers[tier.id].label}
                  </h2>
                  <p className="max-w-[46ch] text-ink-muted sm:col-span-1 lg:col-start-2">
                    {t.price.tiers[tier.id].hint}
                  </p>
                  <p className="display tabular flex items-baseline gap-3 sm:row-span-2 sm:row-start-1 sm:col-start-2 lg:row-span-1 lg:col-start-3">
                    <span className="text-[clamp(4rem,2.4rem+6vw,7.5rem)] leading-[0.8] text-accent-text">
                      {tier.rate}
                    </span>
                    <span className="text-sub text-ink-muted">{t.price.unit}</span>
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <PriceLadder />

      <section className="pb-24">
        <Container className="grid gap-6 text-ink-muted lg:grid-cols-3 lg:gap-12">
          <p>{t.price.longStay}</p>
          <p>{t.price.payment}</p>
          <p>{t.price.currency}</p>
        </Container>
      </section>
    </PageShell>
  );
}
