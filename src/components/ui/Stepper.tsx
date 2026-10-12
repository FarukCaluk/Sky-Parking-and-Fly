import { Check } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface StepperStep {
  id: number;
  label: string;
}

interface StepperProps {
  steps: readonly StepperStep[];
  /** 1-based id of the active step */
  current: number;
  className?: string;
}

/** Progress indicator for the booking wizard — completed steps show a check and fill the connector. */
export function Stepper({ steps, current, className }: StepperProps) {
  return (
    <ol className={cn('flex items-center', className)} aria-label="Koraci rezervacije">
      {steps.map((step, i) => {
        const done = step.id < current;
        const active = step.id === current;
        return (
          <li
            key={step.id}
            className={cn('flex items-center', i < steps.length - 1 && 'flex-1')}
            aria-current={active ? 'step' : undefined}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  'grid size-8 shrink-0 place-items-center rounded-full text-[0.8125rem] font-bold tabular transition-[background-color,color,box-shadow] duration-500 ease-apple',
                  done && 'bg-brand-600 text-white',
                  active && 'bg-brand-600 text-white shadow-[0_0_0_4px_rgb(0_113_227/0.2)]',
                  !done && !active && 'bg-ink/[0.07] text-ink-faint',
                )}
              >
                {done ? <Check className="size-4" strokeWidth={3.2} aria-hidden="true" /> : step.id}
              </span>
              <span
                className={cn(
                  'text-sm font-semibold tracking-[-0.01em] transition-colors duration-300',
                  active ? 'text-ink' : 'text-ink-faint',
                  !active && 'max-[26rem]:hidden',
                )}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span className="mx-3 h-0.5 flex-1 overflow-hidden rounded-full bg-ink/[0.08]" aria-hidden="true">
                <span
                  className={cn(
                    'block h-full origin-left rounded-full bg-brand-600 transition-transform duration-700 ease-apple',
                    done ? 'scale-x-100' : 'scale-x-0',
                  )}
                />
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
