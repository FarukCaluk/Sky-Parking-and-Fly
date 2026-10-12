import { ChevronDown, Sun, Warehouse } from 'lucide-react';
import { useId, useMemo, useState } from 'react';
import { DateRangePicker } from '@/components/ui/DateRangePicker';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { Select } from '@/components/ui/Select';
import { COVER_OPTIONS, MAX_STAY_DAYS } from '@/data/pricing';
import { useBooking } from '@/context/bookingContext';
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
  const coverLabel = useId();
  const vehicleLabel = useId();
  const extrasLabel = useId();
  const extrasPanel = useId();
  const [extrasOpen, setExtrasOpen] = useState(false);
  const compact = variant === 'widget';

  const coverOptions = useMemo(
    () =>
      COVER_OPTIONS.map((option) => {
        const Icon = COVER_ICONS[option.id];
        return { value: option.id, label: option.label, icon: <Icon className="size-4" aria-hidden="true" /> };
      }),
    [],
  );

  const earliestToday = nextSlot(now);
  const slotDisabled = (date: string, slot: string) => date === today && slot < earliestToday;

  return (
    <div className={className}>
      <p id={coverLabel} className={cn('mb-1.5 text-[0.8125rem] font-medium text-ink-muted', compact && 'sr-only')}>
        Vrsta parkinga
      </p>
      <SegmentedControl
        aria-label="Vrsta parkinga"
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
        error={stayErrors.dropOff ?? stayErrors.pickUp ?? stayErrors.range}
        onChange={setDateRange}
      />

      <div className="grid grid-cols-2 gap-3">
        <Select
          label="Vrijeme ostavljanja"
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
          label="Vrijeme preuzimanja"
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
        Vrsta vozila
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
              Dodatne usluge
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
            Dodatne usluge
          </span>
        </div>
      ) : (
        <>
          <p id={extrasLabel} className="mb-1.5 mt-4 text-[0.8125rem] font-medium text-ink-muted">
            Dodatne usluge
          </p>
          <ExtrasChips selected={stay.extras} onToggle={toggleExtra} labelledBy={extrasLabel} />
        </>
      )}
    </div>
  );
}
