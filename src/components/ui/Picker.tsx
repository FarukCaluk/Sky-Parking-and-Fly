import { X } from 'lucide-react';
import { useCallback, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useDismiss } from '@/hooks/useDismiss';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useI18n } from '@/i18n/context';
import { cn } from '@/utils/cn';

const triggerClass =
  'flex h-11 w-full min-w-0 items-center gap-2 rounded-[6px] border border-line-strong bg-canvas px-3 text-left text-base font-medium outline-none sm:text-[1.0625rem] ' +
  'transition-[border-color,box-shadow] duration-200 hover:border-ink-faint focus-visible:border-accent-text focus-visible:ring-4 focus-visible:ring-accent/25 ' +
  'aria-expanded:border-accent-text data-[invalid=true]:border-danger';

/** Placement is set from `useLayoutEffect` (data-up / data-end), so the defaults here are "below, left edge". */
const popoverClass =
  'absolute left-0 top-full z-30 mt-2 w-[19.5rem] max-w-[calc(100vw-1.5rem)] origin-top animate-pop-in rounded-[10px] border border-line-strong bg-surface p-3 text-ink outline-none ' +
  'shadow-[0_30px_80px_-24px_rgb(4_9_22/0.7)] ' +
  'data-[up=true]:bottom-full data-[up=true]:top-auto data-[up=true]:mb-2 data-[up=true]:mt-0 data-[up=true]:origin-bottom ' +
  'data-[end=true]:left-auto data-[end=true]:right-0';

const sheetClass =
  'fixed inset-x-0 bottom-0 z-[81] max-h-[88dvh] animate-sheet-in overflow-y-auto rounded-t-[16px] border-t border-line-strong bg-surface px-4 pt-3 text-ink outline-none ' +
  'pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-30px_80px_-20px_rgb(4_9_22/0.7)]';

interface PickerProps {
  /** Accessible name of the trigger, value included: "Dolazak: Datum, 20.10.2026" */
  label: string;
  /** Name of the dialog, and its heading on phones */
  title: string;
  icon: ReactNode;
  /** What the trigger shows */
  display: string;
  invalid?: boolean;
  className?: string;
  children: (close: () => void) => ReactNode;
}

/**
 * A field that opens a small dialog: a popover under (or over) the field on larger screens, a bottom sheet on
 * phones. Used by the date and time pickers, which replace the browser's own, unstyleable ones.
 */
export function Picker({ label, title, icon, display, invalid, className, children }: PickerProps) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const sheet = useMediaQuery('(max-width: 639px)');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const close = useCallback(() => setOpen(false), []);

  // The popover lives inside the wrapper, so a press on the trigger itself is not an "outside" press
  useDismiss(sheet ? panelRef : wrapperRef, open, close);
  useFocusTrap(panelRef, open);
  useLockBodyScroll(open && sheet);

  // Open upwards when there is no room below (the hero bar sits at the bottom of the screen), and hang off the
  // right edge when the panel would run past it. Measured before paint, written to the DOM to avoid a second render.
  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const panel = panelRef.current;
    if (!open || sheet || !wrapper || !panel) return;
    const box = wrapper.getBoundingClientRect();
    const roomBelow = window.innerHeight - box.bottom;
    panel.dataset.up = String(roomBelow < panel.offsetHeight + 16 && box.top > roomBelow);
    panel.dataset.end = String(box.left + panel.offsetWidth > window.innerWidth - 12);
    panel.scrollIntoView({ block: 'nearest' });
  }, [open, sheet]);

  const panel = open && (
    <div
      ref={panelRef}
      id={panelId}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      tabIndex={-1}
      className={sheet ? sheetClass : popoverClass}
    >
      {sheet && (
        <>
          <div aria-hidden="true" className="mx-auto mb-2 h-1 w-10 rounded-full bg-line-strong" />
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="display text-[1.375rem] leading-none">{title}</p>
            <button
              type="button"
              onClick={close}
              aria-label={t.picker.close}
              className="grid size-10 place-items-center rounded-[6px] text-ink-muted transition-colors hover:bg-ink/[0.07] hover:text-ink"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
        </>
      )}
      {children(close)}
    </div>
  );

  return (
    <div ref={wrapperRef} className={cn('relative min-w-0', open && !sheet && 'z-30', className)}>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={label}
        data-invalid={invalid ? 'true' : undefined}
        onClick={() => setOpen((value) => !value)}
        className={triggerClass}
      >
        {icon}
        <span className="tabular truncate">{display || '-'}</span>
      </button>
      {sheet
        ? open &&
          createPortal(
            <>
              <div aria-hidden="true" className="fixed inset-0 z-[80] animate-fade-in bg-night/60" />
              {panel}
            </>,
            document.body,
          )
        : panel}
    </div>
  );
}
