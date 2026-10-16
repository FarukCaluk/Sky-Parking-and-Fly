import { Check, CircleCheck, Copy, Printer } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/i18n/context';
import type { Confirmation, Row } from '@/utils/confirmation';

interface ConfirmationPanelProps {
  confirmation: Confirmation;
  /** Where the confirmation was mailed, or `null` when it could not be */
  mailedTo: string | null;
  onAnother: () => void;
}

function Rows({ rows, strong }: { rows: Row[]; strong?: boolean }) {
  return (
    <dl>
      {rows.map((row) => (
        <div
          key={`${row.label}-${row.value}`}
          className="flex items-baseline justify-between gap-6 border-b border-line py-3 first:border-t"
        >
          <dt className="text-ink-muted">{row.label}</dt>
          <dd className={strong ? 'tabular text-right font-semibold' : 'text-right font-medium'}>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Heading({ children }: { children: string }) {
  return <h3 className="label mb-3 mt-10 text-[1.0625rem] text-accent-text">{children}</h3>;
}

/**
 * What the guest sees after sending: the same confirmation that is mailed to them (`buildConfirmation`), with the
 * reservation code first, so it is still in hand when the mail is slow or in the spam folder.
 */
export const ConfirmationPanel = forwardRef<HTMLDivElement, ConfirmationPanelProps>(function ConfirmationPanel(
  { confirmation: c, mailedTo, onAnother },
  ref,
) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  return (
    <div
      ref={ref}
      tabIndex={-1}
      className="content-start self-start rounded-[10px] border border-line bg-surface p-6 outline-none sm:p-10 lg:col-span-8 lg:col-start-3 print:border-0 print:p-0"
    >
      <div role="status">
        <CircleCheck className="size-12 text-accent-text" strokeWidth={1.5} aria-hidden="true" />
        <h2 className="display text-heading mt-4">{c.title}</h2>
        <p className="mt-3 text-xl font-medium sm:text-2xl">{c.period}</p>
      </div>

      <div className="mt-8 rounded-[10px] border-2 border-dashed border-accent bg-accent/10 p-5 text-center sm:p-6">
        <p className="label text-[1rem] text-ink-muted">{c.codeLabel}</p>
        <p className="display tabular mt-2 break-all text-[clamp(2.25rem,1.4rem+3.6vw,3.75rem)] leading-none tracking-[0.06em]">
          {c.code}
        </p>
        <p className="mt-3 text-sm text-ink-muted">{c.keepCode}</p>
        <button
          type="button"
          onClick={() => void navigator.clipboard?.writeText(c.code).then(() => setCopied(true))}
          className="label mt-4 inline-flex h-10 items-center gap-2 rounded-[6px] border border-line-strong px-4 text-[0.9375rem] text-ink transition-colors hover:border-ink hover:bg-ink/[0.06] print:hidden"
        >
          {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
          {copied ? t.confirmation.copied : t.confirmation.copyCode}
        </button>
      </div>

      <p className="mt-5 text-ink-muted" role="status">
        {mailedTo ? t.confirmation.mailSent(mailedTo) : t.confirmation.mailNotSent}
      </p>

      <Heading>{c.detailsTitle}</Heading>
      <Rows rows={c.details} strong />

      <Heading>{c.priceTitle}</Heading>
      <Rows rows={c.priceLines} />
      <div className="flex items-end justify-between gap-4 pt-5">
        <p className="label text-[1rem] text-ink-faint">{c.totalLabel}</p>
        <p className="display tabular text-[clamp(2.5rem,2rem+2vw,3.5rem)] leading-none text-accent-text">{c.total}</p>
      </div>
      <p className="mt-2 text-sm text-ink-faint">{c.pricePayment}</p>

      <Heading>{c.rulesTitle}</Heading>
      <ul role="list" className="grid gap-4">
        {c.rules.map((rule) => (
          <li key={rule} className="flex gap-4">
            <span
              aria-hidden="true"
              className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent text-accent-ink"
            >
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            <span className="text-ink-muted">{rule}</span>
          </li>
        ))}
      </ul>

      <Heading>{c.contactTitle}</Heading>
      <p className="mb-3 text-ink-muted">{c.contactText}</p>
      <Rows rows={c.contact} strong />

      <div className="mt-10 flex flex-wrap gap-3 print:hidden">
        <Button
          variant="secondary"
          onClick={() => window.print()}
          leftIcon={<Printer className="size-5" aria-hidden="true" />}
        >
          {t.confirmation.print}
        </Button>
        <Button variant="secondary" onClick={onAnother}>
          {t.confirmation.another}
        </Button>
        <Button to="home">{t.confirmation.home}</Button>
      </div>
    </div>
  );
});
