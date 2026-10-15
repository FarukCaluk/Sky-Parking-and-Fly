import { Plus } from 'lucide-react';
import { useId, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/i18n/context';
import type { StaticRouteId } from '@/router/routes';
import { cn } from '@/utils/cn';

/** Where each answer points on, by question order. Purely navigational, the answers themselves are verbatim. */
const FOLLOW_UP: readonly (StaticRouteId | null)[] = [
  'facilities',
  'reservation',
  'pricing',
  'pricing',
  'contact',
  'shuttle',
  'facilities',
  'contact',
  'shuttle',
  'contact',
];

interface FaqListProps {
  /** Show only the first `limit` questions (the home page teaser). */
  limit?: number;
}

/** Native-feeling disclosure list: one answer open at a time, all answers present in the page for search and crawlers. */
export function FaqList({ limit }: FaqListProps) {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  const items = limit ? t.faq.items.slice(0, limit) : t.faq.items;

  return (
    <div className="border-t border-line-strong">
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${base}-q${index}`;
        const panelId = `${base}-a${index}`;
        const next = FOLLOW_UP[index] ?? null;

        return (
          <div key={item.q} className="border-b border-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="group/q flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span
                  className={cn(
                    'font-display text-[clamp(1.5rem,1.15rem+1.1vw,2.125rem)] font-bold leading-[1.08] transition-colors duration-300',
                    isOpen ? 'text-ink' : 'text-ink-muted group-hover/q:text-ink',
                  )}
                >
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'mt-0.5 grid size-9 shrink-0 place-items-center rounded-[6px] border transition-[background-color,border-color,color] duration-300 ease-signal',
                    isOpen
                      ? 'border-accent bg-accent text-accent-ink'
                      : 'border-line-strong text-ink group-hover/q:border-ink',
                  )}
                >
                  <Plus
                    className={cn('size-5 transition-transform duration-300 ease-signal', isOpen && 'rotate-45')}
                    strokeWidth={2.25}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={cn(
                'grid transition-[grid-template-rows] duration-500 ease-signal',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <div className="max-w-[62ch] pb-8 pr-14 text-[1.0625rem] text-ink-muted">
                  <p>{item.a}</p>
                  {item.list && (
                    <dl className="my-5 grid max-w-sm gap-px overflow-hidden rounded-[6px] border border-line bg-line">
                      {item.list.map((row) => (
                        <div key={row.label} className="flex items-baseline justify-between gap-6 bg-surface px-4 py-3">
                          <dt className="text-ink-muted">{row.label}</dt>
                          <dd className="display tabular text-[1.5rem] leading-none text-ink">{row.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {item.after && <p>{item.after}</p>}
                  {next && (
                    <Button to={next} variant="text" arrow className="mt-4 text-[1.0625rem]">
                      {t.nav.pages[next]}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
