import { CircleAlert } from 'lucide-react';
import { useId, type ReactNode } from 'react';
import { useI18n } from '@/i18n/context';
import { cn } from '@/utils/cn';

const control =
  'w-full rounded-[6px] border bg-surface px-4 text-base text-ink outline-none transition-[border-color,box-shadow] duration-200 ' +
  'placeholder:text-ink-faint focus:border-accent-text focus:ring-4 focus:ring-accent/25 ';

interface FieldProps {
  label: ReactNode;
  optional?: boolean;
  error?: string;
  className?: string;
  /** Render the control with the generated id so label and message are wired up. */
  children: (props: { id: string; 'aria-invalid'?: true; 'aria-describedby'?: string; className: string }) => ReactNode;
}

/** Label above, control, message below. Errors are announced and wired through `aria-describedby`. */
export function Field({ label, optional, error, className, children }: FieldProps) {
  const { t } = useI18n();
  const id = useId();
  const messageId = `${id}-message`;
  return (
    <div className={cn('min-w-0', className)}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-3 text-sm font-medium text-ink-muted">
        <span>{label}</span>
        {optional && <span className="text-xs font-normal text-ink-faint">{t.common.optional}</span>}
      </label>
      {children({
        id,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': error ? messageId : undefined,
        className: cn(control, error ? 'border-danger' : 'border-line-strong hover:border-ink-faint'),
      })}
      <p
        id={messageId}
        role={error ? 'alert' : undefined}
        className="mt-1.5 flex min-h-5 items-start gap-1.5 text-[0.8125rem] text-danger"
      >
        {error && (
          <>
            <CircleAlert className="mt-px size-4 shrink-0" aria-hidden="true" />
            {error}
          </>
        )}
      </p>
    </div>
  );
}
