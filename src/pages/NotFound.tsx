import { buttonStyles } from '@/components/ui/buttonStyles';
import { Container } from '@/components/ui/Layout';
import { useI18n } from '@/i18n/context';
import { Link } from '@/router/Link';
import { PageShell } from './PageShell';

export default function NotFound() {
  const { t } = useI18n();
  return (
    <PageShell page="notFound">
      <Container className="grid min-h-[70svh] place-items-center pb-16 pt-32 text-center">
        <div className="max-w-xl">
          <p className="display-title bg-gradient-to-br from-brand-400 to-brand-700 bg-clip-text text-[clamp(5rem,3rem+10vw,9rem)] text-transparent">
            {t.notFound.code}
          </p>
          <h1 className="display-title mt-2 text-[clamp(1.75rem,1.2rem+2.4vw,2.75rem)]">{t.notFound.title}</h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-muted">{t.notFound.text}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link route="home" className={buttonStyles({ size: 'lg' })}>
              {t.notFound.home}
            </Link>
            <Link route="pricing" className={buttonStyles({ size: 'lg', variant: 'secondary' })}>
              {t.notFound.pricing}
            </Link>
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
