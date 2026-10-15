import { PageHeader } from '@/components/layout/PageHeader';
import { NewsGrid } from '@/components/sections/NewsCards';
import { Container } from '@/components/ui/Layout';
import { useI18n } from '@/i18n/context';
import { PageShell } from './PageShell';

export default function News() {
  const { t } = useI18n();

  return (
    <PageShell page="news">
      <PageHeader title={t.news.title} lead={t.news.lead} />
      <Container className="pb-24 sm:pb-32">
        <NewsGrid />
      </Container>
    </PageShell>
  );
}
