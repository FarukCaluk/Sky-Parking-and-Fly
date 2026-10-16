import { Info, Plus } from 'lucide-react';
import { useId, useState } from 'react';
import { Container } from '@/components/ui/Layout';
import { Reveal } from '@/components/ui/Reveal';
import { EXAMPLE_DAYS, EXTRA_DAY_RATE, EXTRA_DAYS_AFTER, MIN_STAY_DAYS, PRICING_TIERS } from '@/data/pricing';
import { useI18n } from '@/i18n/context';
import { useFormat } from '@/i18n/useFormat';
import { cn } from '@/utils/cn';
import { calculateQuote } from '@/utils/pricing';

const LAST_TIER = PRICING_TIERS[PRICING_TIERS.length - 1];

/** "Detailed price list and examples": opens a list of stays with their totals, worked out by the price function. */
function PriceDetails() {
  const { t } = useI18n();
  const fmt = useFormat();
  const [open, setOpen] = useState(false);
  const buttonId = useId();
  const panelId = useId();

  return (
    <div>
      <button
        id={buttonId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="group/d label inline-flex items-center gap-3 text-[1.0625rem] text-accent-text transition-colors hover:text-ink"
      >
        <span
          aria-hidden="true"
          className={cn(
            'grid size-8 place-items-center rounded-[6px] border transition-[background-color,border-color,color] duration-300 ease-signal',
            open ? 'border-accent bg-accent text-accent-ink' : 'border-line-strong group-hover/d:border-ink',
          )}
        >
          <Plus
            className={cn('size-[1.1rem] transition-transform duration-300 ease-signal', open && 'rotate-45')}
            strokeWidth={2.25}
          />
        </span>
        {t.price.details.link}
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={!open}
        className={cn(
          'grid transition-[grid-template-rows] duration-500 ease-signal',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="mt-6 rounded-[10px] border border-line bg-surface p-5 sm:p-8">
            <h3 className="display text-sub">{t.price.details.title}</h3>
            <dl className="mt-5 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
              {EXAMPLE_DAYS.map((days) => (
                <div key={days} className="flex items-baseline justify-between gap-6 border-b border-line py-3">
                  <dt className="text-ink-muted">{t.units.days(days)}</dt>
                  <dd className="display tabular text-[1.5rem] leading-none">{fmt.km(calculateQuote(days).total)}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm text-ink-faint">{t.price.details.note}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** The price list as cards: one per band, then the flat rate past 30 days, the minimum stay and the examples. */
export function PriceCards() {
  const { t } = useI18n();
  const fmt = useFormat();

  return (
    <section aria-label={t.nav.pages.pricing} className="pb-6">
      <Container>
        <ul role="list" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {PRICING_TIERS.map((tier, index) => (
            <li key={tier.id}>
              <Reveal delay={index * 0.06} className="h-full">
                <article className="flex h-full flex-col rounded-[10px] border border-line bg-surface p-6 sm:p-7">
                  <h2 className="label text-[1.0625rem] text-ink-faint">{t.price.tiers[tier.id].label}</h2>
                  <p className="display tabular mt-4 flex items-baseline gap-3">
                    <span className="text-[clamp(4.5rem,3rem+4vw,6.5rem)] leading-[0.8] text-accent-text">
                      {tier.rate}
                    </span>
                    <span className="max-w-[6ch] text-[1.25rem] leading-none text-ink-muted">{t.price.unit}</span>
                  </p>
                  <p className="mt-5 text-ink-muted">{t.price.tiers[tier.id].hint}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-4">
          <div className="grid items-center gap-x-10 gap-y-3 rounded-[10px] border border-line-strong bg-surface-2 p-6 sm:grid-cols-[1fr_auto] sm:p-7">
            <div>
              <h2 className="label text-[1.0625rem] text-ink-faint">{t.price.extra.label}</h2>
              <p className="mt-3 max-w-[52ch] text-ink-muted">
                {t.price.extra.hint(fmt.km((LAST_TIER?.rate ?? 0) * EXTRA_DAYS_AFTER), fmt.km(EXTRA_DAY_RATE))}
              </p>
            </div>
            <p className="display tabular flex items-baseline gap-3">
              <span className="text-[clamp(4rem,3rem+3vw,5.5rem)] leading-[0.8] text-accent-text">
                {EXTRA_DAY_RATE}
              </span>
              <span className="max-w-[8ch] text-[1.25rem] leading-none text-ink-muted">{t.price.extra.unit}</span>
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6">
          <p className="flex items-center gap-3 text-ink-muted">
            <Info className="size-5 shrink-0 text-accent-text" aria-hidden="true" />
            {t.price.minStay(t.units.days(MIN_STAY_DAYS))}
          </p>
          <PriceDetails />
        </div>
      </Container>
    </section>
  );
}
