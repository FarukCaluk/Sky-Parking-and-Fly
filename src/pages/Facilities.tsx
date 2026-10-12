import { PageHeader } from '@/components/layout/PageHeader';
import FacilitiesOverview from '@/components/sections/Facilities';
import { useI18n } from '@/i18n/context';
import { PageShell } from './PageShell';

export default function Facilities() {
  const { t } = useI18n();
  return (
    <PageShell page="facilities">
      <PageHeader eyebrow={t.facilities.eyebrow} title={t.facilities.title} description={t.facilities.description} />
      <FacilitiesOverview />
    </PageShell>
  );
}
