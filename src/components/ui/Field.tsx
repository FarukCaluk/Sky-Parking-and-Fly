import { CircleAlert } from 'lucide-react';
import type { ReactNode } from 'react';
import { useI18n } from '@/i18n/context';
import { cn } from '@/utils/cn';

interface FieldShellProps {
  id: string;
  label: ReactNode;
  optional?: boolean;
  hint?: ReactNode;
  error?: string;
  children: ReactNode;
  className?: string;
  /** Keep one line of space for the message so appearing errors never shift the layout. */
  reserveMessage?: boolean;
}

export function FieldShell({
  id,
  label,
  optional,
  hint,
  error,
  children,
  className,
  reserveMessage = true,
}: FieldShellProps) {
  const { t } = useI18n();
  const message = error ?? hint;
  return (
    <div className={cn('min-w-0', className)}>
      <label
        htmlFor={id}
        className="mb-1.5 flex items-baseline justify-between gap-2 text-[0.8125rem] font-medium text-ink-muted"
      >
        <span>{label}</span>
        {optional && <span className="text-xs font-normal text-ink-faint">{t.common.optional}</span>}
      </label>
      {children}
      <div
        id={`${id}-message`}
        aria-live="polite"
        className={cn(
          'mb-1 mt-1.5 flex items-start gap-1.5 text-xs leading-4',
          error ? 'text-red-600 dark:text-red-400' : 'text-ink-faint',
          reserveMessage && 'min-h-4',
        )}
      >
        {message && (
          <>
            {error && <CircleAlert className="mt-px size-3.5 shrink-0" aria-hidden="true" />}
            <span>{message}</span>
          </>
        )}
      </div>
    </div>
  );
}
