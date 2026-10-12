import { AnimatePresence, m } from 'framer-motion';
import { ArrowRight, Menu, Moon, Phone, Sun, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { PresenceGuard } from '@/components/ui/PresenceGuard';
import { NAV_LINKS } from '@/data/content';
import { SITE } from '@/data/site';
import { useBooking } from '@/context/bookingContext';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useDismiss } from '@/hooks/useDismiss';
import { useScrolled } from '@/hooks/useScrolled';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/utils/cn';
import { Logo } from './Logo';

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

export function Navbar() {
  const { openBooking } = useBooking();
  const { theme, toggleTheme } = useTheme();
  const scrolled = useScrolled(8);
  const active = useActiveSection(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useDismiss(rootRef, menuOpen, () => setMenuOpen(false));

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div ref={rootRef} className="relative mx-auto max-w-5xl">
        <nav
          aria-label="Glavna navigacija"
          className={cn(
            'flex h-14 items-center justify-between gap-2 rounded-full border pl-3.5 pr-2 sm:h-[3.75rem] sm:pl-4',
            'bg-white/70 backdrop-blur-xl backdrop-saturate-150 dark:bg-zinc-900/70',
            'transition-[box-shadow,border-color] duration-500 ease-apple',
            scrolled
              ? 'border-black/[0.08] shadow-[0_8px_32px_-8px_rgb(0_0_0/0.25)] dark:border-white/[0.12]'
              : 'border-white/50 shadow-[0_8px_32px_-12px_rgb(0_0_0/0.2)] dark:border-white/[0.08]',
          )}
        >
          <a href="#pocetna" aria-label="Sky Parking & Fly — početna" className="rounded-full">
            <Logo />
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? 'location' : undefined}
                  className={cn(
                    'relative rounded-full px-3.5 py-2 text-sm font-medium tracking-[-0.01em] transition-colors duration-200',
                    active === link.id ? 'bg-ink/[0.07] text-ink' : 'text-ink-muted hover:text-ink',
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <a
              href={`tel:${SITE.phone.e164}`}
              aria-label={`Nazovite nas: ${SITE.phone.display}`}
              className="hidden size-10 place-items-center rounded-full text-ink-muted transition-colors hover:bg-ink/[0.07] hover:text-ink sm:grid"
            >
              <Phone className="size-[1.125rem]" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Uključi svijetlu temu' : 'Uključi tamnu temu'}
              className="grid size-10 place-items-center rounded-full text-ink-muted transition-[background-color,color,transform] duration-200 hover:bg-ink/[0.07] hover:text-ink active:scale-90 max-[22rem]:hidden"
            >
              {theme === 'dark' ? (
                <Sun className="size-[1.125rem]" aria-hidden="true" />
              ) : (
                <Moon className="size-[1.125rem]" aria-hidden="true" />
              )}
            </button>
            <Button size="sm" onClick={openBooking} className="ml-1 px-4 max-[22rem]:px-3">
              Rezerviši
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Zatvori meni' : 'Otvori meni'}
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
                  {NAV_LINKS.map((link) => (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                          'flex min-h-12 items-center justify-between rounded-2xl px-4 text-[1.0625rem] font-semibold tracking-[-0.015em]',
                          'transition-colors duration-200 hover:bg-ink/[0.06]',
                          active === link.id ? 'text-accent' : 'text-ink',
                        )}
                      >
                        {link.label}
                        <ArrowRight className="size-4 text-ink-faint" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-1 grid gap-2 border-t border-line p-2 pt-3">
                  <Button
                    size="lg"
                    fullWidth
                    onClick={() => {
                      setMenuOpen(false);
                      openBooking();
                    }}
                  >
                    Rezerviši parking
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
                    {theme === 'dark' ? 'Svijetla tema' : 'Tamna tema'}
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
