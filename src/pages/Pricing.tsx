import { PageHeader } from '@/components/layout/PageHeader';
import { PricingCalculator } from '@/components/sections/PricingCalculator';
import { useI18n } from '@/i18n/context';
import { PageShell } from './PageShell';

export default function Pricing() {
  const { t } = useI18n();
  return (
    <PageShell page="pricing">
      <PageHeader eyebrow={t.calculator.eyebrow} title={t.calculator.title} description={t.calculator.description} />
      <PricingCalculator />
    </PageShell>
  );
}
