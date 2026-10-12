import { ArrowRight, ShieldCheck, TrendingDown } from 'lucide-react';
import { StayForm } from '@/components/booking/StayForm';
import { AnimatedPrice } from '@/components/ui/AnimatedPrice';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { GlassContainer } from '@/components/ui/GlassContainer';
import { useBooking } from '@/context/bookingContext';
import { useI18n } from '@/i18n/context';
import { useFormat } from '@/i18n/useFormat';
import { cn } from '@/utils/cn';

/** Quick booking widget: pick dates and vehicle, watch the price update, jump into the wizard. */
export function BookingWidget() {
  const { stay, quote, isBookable, openBooking } = useBooking();
  const { t } = useI18n();
  const fmt = useFormat();
  const coverLabel = t.pricing.covers[stay.cover].label;

  return (
    <GlassContainer glow className="w-full p-5 sm:p-6" aria-labelledby="widget-title">
      <header className="mb-4 flex items-center justify-between gap-3">
        <h2 id="widget-title" className="text-xl font-bold tracking-[-0.025em] text-ink sm:text-[1.375rem]">
          {t.widget.title}
        </h2>
        <Badge tone="success" className="shrink-0">
          <ShieldCheck className="size-3.5" aria-hidden="true" />
          {t.widget.noDeposit}
        </Badge>
      </header>

      <StayForm variant="widget" />

      <div className="mt-3 rounded-2xl bg-ink/[0.045] p-4">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-faint">{t.widget.estimate}</p>
            <p
              className={cn(
                'mt-1 text-[2.25rem] font-bold leading-none tracking-[-0.04em] text-ink transition-opacity duration-300 sm:text-[2.5rem]',
                !isBookable && 'opacity-40',
              )}
            >
              <AnimatedPrice value={quote.total} />
            </p>
          </div>
          <div className="min-w-0 text-right text-[0.8125rem] leading-snug text-ink-muted">
            <p className="font-semibold text-ink">{t.units.days(quote.days)}</p>
            <p>
              {coverLabel}
              {stay.extras.length > 0 && ` · ${t.units.services(stay.extras.length)}`}
            </p>
          </div>
        </div>

        <div className="mt-3 flex min-h-6 flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
          <span className="tabular">{t.widget.rateLine(fmt.km(quote.ratePerDay))}</span>
          {quote.savings > 0 && (
            <Badge tone="success">
              <TrendingDown className="size-3.5" aria-hidden="true" />
              {t.widget.saving(fmt.km(quote.savings))}
            </Badge>
          )}
        </div>
      </div>

      <Button
        size="lg"
        fullWidth
        className="mt-4"
        disabled={!isBookable}
        onClick={openBooking}
        rightIcon={<ArrowRight className="size-5" aria-hidden="true" />}
      >
        {t.widget.continue}
      </Button>
      <p className="mt-3 text-center text-xs text-ink-faint">{t.widget.footnote}</p>
    </GlassContainer>
  );
}
