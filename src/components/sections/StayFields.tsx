import { useStay } from '@/context/stayContext';
import { useI18n } from '@/i18n/context';
import { cn } from '@/utils/cn';
import { addDays, calendarDaysBetween } from '@/utils/date';

const inputClass =
  'native-input h-11 min-w-0 rounded-[6px] border border-line-strong bg-canvas px-3 text-[1.0625rem] font-medium outline-none ' +
  'transition-[border-color,box-shadow] duration-200 hover:border-ink-faint focus:border-accent-text focus:ring-4 focus:ring-accent/25 ' +
  'aria-[invalid=true]:border-danger';

/**
 * The two date-and-time groups (arrival, departure) of the shared stay. Returned as siblings so the
 * parent decides the grid they sit in: the hero bar and the reservation form both use them.
 */
export function StayFields({
  idPrefix,
  arrivalClassName,
  departureClassName,
}: {
  idPrefix: string;
  arrivalClassName?: string;
  departureClassName?: string;
}) {
  const { t } = useI18n();
  const { stay, today, stayErrors, update } = useStay();

  /** Moving the arrival moves the departure with it, so the length of the stay (and the price) stays put. */
  const changeArrival = (date: string) => {
    const length = calendarDaysBetween(stay.dropOffDate, stay.pickUpDate);
    update({ dropOffDate: date, ...(Number.isFinite(length) && date ? { pickUpDate: addDays(date, length) } : {}) });
  };

  const dropOffInvalid = stayErrors.dropOff ? true : undefined;
  const pickUpInvalid = stayErrors.pickUp || stayErrors.range ? true : undefined;

  return (
    <>
      <div role="group" aria-labelledby={`${idPrefix}-arrival`} className={cn('min-w-0', arrivalClassName)}>
        <p id={`${idPrefix}-arrival`} className="label mb-2 text-[0.9375rem] text-ink-faint">
          {t.stayBar.arrival}
        </p>
        <div className="grid grid-cols-[1fr_6.75rem] gap-2">
          <input
            type="date"
            value={stay.dropOffDate}
            min={today}
            onChange={(e) => changeArrival(e.target.value)}
            aria-label={`${t.stayBar.arrival}: ${t.stayBar.date}`}
            aria-invalid={dropOffInvalid}
            required
            className={inputClass}
          />
          <input
            type="time"
            step={1800}
            value={stay.dropOffTime}
            onChange={(e) => update({ dropOffTime: e.target.value })}
            aria-label={`${t.stayBar.arrival}: ${t.stayBar.time}`}
            aria-invalid={dropOffInvalid}
            required
            className={inputClass}
          />
        </div>
      </div>

      <div role="group" aria-labelledby={`${idPrefix}-departure`} className={cn('min-w-0', departureClassName)}>
        <p id={`${idPrefix}-departure`} className="label mb-2 text-[0.9375rem] text-ink-faint">
          {t.stayBar.departure}
        </p>
        <div className="grid grid-cols-[1fr_6.75rem] gap-2">
          <input
            type="date"
            value={stay.pickUpDate}
            min={stay.dropOffDate || today}
            onChange={(e) => update({ pickUpDate: e.target.value })}
            aria-label={`${t.stayBar.departure}: ${t.stayBar.date}`}
            aria-invalid={pickUpInvalid}
            required
            className={inputClass}
          />
          <input
            type="time"
            step={1800}
            value={stay.pickUpTime}
            onChange={(e) => update({ pickUpTime: e.target.value })}
            aria-label={`${t.stayBar.departure}: ${t.stayBar.time}`}
            aria-invalid={pickUpInvalid}
            required
            className={inputClass}
          />
        </div>
      </div>
    </>
  );
}
