import { AnimatePresence, m } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useId, useRef, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useI18n } from '@/i18n/context';
import { cn } from '@/utils/cn';
import { PresenceGuard } from './PresenceGuard';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  /** Rendered under the title (progress stepper, summary chips …) */
  headerExtra?: ReactNode;
  footer?: ReactNode;
  size?: 'md' | 'lg';
  /** Ref to the scrollable body — lets a wizard reset the scroll position between steps. */
  bodyRef?: RefObject<HTMLDivElement | null>;
  children: ReactNode;
}

/**
 * Accessible dialog: portal, focus trap, scroll lock, Escape to close, restores focus.
 * Bottom sheet on phones, centred glass dialog from `sm` upwards.
 */
export function Modal(props: ModalProps) {
  if (typeof document === 'undefined') return null;
  return createPortal(
    <AnimatePresence>{props.open && <ModalLayer key="modal" {...props} />}</AnimatePresence>,
    document.body,
  );
}

function ModalLayer({ onClose, title, eyebrow, headerExtra, footer, size = 'md', bodyRef, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const { t } = useI18n();

  useLockBodyScroll(true);
  useFocusTrap(panelRef, true);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // Nested popovers call preventDefault/stopPropagation on their own Escape
      if (event.key === 'Escape' && !event.defaultPrevented) onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <PresenceGuard className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6">
      <m.div
        aria-hidden="true"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />
      <m.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        initial={{ opacity: 0, y: 56, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 28, scale: 0.99, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } }}
        transition={{ type: 'spring', stiffness: 380, damping: 36, mass: 0.9 }}
        className={cn(
          'relative flex max-h-[92dvh] w-full flex-col rounded-t-[1.75rem] outline-none sm:max-h-[min(90dvh,54rem)] sm:rounded-[1.75rem]',
          'border border-white/60 bg-white/90 backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10 dark:bg-zinc-900/92',
          'shadow-[0_40px_120px_-20px_rgb(0_0_0/0.55)]',
          size === 'md' ? 'sm:max-w-xl' : 'sm:max-w-2xl',
        )}
      >
        <div className="mx-auto mt-2.5 h-1 w-9 shrink-0 rounded-full bg-ink/15 sm:hidden" aria-hidden="true" />

        <div className="flex shrink-0 items-start justify-between gap-4 px-5 pb-4 pt-4 sm:px-8 sm:pt-7">
          <div className="min-w-0">
            {eyebrow && <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">{eyebrow}</p>}
            <h2 id={titleId} className="text-[1.375rem] font-bold leading-tight tracking-[-0.025em] sm:text-2xl">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.common.close}
            className="-mr-1 grid size-10 shrink-0 place-items-center rounded-full bg-ink/[0.06] text-ink-muted transition-[background-color,transform] duration-200 ease-apple hover:bg-ink/[0.12] hover:text-ink active:scale-90"
          >
            <X className="size-[1.125rem]" strokeWidth={2.4} aria-hidden="true" />
          </button>
        </div>

        {headerExtra && <div className="shrink-0 px-5 pb-4 sm:px-8">{headerExtra}</div>}

        <div
          ref={bodyRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain border-t border-line px-5 py-5 sm:px-8"
        >
          {children}
        </div>

        {footer && (
          <div className="shrink-0 border-t border-line px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-8 sm:pb-6">
            {footer}
          </div>
        )}
      </m.div>
    </PresenceGuard>
  );
}
