import { ChevronDown, Sun, Warehouse } from 'lucide-react';
import { useId, useMemo, useState } from 'react';
import { DateRangePicker } from '@/components/ui/DateRangePicker';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { Select } from '@/components/ui/Select';
import { COVER_TYPES, MAX_STAY_DAYS } from '@/data/pricing';
import { useBooking } from '@/context/bookingContext';
import { stayMessage } from '@/i18n/helpers';
import { useI18n } from '@/i18n/context';
import type { CoverType } from '@/types';
import { cn } from '@/utils/cn';
import { nextSlot, TIME_SLOTS } from '@/utils/date';
import { ExtrasChips } from './ExtrasChips';
import { VehiclePicker } from './VehiclePicker';

interface StayFormProps {
  /**
   * `widget` is the compact hero version (extras tucked into a disclosure);
   * `wizard` shows every group with its label, for the booking dialog.
   */
  variant?: 'widget' | 'wizard';
  className?: string;
}

const COVER_ICONS: Record<CoverType, typeof Sun> = { open: Sun, covered: Warehouse };

/**
 * The shared "when, what, how" form — used by the hero widget and by step 1 of the booking wizard.
 * All state lives in the booking context, so every surface in the page stays in sync.
 */
export function StayForm({ variant = 'wizard', className }: StayFormProps) {
  const { stay, stayErrors, today, now, update, setDateRange, toggleExtra } = useBooking();
  const { t } = useI18n();
  const coverLabel = useId();
  const vehicleLabel = useId();
  const extrasLabel = useId();
  const extrasPanel = useId();
  const [extrasOpen, setExtrasOpen] = useState(false);
  const compact = variant === 'widget';

  const coverOptions = useMemo(
    () =>
      COVER_TYPES.map((id) => {
        const Icon = COVER_ICONS[id];
        return { value: id, label: t.pricing.covers[id].label, icon: <Icon className="size-4" aria-hidden="true" /> };
      }),
    [t],
  );

  const stayError = stayErrors.dropOff ?? stayErrors.pickUp ?? stayErrors.range;

  const earliestToday = nextSlot(now);
  const slotDisabled = (date: string, slot: string) => date === today && slot < earliestToday;

  return (
    <div className={className}>
      <p id={coverLabel} className={cn('mb-1.5 text-[0.8125rem] font-medium text-ink-muted', compact && 'sr-only')}>
        {t.stayForm.coverLabel}
      </p>
      <SegmentedControl
        aria-label={t.stayForm.coverLabel}
        options={coverOptions}
        value={stay.cover}
        onChange={(cover) => update({ cover })}
      />

      <DateRangePicker
        className="mt-4"
        dropOffDate={stay.dropOffDate}
        pickUpDate={stay.pickUpDate}
        min={today}
        maxDays={MAX_STAY_DAYS}
        dropOffInvalid={Boolean(stayErrors.dropOff)}
        pickUpInvalid={Boolean(stayErrors.pickUp)}
        error={stayError ? stayMessage(t, stayError, MAX_STAY_DAYS) : undefined}
        onChange={setDateRange}
      />

      <div className="grid grid-cols-2 gap-3">
        <Select
          label={t.stayForm.dropOffTime}
          value={stay.dropOffTime}
          onChange={(e) => update({ dropOffTime: e.target.value })}
          reserveMessage={false}
        >
          {TIME_SLOTS.map((slot) => (
            <option key={slot} value={slot} disabled={slotDisabled(stay.dropOffDate, slot)}>
              {slot}
            </option>
          ))}
        </Select>
        <Select
          label={t.stayForm.pickUpTime}
          value={stay.pickUpTime}
          onChange={(e) => update({ pickUpTime: e.target.value })}
          reserveMessage={false}
        >
          {TIME_SLOTS.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </Select>
      </div>

      <p id={vehicleLabel} className="mb-1.5 mt-3 text-[0.8125rem] font-medium text-ink-muted">
        {t.stayForm.vehicleLabel}
      </p>
      <VehiclePicker value={stay.vehicle} onChange={(vehicle) => update({ vehicle })} labelledBy={vehicleLabel} />

      {compact ? (
        <div className="mt-3">
          <button
            type="button"
            aria-expanded={extrasOpen}
            aria-controls={extrasPanel}
            onClick={() => setExtrasOpen((v) => !v)}
            className="flex min-h-10 w-full items-center justify-between rounded-xl px-1 text-[0.8125rem] font-medium text-ink-muted transition-colors hover:text-ink"
          >
            <span className="flex items-center gap-2">
              {t.stayForm.extrasLabel}
              {stay.extras.length > 0 && (
                <span className="grid min-w-5 place-items-center rounded-full bg-brand-600 px-1.5 text-[0.6875rem] font-bold leading-5 text-white">
                  {stay.extras.length}
                </span>
              )}
            </span>
            <ChevronDown
              className={cn('size-4 transition-transform duration-300 ease-apple', extrasOpen && 'rotate-180')}
              aria-hidden="true"
            />
          </button>
          <div
            id={extrasPanel}
            inert={!extrasOpen}
            className={cn(
              'grid transition-[grid-template-rows,opacity] duration-500 ease-apple',
              extrasOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
            )}
          >
            <div className="overflow-hidden">
              <ExtrasChips
                selected={stay.extras}
                onToggle={toggleExtra}
                labelledBy={extrasLabel}
                className="pb-1 pt-1"
              />
            </div>
          </div>
          <span id={extrasLabel} className="sr-only">
            {t.stayForm.extrasLabel}
          </span>
        </div>
      ) : (
        <>
          <p id={extrasLabel} className="mb-1.5 mt-4 text-[0.8125rem] font-medium text-ink-muted">
            {t.stayForm.extrasLabel}
          </p>
          <ExtrasChips selected={stay.extras} onToggle={toggleExtra} labelledBy={extrasLabel} />
        </>
      )}
    </div>
  );
}
