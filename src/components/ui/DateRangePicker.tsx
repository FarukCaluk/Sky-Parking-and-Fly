import { AnimatePresence, m } from 'framer-motion';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { useDismiss } from '@/hooks/useDismiss';
import { useI18n } from '@/i18n/context';
import { useFormat } from '@/i18n/useFormat';
import { PresenceGuard } from './PresenceGuard';
import { cn } from '@/utils/cn';
import { addDays, buildMonthMatrix, parseISODate } from '@/utils/date';

type Phase = 'dropOff' | 'pickUp';
interface ViewMonth {
  year: number;
  month: number;
}

interface DateRangePickerProps {
  dropOffDate: string;
  pickUpDate: string;
  onChange: (dropOffDate: string, pickUpDate: string) => void;
  /** Earliest selectable date (ISO) — normally today */
  min: string;
  /** Longest selectable stay in days */
  maxDays: number;
  dropOffInvalid?: boolean;
  pickUpInvalid?: boolean;
  /** Message shown under the field */
  error?: string;
  className?: string;
}

const viewOf = (iso: string, fallback: string): ViewMonth => {
  const parts = parseISODate(iso) ?? parseISODate(fallback);
  return parts
    ? { year: parts.year, month: parts.month }
    : { year: new Date().getFullYear(), month: new Date().getMonth() };
};

const shiftMonth = ({ year, month }: ViewMonth, delta: number): ViewMonth => {
  const d = new Date(year, month + delta, 1);
  return { year: d.getFullYear(), month: d.getMonth() };
};

const monthIndex = ({ year, month }: ViewMonth): number => year * 12 + month;

export function DateRangePicker({
  dropOffDate,
  pickUpDate,
  onChange,
  min,
  maxDays,
  dropOffInvalid,
  pickUpInvalid,
  error,
  className,
}: DateRangePickerProps) {
  const dialogId = useId();
  const { t } = useI18n();
  const fmt = useFormat();
  const dr = t.dateRange;
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>('dropOff');
  const [draftStart, setDraftStart] = useState(dropOffDate);
  const [draftEnd, setDraftEnd] = useState<string | null>(pickUpDate);
  const [hover, setHover] = useState<string | null>(null);
  const [view, setView] = useState<ViewMonth>(() => viewOf(dropOffDate, min));
  const [focusIso, setFocusIso] = useState(dropOffDate);
  const [placement, setPlacement] = useState<'bottom' | 'top'>('bottom');

  const rootRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const triggers = useRef<Record<Phase, HTMLButtonElement | null>>({ dropOff: null, pickUp: null });
  const needsFocus = useRef(false);
  const openedFrom = useRef<Phase>('dropOff');

  const maxStart = addDays(min, 365);
  const lowest = min;
  const highest = phase === 'dropOff' ? maxStart : addDays(draftStart, maxDays);
  const isDisabled = (iso: string) => iso < lowest || iso > highest;
  const clamp = (iso: string) => (iso < lowest ? lowest : iso > highest ? highest : iso);

  const close = () => {
    setOpen(false);
    triggers.current[openedFrom.current]?.focus({ preventScroll: true });
  };

  useDismiss(rootRef, open, () => setOpen(false), { escape: false });

  const openAt = (next: Phase) => {
    if (open && phase === next) {
      close();
      return;
    }
    const start = parseISODate(dropOffDate) && dropOffDate >= min ? dropOffDate : min;
    const anchor = next === 'pickUp' ? (pickUpDate > start ? pickUpDate : start) : start;

    setPhase(next);
    setDraftStart(start);
    setDraftEnd(next === 'dropOff' ? pickUpDate : null);
    setHover(null);
    setFocusIso(anchor);
    setView(viewOf(anchor, min));
    openedFrom.current = next;
    needsFocus.current = true;

    const rect = rootRef.current?.getBoundingClientRect();
    if (rect) {
      const below = window.innerHeight - rect.bottom;
      setPlacement(below < 400 && rect.top > below ? 'top' : 'bottom');
    }
    setOpen(true);
  };

  const select = (iso: string) => {
    if (isDisabled(iso)) return;
    if (phase === 'dropOff') {
      setDraftStart(iso);
      setDraftEnd(null);
      setPhase('pickUp');
      setHover(null);
      setFocusIso(iso);
      needsFocus.current = true;
    } else if (iso < draftStart) {
      // Clicking before the chosen start re-anchors the start
      setDraftStart(iso);
      setFocusIso(iso);
      needsFocus.current = true;
    } else {
      onChange(draftStart, iso);
      setOpen(false);
      triggers.current.pickUp?.focus({ preventScroll: true });
    }
  };

  const moveFocus = (target: string) => {
    const next = clamp(target);
    setFocusIso(next);
    setView((current) => {
      const v = viewOf(next, min);
      return v.year === current.year && v.month === current.month ? current : v;
    });
    needsFocus.current = true;
  };

  const onGridKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const parts = parseISODate(focusIso);
    if (!parts) return;
    const weekday = (new Date(parts.year, parts.month, parts.day).getDay() + 6) % 7; // Monday = 0
    let target: string;
    switch (event.key) {
      case 'ArrowLeft':
        target = addDays(focusIso, -1);
        break;
      case 'ArrowRight':
        target = addDays(focusIso, 1);
        break;
      case 'ArrowUp':
        target = addDays(focusIso, -7);
        break;
      case 'ArrowDown':
        target = addDays(focusIso, 7);
        break;
      case 'Home':
        target = addDays(focusIso, -weekday);
        break;
      case 'End':
        target = addDays(focusIso, 6 - weekday);
        break;
      case 'PageUp':
        target = addDays(focusIso, -30);
        break;
      case 'PageDown':
        target = addDays(focusIso, 30);
        break;
      default:
        return;
    }
    event.preventDefault();
    moveFocus(target);
  };

  // Move DOM focus to the active day after keyboard navigation / opening
  useEffect(() => {
    if (!open || !needsFocus.current) return;
    needsFocus.current = false;
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${focusIso}"]`)?.focus({ preventScroll: true });
  }, [open, focusIso, view]);

  const weeks = buildMonthMatrix(view.year, view.month);
  const canGoPrev = monthIndex(view) > monthIndex(viewOf(lowest, lowest));
  const canGoNext = monthIndex(view) < monthIndex(viewOf(highest, highest));
  const today = min;
  const rangeEnd = draftEnd ?? (phase === 'pickUp' && hover && hover >= draftStart ? hover : null);
  const firstEnabledInView = weeks.flat().find((iso): iso is string => iso !== null && !isDisabled(iso));
  const tabbable = weeks.flat().includes(focusIso) && !isDisabled(focusIso) ? focusIso : firstEnabledInView;

  const segment = (p: Phase, label: string, date: string, invalid?: boolean) => (
    <button
      ref={(el) => {
        triggers.current[p] = el;
      }}
      type="button"
      aria-haspopup="dialog"
      aria-expanded={open && phase === p}
      aria-controls={open ? dialogId : undefined}
      onClick={() => openAt(p)}
      className={cn(
        'group relative flex min-h-[3.75rem] flex-col items-start justify-center rounded-xl px-3.5 text-left outline-none',
        'transition-[background-color,box-shadow] duration-200 ease-apple',
        'hover:bg-ink/[0.04] focus-visible:ring-4 focus-visible:ring-brand-500/25',
        open && phase === p && 'bg-accent-soft ring-2 ring-brand-500/60',
        invalid && 'bg-red-500/[0.06] ring-2 ring-red-500/50',
      )}
    >
      <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-ink-faint">{label}</span>
      <span className="mt-0.5 flex items-center gap-1.5 text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink tabular">
        <CalendarDays className="size-4 text-accent" aria-hidden="true" />
        {parseISODate(date) ? fmt.dateShort(date) : dr.choose}
      </span>
    </button>
  );

  return (
    <div ref={rootRef} className={className}>
      <div className="relative">
        <div className="grid grid-cols-2 gap-1 rounded-2xl border border-line-strong bg-surface p-1">
          {segment('dropOff', dr.dropOff, dropOffDate, dropOffInvalid)}
          {segment('pickUp', dr.pickUp, pickUpDate, pickUpInvalid)}
        </div>

        <AnimatePresence>
          {open && (
            <PresenceGuard
              className={cn(
                'absolute left-1/2 z-50 w-[min(21rem,calc(100vw-2rem))] -translate-x-1/2',
                placement === 'bottom' ? 'top-full mt-2' : 'bottom-full mb-2',
              )}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  event.preventDefault();
                  event.stopPropagation();
                  close();
                }
              }}
            >
              <m.div
                id={dialogId}
                role="dialog"
                aria-label={dr.dialog}
                initial={{ opacity: 0, y: placement === 'bottom' ? -8 : 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: placement === 'bottom' ? -6 : 6,
                  scale: 0.98,
                  transition: { duration: 0.14, ease: 'easeIn' },
                }}
                transition={{ type: 'spring', stiffness: 520, damping: 38 }}
                style={{ transformOrigin: placement === 'bottom' ? 'top center' : 'bottom center' }}
                className="rounded-3xl border border-line bg-surface p-3 text-ink shadow-[0_30px_80px_-20px_rgb(0_0_0/0.45)] dark:bg-zinc-900"
              >
                <div className="mb-1 flex items-center justify-between px-1">
                  <button
                    type="button"
                    aria-label={dr.prevMonth}
                    disabled={!canGoPrev}
                    onClick={() => setView((v) => shiftMonth(v, -1))}
                    className="grid size-10 place-items-center rounded-full text-ink-muted transition-colors hover:bg-ink/[0.06] hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <ChevronLeft className="size-5" aria-hidden="true" />
                  </button>
                  <p className="text-[0.9375rem] font-semibold capitalize tracking-[-0.01em]" aria-live="polite">
                    {fmt.monthTitle(view.year, view.month)}
                  </p>
                  <button
                    type="button"
                    aria-label={dr.nextMonth}
                    disabled={!canGoNext}
                    onClick={() => setView((v) => shiftMonth(v, 1))}
                    className="grid size-10 place-items-center rounded-full text-ink-muted transition-colors hover:bg-ink/[0.06] hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <ChevronRight className="size-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="grid grid-cols-7 text-center" aria-hidden="true">
                  {t.date.calendarHeader.map((d) => (
                    <span
                      key={d}
                      className="py-1.5 text-[0.6875rem] font-semibold uppercase tracking-wide text-ink-faint"
                    >
                      {d}
                    </span>
                  ))}
                </div>

                <div
                  ref={gridRef}
                  role="grid"
                  aria-label={fmt.monthTitle(view.year, view.month)}
                  onKeyDown={onGridKeyDown}
                >
                  {weeks.map((week, w) => (
                    <div key={w} role="row" className="grid grid-cols-7">
                      {week.map((iso, col) => {
                        if (!iso) return <span key={`blank-${col}`} role="gridcell" className="h-11" />;
                        const disabled = isDisabled(iso);
                        const isStart = iso === draftStart;
                        const isEnd = rangeEnd === iso && iso > draftStart;
                        const hasRange = rangeEnd !== null && rangeEnd > draftStart;
                        const inRange = hasRange && iso > draftStart && iso < rangeEnd;
                        const selected = isStart || isEnd;
                        return (
                          <div key={iso} role="gridcell" className="relative grid h-11 place-items-center">
                            {(inRange || (isStart && hasRange) || isEnd) && (
                              <span
                                aria-hidden="true"
                                className={cn(
                                  'absolute inset-y-1 bg-brand-600/12 dark:bg-brand-500/20',
                                  inRange && 'inset-x-0',
                                  inRange && col === 0 && 'rounded-l-full',
                                  inRange && col === 6 && 'rounded-r-full',
                                  isStart && 'left-1/2 right-0',
                                  isEnd && 'left-0 right-1/2',
                                )}
                              />
                            )}
                            <button
                              type="button"
                              data-date={iso}
                              disabled={disabled}
                              tabIndex={iso === tabbable ? 0 : -1}
                              aria-label={`${fmt.dateLong(iso)}${iso === today ? ` (${dr.today})` : ''}`}
                              aria-pressed={selected}
                              onClick={() => select(iso)}
                              onPointerEnter={() => setHover(iso)}
                              className={cn(
                                'relative grid size-10 place-items-center rounded-full text-sm tabular outline-none',
                                'transition-[background-color,color,transform] duration-150 ease-apple',
                                'focus-visible:ring-4 focus-visible:ring-brand-500/35',
                                selected
                                  ? 'bg-brand-600 font-semibold text-white shadow-[0_4px_12px_-2px_rgb(0_113_227/0.55)]'
                                  : disabled
                                    ? 'cursor-not-allowed text-ink-faint/45'
                                    : 'hover:bg-ink/[0.08] active:scale-90',
                                !selected && !disabled && iso === today && 'font-bold text-accent',
                              )}
                            >
                              {parseISODate(iso)?.day}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                <p className="mt-2 flex min-h-9 items-center justify-center rounded-xl bg-ink/[0.04] px-3 text-center text-xs font-medium text-ink-muted">
                  {phase === 'dropOff'
                    ? dr.hintDropOff
                    : hover && hover >= draftStart
                      ? dr.hintPickUpHover(fmt.dateShort(hover))
                      : dr.hintPickUp}
                </p>
              </m.div>
            </PresenceGuard>
          )}
        </AnimatePresence>
      </div>

      <div
        aria-live="polite"
        className={cn(
          'mt-1.5 min-h-4 text-xs leading-4',
          error ? 'text-red-600 dark:text-red-400' : 'text-transparent',
        )}
      >
        {error}
      </div>
    </div>
  );
}
