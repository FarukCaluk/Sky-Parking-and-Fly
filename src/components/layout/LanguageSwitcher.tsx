import { AnimatePresence, m } from 'framer-motion';
import { ChevronDown, Globe } from 'lucide-react';
import { useRef, useState } from 'react';
import { PresenceGuard } from '@/components/ui/PresenceGuard';
import { useDismiss } from '@/hooks/useDismiss';
import { useI18n } from '@/i18n/context';
import { cn } from '@/utils/cn';
import { LanguageLinks } from './LanguageLinks';

/** Compact language menu for the navigation bar (a disclosure with real links — no JS needed to follow them). */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useDismiss(rootRef, open, () => setOpen(false));

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`${t.language.label}: ${t.language.names[lang]}`}
        className="flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-ink-muted transition-[background-color,color,transform] duration-200 hover:bg-ink/[0.07] hover:text-ink active:scale-95"
      >
        <Globe className="size-[1.125rem]" aria-hidden="true" />
        <span aria-hidden="true">{t.language.codes[lang]}</span>
        <ChevronDown
          className={cn('size-3.5 transition-transform duration-300 ease-apple', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <PresenceGuard className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-48">
            <m.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.12, ease: 'easeIn' } }}
              transition={{ type: 'spring', stiffness: 520, damping: 38 }}
              style={{ transformOrigin: 'top right' }}
              className="rounded-2xl border border-white/50 bg-white/90 p-1.5 shadow-[0_24px_60px_-16px_rgb(0_0_0/0.4)] backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10 dark:bg-zinc-900/92"
            >
              <LanguageLinks variant="list" onNavigate={() => setOpen(false)} />
            </m.div>
          </PresenceGuard>
        )}
      </AnimatePresence>
    </div>
  );
}
