import { Check } from 'lucide-react';
import { useId, type ComponentPropsWithRef, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface CheckboxProps extends Omit<ComponentPropsWithRef<'input'>, 'id' | 'type'> {
  label: ReactNode;
  error?: string;
}

export function Checkbox({ label, error, className, ...props }: CheckboxProps) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="group flex cursor-pointer items-start gap-3">
        <span className="relative mt-0.5 grid size-6 shrink-0 place-items-center">
          <input
            {...props}
            id={id}
            type="checkbox"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            className={cn(
              'peer absolute inset-0 size-full cursor-pointer appearance-none rounded-[0.4rem] border bg-surface outline-none',
              'transition-[background-color,border-color,box-shadow] duration-200 ease-apple',
              'checked:border-brand-600 checked:bg-brand-600',
              'focus-visible:ring-4 focus-visible:ring-brand-500/30',
              error ? 'border-red-500/70 ring-4 ring-red-500/15' : 'border-line-strong group-hover:border-ink-faint',
            )}
          />
          <Check
            className="pointer-events-none relative size-4 scale-50 text-white opacity-0 transition-[transform,opacity] duration-200 ease-apple peer-checked:scale-100 peer-checked:opacity-100"
            strokeWidth={3.2}
            aria-hidden="true"
          />
        </span>
        <span className="text-sm leading-6 text-ink-muted">{label}</span>
      </label>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 pl-9 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
