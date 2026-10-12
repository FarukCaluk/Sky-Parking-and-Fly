import { useRef, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface SegmentedOption<T extends string> {
  value: T;
  label: ReactNode;
  icon?: ReactNode;
}

interface SegmentedControlProps<T extends string> {
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  'aria-label': string;
  size?: 'md' | 'lg';
  className?: string;
  /** `light` sits on a frosted card; `dark` is for the cinematic hero. */
  tone?: 'light' | 'dark';
}

/**
 * Radio group rendered as an Apple-style segmented control with a sliding thumb.
 * Segments are equal width so the thumb is a pure CSS transform (no layout measuring).
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  size = 'md',
  className,
  tone = 'light',
  'aria-label': ariaLabel,
}: SegmentedControlProps<T>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const index = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );

  const move = (to: number) => {
    const next = options[(to + options.length) % options.length];
    if (!next) return;
    onChange(next.value);
    refs.current[(to + options.length) % options.length]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      move(index + 1);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      move(index - 1);
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      className={cn('relative grid rounded-xl p-1', tone === 'light' ? 'bg-ink/[0.07]' : 'bg-white/10', className)}
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-y-1 left-1 rounded-[0.6rem] transition-transform duration-300 ease-apple',
          tone === 'light'
            ? 'bg-white shadow-[0_1px_3px_rgb(0_0_0/0.18),0_0_0_0.5px_rgb(0_0_0/0.04)] dark:bg-zinc-600'
            : 'bg-white/90 shadow-[0_2px_8px_rgb(0_0_0/0.35)]',
        )}
        style={{
          width: `calc((100% - 0.5rem) / ${options.length})`,
          transform: `translateX(${index * 100}%)`,
        }}
      />
      {options.map((option, i) => {
        const selected = i === index;
        return (
          <button
            key={option.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option.value)}
            className={cn(
              'relative z-10 flex items-center justify-center gap-1.5 rounded-[0.6rem] font-semibold tracking-[-0.01em]',
              'transition-colors duration-200',
              size === 'md' ? 'min-h-9 px-2 text-[0.8125rem]' : 'min-h-11 px-3 text-sm',
              selected
                ? tone === 'light'
                  ? 'text-ink'
                  : 'text-zinc-900'
                : tone === 'light'
                  ? 'text-ink-muted hover:text-ink'
                  : 'text-white/75 hover:text-white',
            )}
          >
            {option.icon}
            <span className="truncate">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
