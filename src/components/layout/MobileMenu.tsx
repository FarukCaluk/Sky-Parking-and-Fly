import { m } from 'framer-motion';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { SITE, telLink, viberLink, whatsappLink } from '@/data/site';
import { useI18n } from '@/i18n/context';
import { Link } from '@/router/Link';
import { useRoute } from '@/router/navigation';
import { NAV_ROUTES } from '@/router/routes';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/Button';
import { LanguageLinks } from './LanguageLinks';
import { ThemeToggle } from './ThemeToggle';

/** Full-screen menu for phones and tablets. Sits under the fixed header, which keeps the close button reachable. */
export function MobileMenu({ onClose }: { onClose: () => void }) {
  const { t } = useI18n();
  const { route } = useRoute();

  return (
    <m.div
      id="mobile-menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.18 } }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-30 flex flex-col overflow-y-auto bg-canvas px-5 pb-8 pt-24 sm:px-8"
    >
      <LanguageLinks segmented onNavigate={onClose} className="mb-5" />

      <nav aria-label={t.nav.aria}>
        <ul className="border-t border-line">
          {NAV_ROUTES.map((id, index) => (
            <m.li
              key={id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 + index * 0.045, ease: [0.16, 1, 0.3, 1] }}
              className="border-b border-line"
            >
              <Link
                route={id}
                onClick={onClose}
                aria-current={route === id ? 'page' : undefined}
                className={cn(
                  'display flex min-h-16 items-center justify-between py-2 text-[2.75rem] leading-none transition-colors',
                  route === id ? 'text-accent-text' : 'text-ink hover:text-accent-text',
                )}
              >
                {t.nav.pages[id]}
                <ArrowRight className="size-7 text-ink-faint" strokeWidth={2} aria-hidden="true" />
              </Link>
            </m.li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto grid gap-6 pt-10">
        <a
          href={telLink}
          aria-label={t.nav.callUs(SITE.phone.display)}
          className="display tabular text-[clamp(2.25rem,1.6rem+3vw,3.25rem)] leading-none text-ink"
        >
          {SITE.phone.display}
        </a>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="secondary"
            href={whatsappLink(t.contact.whatsappGeneric)}
            target="_blank"
            rel="noopener noreferrer"
            leftIcon={<MessageCircle className="size-5" aria-hidden="true" />}
          >
            WhatsApp
          </Button>
          <Button variant="secondary" href={viberLink()} leftIcon={<Phone className="size-5" aria-hidden="true" />}>
            Viber
          </Button>
        </div>
        <div className="flex items-center justify-end border-t border-line pt-4">
          <ThemeToggle />
        </div>
      </div>
    </m.div>
  );
}
