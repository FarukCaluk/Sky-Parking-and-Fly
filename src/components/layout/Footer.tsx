import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout';
import { Photo } from '@/components/ui/Photo';
import { SITE, telLink, whatsappLink } from '@/data/site';
import { useI18n } from '@/i18n/context';
import { Link } from '@/router/Link';
import { LEGAL_ROUTES, NAV_ROUTES } from '@/router/routes';
import { LanguageLinks } from './LanguageLinks';
import { LogoStack } from './Logo';

const linkClass = 'inline-block py-1.5 text-[0.9375rem] text-ink-muted transition-colors duration-200 hover:text-ink';
const headingClass = 'label mb-3 text-[0.9375rem] text-ink-faint';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative mt-10 sm:mt-16">
      <Container>
        <section
          aria-labelledby="footer-cta"
          className="relative isolate overflow-hidden rounded-[10px] bg-night text-white"
        >
          <Photo
            id="sign"
            alt=""
            sizes="(min-width: 1344px) 1344px, 100vw"
            className="absolute inset-0 -z-20 size-full object-cover object-[30%_50%] opacity-45"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(7_13_26/0.96)_0%,rgb(7_13_26/0.78)_55%,rgb(7_13_26/0.5)_100%)]"
          />
          <div className="grid gap-10 p-7 sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:p-16">
            <div>
              <h2 id="footer-cta" className="display text-title max-w-[11ch]">
                {t.footer.ctaTitle}
              </h2>
              <p className="mt-5 max-w-[40ch] text-lg text-white/80">{t.footer.ctaText}</p>
            </div>
            <div className="grid gap-6 lg:justify-items-end">
              <a
                href={telLink}
                aria-label={t.nav.callUs(SITE.phone.display)}
                className="display tabular text-[clamp(2.5rem,1.4rem+4.4vw,4.75rem)] leading-none transition-colors hover:text-accent"
              >
                {SITE.phone.display}
              </a>
              <div className="flex flex-wrap gap-3">
                <Button to="reservation" size="lg" arrow>
                  {t.nav.book}
                </Button>
                <Button
                  variant="onPhoto"
                  size="lg"
                  href={whatsappLink(t.contact.whatsappGeneric)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-x-8 gap-y-12 pb-12 pt-20 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <LogoStack label={SITE.name} />
            <address className="mt-6 text-[0.9375rem] not-italic leading-relaxed text-ink-muted">
              {SITE.address.street}
              <br />
              {SITE.address.city}
            </address>
          </div>

          <div>
            <h3 className={headingClass}>{t.footer.contact}</h3>
            <ul>
              <li>
                <a href={telLink} className={linkClass}>
                  {SITE.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className={linkClass}>
                  {SITE.email}
                </a>
              </li>
              <li className="py-1.5 text-[0.9375rem] text-ink-muted">{t.footer.hours}</li>
            </ul>
          </div>

          <nav aria-label={t.footer.navAria}>
            <h3 className={headingClass}>{t.footer.pages}</h3>
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
            <h3 className={headingClass}>{t.footer.legal}</h3>
            <ul>
              {LEGAL_ROUTES.map((id) => (
                <li key={id}>
                  <Link route={id} className={linkClass}>
                    {t.nav.pages[id]}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className={`${headingClass} mt-8`}>{t.footer.language}</h3>
            <LanguageLinks className="-ml-1.5" />
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-7 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.rights(new Date().getFullYear())}</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="label inline-flex min-h-10 items-center gap-2 self-start text-[0.9375rem] text-ink-muted transition-colors hover:text-ink sm:self-auto"
          >
            <ArrowUp className="size-4" strokeWidth={2.25} aria-hidden="true" />
            {t.footer.toTop}
          </button>
        </div>
      </Container>
    </footer>
  );
}
