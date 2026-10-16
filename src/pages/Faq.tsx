import { JsonLd } from '@/components/ui/JsonLd';
import { Container } from '@/components/ui/Layout';
import { Photo } from '@/components/ui/Photo';
import { FaqList } from '@/components/sections/FaqList';
import type { FaqItem } from '@/i18n/bs';
import { useI18n } from '@/i18n/context';
import { PageShell } from './PageShell';

/** `FAQPage` structured data, so the questions can appear as rich results. */
function faqSchema(items: readonly FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: [item.a, ...(item.list?.map((row) => `${row.label}: ${row.value}`) ?? []), item.after]
          .filter(Boolean)
          .join(' '),
      },
    })),
  };
}

export default function Faq() {
  const { t } = useI18n();

  return (
    <PageShell page="faq">
      <JsonLd data={faqSchema(t.faq.items)} />
      <Container className="grid gap-12 pb-24 pt-32 sm:pt-40 lg:grid-cols-12 lg:gap-16 lg:pb-32">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h1 className="display text-title max-w-[8ch]">{t.faq.title}</h1>
            <p className="mt-6 max-w-[40ch] text-lg text-ink-muted">{t.faq.lead}</p>
            <div className="mt-10 hidden aspect-[16/10] overflow-hidden rounded-[10px] bg-surface-2 lg:block">
              <Photo id="pole" alt={t.photos.pole} sizes="40vw" position="50% 40%" className="size-full object-cover" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 lg:pt-3">
          <FaqList />
        </div>
      </Container>
    </PageShell>
  );
}
