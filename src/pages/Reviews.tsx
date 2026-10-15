import { PageHeader } from '@/components/layout/PageHeader';
import { ReviewsGrid } from '@/components/sections/ReviewsGrid';
import { useI18n } from '@/i18n/context';
import { PageShell } from './PageShell';

export default function Reviews() {
  const { t } = useI18n();

  return (
    <PageShell page="reviews">
      <PageHeader title={t.reviews.title} lead={t.reviews.lead} />
      <ReviewsGrid />
    </PageShell>
  );
}
