import { Clock } from 'lucide-react';
import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { useI18n } from '@/i18n/context';
import { cn } from '@/utils/cn';
import { formatHM, parseTime } from '@/utils/date';
import { Button } from './Button';
import { Picker } from './Picker';

const HOURS = Array.from({ length: 24 }, (_, hour) => hour);
const MINUTES = Array.from({ length: 12 }, (_, step) => step * 5);
const COLUMNS = 6;

interface ChoiceGroupProps {
  label: string;
  values: readonly number[];
  selected: number;
  onPick: (value: number) => void;
  /** Focus lands on the chosen value when the dialog opens */
  initialFocus?: boolean;
}

/** A grid of two-digit buttons with one tab stop and arrow-key movement. */
function ChoiceGroup({ label, values, selected, onPick, initialFocus }: ChoiceGroupProps) {
  const labelId = useId();
  const gridRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(() => Math.max(0, values.indexOf(selected)));

  const onKeyDown = (event: KeyboardEvent) => {
    const last = values.length - 1;
    let next: number;
    switch (event.key) {
      case 'ArrowLeft':
        next = Math.max(0, active - 1);
        break;
      case 'ArrowRight':
        next = Math.min(last, active + 1);
        break;
      case 'ArrowUp':
        next = active >= COLUMNS ? active - COLUMNS : active;
        break;
      case 'ArrowDown':
        next = active + COLUMNS <= last ? active + COLUMNS : active;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = last;
        break;
      default:
        return;
    }
    event.preventDefault();
    setActive(next);
    gridRef.current?.querySelectorAll('button')[next]?.focus();
  };

  return (
    <div role="group" aria-labelledby={labelId}>
      <p id={labelId} className="label mb-2 text-[0.8125rem] text-ink-faint">
        {label}
      </p>
      <div ref={gridRef} onKeyDown={onKeyDown} className="grid grid-cols-6 gap-1">
        {values.map((value, index) => (
          <button
            key={value}
            type="button"
            tabIndex={index === active ? 0 : -1}
            data-autofocus={initialFocus && index === active ? '' : undefined}
            aria-pressed={value === selected}
            onClick={() => {
              setActive(index);
              onPick(value);
            }}
            className={cn(
              'tabular h-9 rounded-[6px] text-[0.9375rem] font-medium transition-colors duration-150',
              value === selected ? 'bg-accent font-bold text-accent-ink' : 'text-ink hover:bg-ink/[0.08]',
            )}
          >
            {String(value).padStart(2, '0')}
          </button>
        ))}
      </div>
    </div>
  );
}

function TimePanel({
  value,
  onChange,
  onDone,
}: {
  value: string;
  onChange: (time: string) => void;
  onDone: () => void;
}) {
  const { t } = useI18n();
  const total = parseTime(value) ?? 10 * 60;
  const hour = Math.floor(total / 60);
  const minute = total % 60;

  return (
    <div className="grid gap-3">
      <ChoiceGroup
        label={t.picker.hours}
        values={HOURS}
        selected={hour}
        onPick={(h) => onChange(formatHM(h, minute))}
        initialFocus
      />
      {/* Minutes come last in the natural order, so picking one is the end of the interaction */}
      <ChoiceGroup
        label={t.picker.minutes}
        values={MINUTES}
        selected={minute}
        onPick={(m) => {
          onChange(formatHM(hour, m));
          onDone();
        }}
      />
      <Button size="sm" fullWidth onClick={onDone}>
        {t.picker.done}
      </Button>
    </div>
  );
}

interface TimeFieldProps {
  /** 24-hour time, `HH:mm` */
  value: string;
  onChange: (time: string) => void;
  /** Accessible name, without the value */
  label: string;
  invalid?: boolean;
  className?: string;
}

/** A time shown as `14:30` (24-hour clock) that opens an hour and minute grid. */
export function TimeField({ value, onChange, label, invalid, className }: TimeFieldProps) {
  const { t } = useI18n();
  return (
    <Picker
      label={`${label}, ${value || '-'}`}
      title={t.picker.chooseTime}
      icon={<Clock className="size-[1.1rem] shrink-0 text-ink-faint" aria-hidden="true" />}
      display={value}
      invalid={invalid}
      className={className}
    >
      {(close) => <TimePanel value={value} onChange={onChange} onDone={close} />}
    </Picker>
  );
}
