import { AnimatePresence } from 'framer-motion';
import { Menu, Phone, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout';
import { PresenceGuard } from '@/components/ui/PresenceGuard';
import { SITE, telLink } from '@/data/site';
import { useDismiss } from '@/hooks/useDismiss';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useScrolled } from '@/hooks/useScrolled';
import { useI18n } from '@/i18n/context';
import { Link } from '@/router/Link';
import { useRoute } from '@/router/navigation';
import { NAV_ROUTES } from '@/router/routes';
import { cn } from '@/utils/cn';
import { LanguageLinks } from './LanguageLinks';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const { t } = useI18n();
  const { route } = useRoute();
  const scrolled = useScrolled(24);
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const close = () => setMenuOpen(false);
  useDismiss(rootRef, menuOpen, close);
  useFocusTrap(rootRef, menuOpen);
  useLockBodyScroll(menuOpen);

  // Only the home page opens on a dark photo; everywhere else the bar sits on the page background.
  const onPhoto = route === 'home' && !scrolled && !menuOpen;

  return (
    <div ref={rootRef}>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-300',
          scrolled || menuOpen ? 'border-line bg-canvas/90 backdrop-blur-md' : 'border-transparent bg-transparent',
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <Link
            route="home"
            aria-label={t.nav.homeAria}
            aria-current={route === 'home' ? 'page' : undefined}
            onClick={close}
            className="shrink-0"
          >
            <Logo onPhoto={onPhoto} />
          </Link>

          <nav aria-label={t.nav.aria} className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {NAV_ROUTES.map((id) => (
                <li key={id}>
                  <Link
                    route={id}
                    aria-current={route === id ? 'page' : undefined}
                    className={cn(
                      'relative block px-3 py-2 font-display text-[1.0625rem] font-semibold uppercase tracking-[0.09em] transition-colors duration-200',
                      'after:absolute after:inset-x-3 after:bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 after:ease-signal',
                      'hover:after:scale-x-100 aria-[current=page]:after:scale-x-100',
                      onPhoto
                        ? 'text-white/85 hover:text-white'
                        : 'text-ink-muted hover:text-ink aria-[current=page]:text-ink',
                    )}
                  >
                    {t.nav.pages[id]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <LanguageLinks onPhoto={onPhoto} className="hidden md:flex" />
            <ThemeToggle onPhoto={onPhoto} className="hidden md:grid" />
            <a
              href={telLink}
              aria-label={t.nav.callUs(SITE.phone.display)}
              className={cn(
                'hidden size-10 place-items-center rounded-[6px] transition-colors lg:grid',
                onPhoto
                  ? 'text-white/80 hover:bg-white/10 hover:text-white'
                  : 'text-ink-muted hover:bg-ink/[0.07] hover:text-ink',
              )}
            >
              <Phone className="size-[1.2rem]" strokeWidth={1.75} aria-hidden="true" />
            </a>
            <Button to="reservation" size="sm" onClick={close} className="ml-1">
              {t.nav.book}
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              className={cn(
                'grid size-10 place-items-center rounded-[6px] transition-[background-color,transform] duration-200 active:scale-90 xl:hidden',
                onPhoto ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-ink/[0.07]',
              )}
            >
              {menuOpen ? (
                <X className="size-6" strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <Menu className="size-6" strokeWidth={1.75} aria-hidden="true" />
              )}
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <PresenceGuard className="xl:hidden">
            <MobileMenu onClose={close} />
          </PresenceGuard>
        )}
      </AnimatePresence>
    </div>
  );
}
