import { Container } from '@/components/ui/Layout';
import { PageHeader } from '@/components/layout/PageHeader';
import { useI18n } from '@/i18n/context';
import { PageShell } from './PageShell';

function LegalPage({ doc }: { doc: 'terms' | 'privacy' | 'cookies' }) {
  const { t } = useI18n();
  const content = t.legal.docs[doc];

  return (
    <PageShell page={doc}>
      <PageHeader title={content.title} lead={t.legal.updated(content.updated)} />
      <Container className="pb-24 sm:pb-32">
        <div className="max-w-[68ch]">
          {content.sections.map((section) => (
            <section key={section.heading} className="border-t border-line py-8">
              <h2 className="display text-[clamp(1.75rem,1.4rem+1vw,2.25rem)] leading-none">{section.heading}</h2>
              <p className="mt-3 text-lg text-ink-muted">{section.body}</p>
            </section>
          ))}
        </div>
      </Container>
    </PageShell>
  );
}

export const Terms = () => <LegalPage doc="terms" />;
export const Privacy = () => <LegalPage doc="privacy" />;
export const Cookies = () => <LegalPage doc="cookies" />;
