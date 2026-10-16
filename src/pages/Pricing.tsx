import { Container } from '@/components/ui/Layout';
import { PageHeader } from '@/components/layout/PageHeader';
import { ArrivalSupport } from '@/components/sections/ArrivalSupport';
import { DayCount } from '@/components/sections/DayCount';
import { PriceCards } from '@/components/sections/PriceCards';
import { PriceCheck } from '@/components/sections/PriceCheck';
import { useI18n } from '@/i18n/context';
import { PageShell } from './PageShell';

export default function Pricing() {
  const { t } = useI18n();

  return (
    <PageShell page="pricing">
      <PageHeader title={t.nav.pages.pricing} lead={t.price.lead} />
      <PriceCards />
      <DayCount />
      <PriceCheck />
      <ArrivalSupport />

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
