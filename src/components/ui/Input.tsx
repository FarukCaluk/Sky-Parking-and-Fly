import { Check } from 'lucide-react';
import { useId, type ComponentPropsWithRef, type ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { FieldShell } from './Field';
import { fieldControlClasses, type FieldState } from './fieldStyles';

interface InputProps extends Omit<ComponentPropsWithRef<'input'>, 'id'> {
  label: ReactNode;
  hint?: ReactNode;
  error?: string;
  /** Show the green "valid" state (only when there is no error). */
  valid?: boolean;
  optional?: boolean;
  leftIcon?: ReactNode;
  reserveMessage?: boolean;
  containerClassName?: string;
}

export function Input({
  label,
  hint,
  error,
  valid = false,
  optional,
  leftIcon,
  reserveMessage,
  containerClassName,
  className,
  ...props
}: InputProps) {
  const id = useId();
  const state: FieldState = error ? 'invalid' : valid ? 'valid' : 'idle';

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
        {leftIcon && (
          <span className="pointer-events-none absolute inset-y-0 left-3.5 grid place-items-center text-ink-faint [&>svg]:size-[1.125rem]">
            {leftIcon}
          </span>
        )}
        <input
          {...props}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={`${id}-message`}
          className={cn(
            fieldControlClasses(state),
            'h-12 px-3.5',
            leftIcon && 'pl-11',
            state === 'valid' && 'pr-10',
            className,
          )}
        />
        {state === 'valid' && (
          <span className="pointer-events-none absolute inset-y-0 right-3.5 grid place-items-center text-emerald-500">
            <Check className="size-[1.125rem]" strokeWidth={3} aria-hidden="true" />
          </span>
        )}
      </div>
    </FieldShell>
  );
}
