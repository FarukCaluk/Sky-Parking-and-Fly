import { PageHeader } from '@/components/layout/PageHeader';
import { Container, Section } from '@/components/ui/Layout';
import { SITE } from '@/data/site';
import { useI18n } from '@/i18n/context';
import { fillTemplate } from '@/i18n/template';
import type { RouteId } from '@/router/routes';
import { PageShell } from './PageShell';

type LegalDocId = 'terms' | 'privacy' | 'cookies';

function LegalPage({ id }: { id: LegalDocId & RouteId }) {
  const { t } = useI18n();
  const doc = t.legal.docs[id];
  const values = {
    legalName: SITE.legalName,
    street: SITE.address.street,
    city: SITE.address.city,
    email: SITE.email,
  };

  return (
    <PageShell page={id}>
      <PageHeader title={doc.title} description={t.legal.updated(doc.updated)} />
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="mx-auto max-w-2xl space-y-8 rounded-[1.75rem] border border-line bg-surface p-6 shadow-card sm:p-10">
            {doc.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-lg font-bold tracking-[-0.02em]">{section.heading}</h2>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
                  {fillTemplate(section.body, values)}
                </p>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}

export const Terms = () => <LegalPage id="terms" />;
export const Privacy = () => <LegalPage id="privacy" />;
export const Cookies = () => <LegalPage id="cookies" />;
