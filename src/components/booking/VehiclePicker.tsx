import { useRef, type KeyboardEvent } from 'react';
import { VEHICLES } from '@/data/pricing';
import type { VehicleType } from '@/types';
import { cn } from '@/utils/cn';
import { VEHICLE_ICONS } from './icons';

interface VehiclePickerProps {
  value: VehicleType;
  onChange: (value: VehicleType) => void;
  labelledBy?: string;
  className?: string;
}

/** Icon tiles for the vehicle class — a radio group with roving focus and arrow-key support. */
export function VehiclePicker({ value, onChange, labelledBy, className }: VehiclePickerProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const index = Math.max(
    0,
    VEHICLES.findIndex((v) => v.id === value),
  );

  const move = (to: number) => {
    const i = (to + VEHICLES.length) % VEHICLES.length;
    const next = VEHICLES[i];
    if (!next) return;
    onChange(next.id);
    refs.current[i]?.focus();
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
      aria-labelledby={labelledBy}
      onKeyDown={onKeyDown}
      className={cn('grid grid-cols-2 gap-2 min-[26rem]:grid-cols-4', className)}
    >
      {VEHICLES.map((vehicle, i) => {
        const Icon = VEHICLE_ICONS[vehicle.id];
        const selected = vehicle.id === value;
        return (
          <button
            key={vehicle.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(vehicle.id)}
            className={cn(
              'flex min-h-[4.25rem] flex-col items-center justify-center gap-1 rounded-xl border px-2 py-2.5',
              'transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-apple active:scale-95',
              selected
                ? 'border-brand-600 bg-accent-soft text-accent shadow-[0_0_0_3px_rgb(0_113_227/0.16)]'
                : 'border-line-strong bg-surface text-ink-muted hover:border-ink-faint hover:text-ink',
            )}
          >
            <Icon className="size-[1.375rem]" strokeWidth={1.8} aria-hidden="true" />
            <span className="text-[0.8125rem] font-semibold leading-none tracking-[-0.01em]">{vehicle.shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
