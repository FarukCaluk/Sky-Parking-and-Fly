import type { ComponentPropsWithRef } from 'react';
import { cn } from '@/utils/cn';

/**
 * Visual-only iOS switch. Place it inside a parent carrying the `group` class so the knob can
 * stretch while the parent is pressed, exactly like the system control.
 */
export function SwitchGraphic({ checked, className }: { checked: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative inline-flex h-[1.9375rem] w-[3.1875rem] shrink-0 items-center rounded-full p-[0.125rem]',
        'transition-colors duration-300 ease-apple',
        checked ? 'bg-brand-600' : 'bg-ink/20',
        className,
      )}
    >
      <span
        className={cn(
          'block h-[1.6875rem] w-[1.6875rem] rounded-full bg-white shadow-[0_2px_6px_rgb(0_0_0/0.3),0_0_0_1px_rgb(0_0_0/0.04)]',
          'transition-[transform,width] duration-300 ease-apple',
          checked
            ? 'translate-x-[1.25rem] group-active:w-[2.125rem] group-active:translate-x-[0.8125rem]'
            : 'group-active:w-[2.125rem]',
        )}
      />
    </span>
  );
}

interface ToggleProps extends Omit<ComponentPropsWithRef<'button'>, 'onChange' | 'role' | 'type'> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  /** Accessible name — required because the switch itself has no visible text. */
  'aria-label'?: string;
}

export function Toggle({ checked, onCheckedChange, className, disabled, onClick, ...props }: ToggleProps) {
  return (
    <button
      {...props}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) onCheckedChange(!checked);
      }}
      className={cn('group rounded-full disabled:cursor-not-allowed disabled:opacity-45', className)}
    >
      <SwitchGraphic checked={checked} />
    </button>
  );
}
