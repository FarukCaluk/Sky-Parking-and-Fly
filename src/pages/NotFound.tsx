import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout';
import { useI18n } from '@/i18n/context';
import { PageShell } from './PageShell';

export default function NotFound() {
  const { t } = useI18n();

  return (
    <PageShell page="notFound">
      <Container className="grid min-h-[86dvh] content-center pb-20 pt-32">
        <p
          aria-hidden="true"
          className="display tabular text-[clamp(8rem,3rem+22vw,24rem)] leading-[0.78] text-accent-text"
        >
          {t.notFound.code}
        </p>
        <h1 className="display text-heading mt-8">{t.notFound.title}</h1>
        <p className="mt-4 max-w-[44ch] text-lg text-ink-muted">{t.notFound.text}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to="home" arrow>
            {t.notFound.home}
          </Button>
          <Button to="faq" variant="secondary">
            {t.nav.pages.faq}
          </Button>
        </div>
      </Container>
    </PageShell>
  );
}
