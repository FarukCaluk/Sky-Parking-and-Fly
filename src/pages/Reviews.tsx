import { PageHeader } from '@/components/layout/PageHeader';
import { ReviewsWall } from '@/components/sections/ReviewsWall';
import { useI18n } from '@/i18n/context';
import { PageShell } from './PageShell';

export default function Reviews() {
  const { t } = useI18n();

  return (
    <PageShell page="reviews">
      <PageHeader title={t.reviews.title} lead={t.reviews.lead} />
      <div className="-mt-12 lg:-mt-16">
        <ReviewsWall withHeading={false} />
      </div>
    </PageShell>
  );
}
