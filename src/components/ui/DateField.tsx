import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useI18n } from '@/i18n/context';
import { cn } from '@/utils/cn';
import {
  addDays,
  buildMonthMatrix,
  formatDateLong,
  formatDMY,
  mondayIndex,
  parseISODate,
  shiftMonth,
  toISODate,
} from '@/utils/date';
import { Picker } from './Picker';

/** `Date#getDay()` indexes in the order the calendar is drawn: Monday first. */
const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0] as const;

/** The day the keyboard moves to for a key, or `undefined` when the key is not a calendar key. */
function targetFor(key: string, from: string, shift: boolean): string | undefined {
  const weekday = mondayIndex(from);
  switch (key) {
    case 'ArrowLeft':
      return addDays(from, -1);
    case 'ArrowRight':
      return addDays(from, 1);
    case 'ArrowUp':
      return addDays(from, -7);
    case 'ArrowDown':
      return addDays(from, 7);
    case 'Home':
      return addDays(from, -weekday);
    case 'End':
      return addDays(from, 6 - weekday);
    case 'PageUp':
      return shiftMonth(from, shift ? -12 : -1);
    case 'PageDown':
      return shiftMonth(from, shift ? 12 : 1);
    default:
      return undefined;
  }
}

interface CalendarProps {
  value: string;
  min?: string;
  rangeFrom?: string;
  onSelect: (iso: string) => void;
}

const navButton =
  'grid size-10 place-items-center rounded-[6px] border border-line text-ink-muted transition-colors ' +
  'hover:border-line-strong hover:bg-ink/[0.06] hover:text-ink disabled:pointer-events-none disabled:opacity-35';

function Calendar({ value, min, rangeFrom, onSelect }: CalendarProps) {
  const { t } = useI18n();
  const [today] = useState(() => toISODate(new Date()));
  const clamp = (iso: string) => (min !== undefined && iso < min ? min : iso);
  // `cursor` is the day that owns the keyboard focus; its month is the month on screen
  const [cursor, setCursor] = useState(() => clamp(parseISODate(value) ? value : today));
  const refocus = useRef(false);
  const bodyRef = useRef<HTMLTableSectionElement>(null);

  const { year, month } = parseISODate(cursor) ?? { year: 1970, month: 0 };
  const weeks = buildMonthMatrix(year, month);
  const previousDisabled = min !== undefined && shiftMonth(cursor, -1).slice(0, 7) < min.slice(0, 7);

  // After a key press the new day is rendered first, then focused
  useLayoutEffect(() => {
    if (!refocus.current) return;
    refocus.current = false;
    bodyRef.current?.querySelector<HTMLElement>(`[data-iso="${cursor}"]`)?.focus();
  }, [cursor]);

  const onKeyDown = (event: KeyboardEvent) => {
    const target = targetFor(event.key, cursor, event.shiftKey);
    if (!target) return;
    event.preventDefault();
    refocus.current = true;
    setCursor(clamp(target));
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setCursor(clamp(shiftMonth(cursor, -1)))}
          disabled={previousDisabled}
          aria-label={t.picker.previousMonth}
          className={navButton}
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <p aria-live="polite" className="display text-[1.375rem] leading-none">
          {t.date.monthsLong[month]} {year}
        </p>
        <button
          type="button"
          onClick={() => setCursor(clamp(shiftMonth(cursor, 1)))}
          aria-label={t.picker.nextMonth}
          className={navButton}
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>

      <table
        role="grid"
        aria-label={`${t.date.monthsLong[month]} ${year}`}
        className="w-full table-fixed border-collapse"
      >
        <thead>
          <tr>
            {WEEK_ORDER.map((weekday) => (
              <th
                key={weekday}
                scope="col"
                abbr={t.date.weekdaysLong[weekday]}
                className="label h-8 text-center text-[0.8125rem] font-semibold text-ink-faint"
              >
                {t.date.weekdaysShort[weekday]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody ref={bodyRef} onKeyDown={onKeyDown}>
          {weeks.map((week, row) => (
            <tr key={row}>
              {week.map((iso, column) => {
                if (!iso) return <td key={column} />;
                const selected = iso === value;
                const disabled = min !== undefined && iso < min;
                const inRange = rangeFrom !== undefined && iso > rangeFrom && iso < value;
                const isStart = rangeFrom !== undefined && iso === rangeFrom && !selected;
                return (
                  <td key={column} role="gridcell" aria-selected={selected} className="p-0 text-center">
                    <button
                      type="button"
                      data-iso={iso}
                      data-autofocus={iso === cursor ? '' : undefined}
                      tabIndex={iso === cursor ? 0 : -1}
                      disabled={disabled}
                      aria-label={formatDateLong(iso, t.date)}
                      aria-current={iso === today ? 'date' : undefined}
                      onClick={() => onSelect(iso)}
                      className={cn(
                        'tabular relative h-10 w-full rounded-[6px] text-[0.9375rem] font-medium transition-colors duration-150',
                        selected
                          ? 'bg-accent font-bold text-accent-ink'
                          : disabled
                            ? 'text-ink-faint/45'
                            : 'text-ink hover:bg-ink/[0.08]',
                        inRange && 'bg-accent/15',
                        isStart && 'bg-accent/35 font-bold',
                        iso === today &&
                          'after:absolute after:bottom-1 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full',
                        iso === today && (selected ? 'after:bg-accent-ink' : 'after:bg-accent-text'),
                      )}
                    >
                      {Number(iso.slice(8))}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-2 border-t border-line pt-2">
        <button
          type="button"
          onClick={() => onSelect(today)}
          disabled={min !== undefined && today < min}
          className="label h-9 rounded-[6px] px-3 text-[0.9375rem] text-accent-text transition-colors hover:bg-ink/[0.06] disabled:pointer-events-none disabled:opacity-40"
        >
          {t.picker.today}
        </button>
      </div>
    </div>
  );
}

interface DateFieldProps {
  /** ISO date, `YYYY-MM-DD` */
  value: string;
  onChange: (iso: string) => void;
  /** Earliest day that can be picked */
  min?: string;
  /** The arrival day, marked (with the days up to `value`) while choosing the departure */
  rangeFrom?: string;
  /** Accessible name, without the value */
  label: string;
  invalid?: boolean;
  className?: string;
}

/** A date shown as `20.10.2026` that opens a calendar. Never the browser's own picker. */
export function DateField({ value, onChange, min, rangeFrom, label, invalid, className }: DateFieldProps) {
  const { t } = useI18n();
  return (
    <Picker
      label={`${label}, ${formatDMY(value) || '-'}`}
      title={t.picker.chooseDate}
      icon={<CalendarDays className="size-[1.1rem] shrink-0 text-ink-faint" aria-hidden="true" />}
      display={formatDMY(value)}
      invalid={invalid}
      className={className}
    >
      {(close) => (
        <Calendar
          value={value}
          min={min}
          rangeFrom={rangeFrom}
          onSelect={(iso) => {
            onChange(iso);
            close();
          }}
        />
      )}
    </Picker>
  );
}
