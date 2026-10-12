import { ArrowRight, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout';
import { SITE } from '@/data/site';
import { EXTRAS } from '@/data/pricing';
import { useBooking } from '@/context/bookingContext';
import { useI18n } from '@/i18n/context';
import { Link } from '@/router/Link';
import { LEGAL_ROUTES, NAV_ROUTES } from '@/router/routes';
import { LanguageLinks } from './LanguageLinks';
import { LogoFull } from './Logo';

const linkClass = 'inline-block py-1.5 text-[0.9375rem] text-ink-muted transition-colors duration-200 hover:text-ink';

export default function Footer() {
  const { openBooking } = useBooking();
  const { t } = useI18n();

  return (
    <footer className="relative mt-8 sm:mt-12">
      <Container>
        {/* Closing call to action */}
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-zinc-900 via-zinc-900 to-brand-950 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(26_136_255/0.4),transparent)]"
          />
          <div className="relative">
            <h2 className="display-title mx-auto max-w-2xl text-[clamp(1.875rem,1.3rem+2.6vw,3.25rem)]">
              {t.footer.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-pretty text-base text-white/65 sm:text-lg">{t.footer.ctaText}</p>
            <Button
              size="lg"
              onClick={openBooking}
              className="mt-8"
              rightIcon={<ArrowRight className="size-5" aria-hidden="true" />}
            >
              {t.nav.bookParking}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 pb-10 pt-16 md:grid-cols-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <LogoFull label={`${SITE.name} Sarajevo`} />
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-ink-muted">
              {t.footer.about(SITE.shuttleMinutes)}
            </p>
            <address className="mt-4 text-sm not-italic leading-relaxed text-ink-muted">
              {SITE.address.street}
              <br />
              {SITE.address.city}, {t.footer.country}
            </address>
          </div>

          <nav aria-label={t.footer.navAria}>
            <h3 className="mb-2 text-sm font-semibold">{t.footer.pages}</h3>
            <ul>
              {NAV_ROUTES.map((id) => (
                <li key={id}>
                  <Link route={id} className={linkClass}>
                    {t.nav.pages[id]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-2 text-sm font-semibold">{t.footer.services}</h3>
            <ul>
              <li>
                <Link route="pricing" className={linkClass}>
                  {t.pricing.covers.covered.label}
                </Link>
              </li>
              <li>
                <Link route="pricing" className={linkClass}>
                  {t.pricing.covers.open.label}
                </Link>
              </li>
              {EXTRAS.slice(0, 3).map((extra) => (
                <li key={extra.id}>
                  <Link route="pricing" className={linkClass}>
                    {t.pricing.extras[extra.id].label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold">{t.footer.legal}</h3>
            <ul>
              {LEGAL_ROUTES.map((id) => (
                <li key={id}>
                  <Link route={id} className={linkClass}>
                    {t.nav.pages[id]}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mb-2 mt-6 text-sm font-semibold">{t.footer.language}</h3>
            <LanguageLinks variant="inline" className="max-w-[12rem]" />
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-8 text-xs leading-relaxed text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p>{t.footer.rights(new Date().getFullYear(), SITE.legalName)}</p>
            <p className="mt-1">
              {SITE.companyId} · {SITE.vatId} · {t.footer.priceNote}
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex min-h-10 items-center gap-2 self-start rounded-full bg-ink/[0.06] px-4 text-[0.8125rem] font-semibold text-ink-muted transition-colors hover:bg-ink/[0.1] hover:text-ink sm:self-auto"
          >
            <ArrowUp className="size-4" aria-hidden="true" />
            {t.footer.toTop}
          </button>
        </div>
      </Container>
    </footer>
  );
}
