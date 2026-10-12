import { ChevronDown } from 'lucide-react';
import { useId, type ComponentPropsWithRef, type ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { FieldShell } from './Field';
import { fieldControlClasses, type FieldState } from './fieldStyles';

interface SelectProps extends Omit<ComponentPropsWithRef<'select'>, 'id'> {
  label: ReactNode;
  hint?: ReactNode;
  error?: string;
  optional?: boolean;
  reserveMessage?: boolean;
  containerClassName?: string;
}

/** Native `<select>` (best touch UX and accessibility) wearing the same field chrome as `Input`. */
export function Select({
  label,
  hint,
  error,
  optional,
  reserveMessage,
  containerClassName,
  className,
  children,
  ...props
}: SelectProps) {
  const id = useId();
  const state: FieldState = error ? 'invalid' : 'idle';

  return (
    <FieldShell
      id={id}
      label={label}
      optional={optional}
      hint={hint}
      error={error}
      reserveMessage={reserveMessage}
      className={containerClassName}
    >
      <div className="relative">
        <select
          {...props}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={`${id}-message`}
          className={cn(
            fieldControlClasses(state),
            'h-12 cursor-pointer appearance-none pl-3.5 pr-10 tabular',
            className,
          )}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-faint"
          aria-hidden="true"
        />
      </div>
    </FieldShell>
  );
}
