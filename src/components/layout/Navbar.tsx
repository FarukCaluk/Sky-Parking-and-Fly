import { AnimatePresence, m } from 'framer-motion';
import { ArrowRight, Menu, Moon, Phone, Sun, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { PresenceGuard } from '@/components/ui/PresenceGuard';
import { SITE } from '@/data/site';
import { useBooking } from '@/context/bookingContext';
import { useDismiss } from '@/hooks/useDismiss';
import { useScrolled } from '@/hooks/useScrolled';
import { useTheme } from '@/hooks/useTheme';
import { useI18n } from '@/i18n/context';
import { Link } from '@/router/Link';
import { useRoute } from '@/router/navigation';
import { NAV_ROUTES } from '@/router/routes';
import { cn } from '@/utils/cn';
import { LanguageLinks } from './LanguageLinks';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';

export function Navbar() {
  const { openBooking } = useBooking();
  const { t } = useI18n();
  const { route } = useRoute();
  const { theme, toggleTheme } = useTheme();
  const scrolled = useScrolled(8);
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useDismiss(rootRef, menuOpen, () => setMenuOpen(false));

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div ref={rootRef} className="relative mx-auto max-w-5xl">
        <nav
          aria-label={t.nav.aria}
          className={cn(
            'flex h-14 items-center justify-between gap-2 rounded-full border pl-3.5 pr-2 sm:h-[3.75rem] sm:pl-4',
            'bg-white/85 backdrop-blur-xl backdrop-saturate-150 dark:bg-zinc-900/80',
            'transition-[box-shadow,border-color] duration-500 ease-apple',
            scrolled
              ? 'border-black/[0.08] shadow-[0_8px_32px_-8px_rgb(0_0_0/0.25)] dark:border-white/[0.12]'
              : 'border-white/50 shadow-[0_8px_32px_-12px_rgb(0_0_0/0.2)] dark:border-white/[0.08]',
          )}
        >
          <Link
            route="home"
            aria-label={t.nav.homeAria}
            aria-current={route === 'home' ? 'page' : undefined}
            className="rounded-full"
          >
            <Logo />
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV_ROUTES.map((id) => (
              <li key={id}>
                <Link
                  route={id}
                  aria-current={route === id ? 'page' : undefined}
                  className={cn(
                    'relative rounded-full px-3.5 py-2 text-sm font-medium tracking-[-0.01em] transition-colors duration-200',
                    route === id ? 'bg-ink/[0.07] text-ink' : 'text-ink-muted hover:text-ink',
                  )}
                >
                  {t.nav.pages[id]}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <a
              href={`tel:${SITE.phone.e164}`}
              aria-label={t.nav.callUs(SITE.phone.display)}
              className="hidden size-10 place-items-center rounded-full text-ink-muted transition-colors hover:bg-ink/[0.07] hover:text-ink xl:grid"
            >
              <Phone className="size-[1.125rem]" aria-hidden="true" />
            </a>
            <LanguageSwitcher className="max-sm:hidden" />
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? t.nav.switchToLight : t.nav.switchToDark}
              className="grid size-10 place-items-center rounded-full text-ink-muted transition-[background-color,color,transform] duration-200 hover:bg-ink/[0.07] hover:text-ink active:scale-90 max-[22rem]:hidden"
            >
              {theme === 'dark' ? (
                <Sun className="size-[1.125rem]" aria-hidden="true" />
              ) : (
                <Moon className="size-[1.125rem]" aria-hidden="true" />
              )}
            </button>
            <Button size="sm" onClick={openBooking} className="ml-1 px-4 max-[22rem]:px-3">
              {t.nav.book}
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              className="grid size-10 place-items-center rounded-full text-ink transition-[background-color,transform] duration-200 hover:bg-ink/[0.07] active:scale-90 lg:hidden"
            >
              {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <PresenceGuard className="absolute inset-x-0 top-[calc(100%+0.5rem)] lg:hidden">
              <m.div
                id="mobile-menu"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.14, ease: 'easeIn' } }}
                transition={{ type: 'spring', stiffness: 520, damping: 38 }}
                style={{ transformOrigin: 'top center' }}
                className="overflow-hidden rounded-[1.75rem] border border-white/50 bg-white/85 p-2 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.45)] backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10 dark:bg-zinc-900/90"
              >
                <ul>
                  {NAV_ROUTES.map((id) => (
                    <li key={id}>
                      <Link
                        route={id}
                        onClick={() => setMenuOpen(false)}
                        aria-current={route === id ? 'page' : undefined}
                        className={cn(
                          'flex min-h-12 items-center justify-between rounded-2xl px-4 text-[1.0625rem] font-semibold tracking-[-0.015em]',
                          'transition-colors duration-200 hover:bg-ink/[0.06]',
                          route === id ? 'text-accent' : 'text-ink',
                        )}
                      >
                        {t.nav.pages[id]}
                        <ArrowRight className="size-4 text-ink-faint" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-1 grid gap-2 border-t border-line p-2 pt-3">
                  <LanguageLinks onNavigate={() => setMenuOpen(false)} />
                  <Button
                    size="lg"
                    fullWidth
                    onClick={() => {
                      setMenuOpen(false);
                      openBooking();
                    }}
                  >
                    {t.nav.bookParking}
                  </Button>
                  <Button
                    size="md"
                    variant="secondary"
                    fullWidth
                    onClick={toggleTheme}
                    leftIcon={
                      theme === 'dark' ? (
                        <Sun className="size-4" aria-hidden="true" />
                      ) : (
                        <Moon className="size-4" aria-hidden="true" />
                      )
                    }
                  >
                    {theme === 'dark' ? t.nav.lightTheme : t.nav.darkTheme}
                  </Button>
                  <Button
                    size="md"
                    variant="secondary"
                    fullWidth
                    href={`tel:${SITE.phone.e164}`}
                    leftIcon={<Phone className="size-4" aria-hidden="true" />}
                  >
                    {SITE.phone.display}
                  </Button>
                </div>
              </m.div>
            </PresenceGuard>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
