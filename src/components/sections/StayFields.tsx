import { DateField } from '@/components/ui/DateField';
import { TimeField } from '@/components/ui/TimeField';
import { useStay } from '@/context/stayContext';
import { useI18n } from '@/i18n/context';
import { cn } from '@/utils/cn';
import { addDays, calendarDaysBetween } from '@/utils/date';

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

  const dropOffInvalid = Boolean(stayErrors.dropOff);
  const pickUpInvalid = Boolean(stayErrors.pickUp || stayErrors.range);

  return (
    <>
      <div role="group" aria-labelledby={`${idPrefix}-arrival`} className={cn('min-w-0', arrivalClassName)}>
        <p id={`${idPrefix}-arrival`} className="label mb-2 text-[0.9375rem] text-ink-faint">
          {t.stayBar.arrival}
        </p>
        <div className="grid grid-cols-[1fr_6.25rem] gap-2 sm:grid-cols-[1fr_6.75rem]">
          <DateField
            value={stay.dropOffDate}
            min={today}
            onChange={changeArrival}
            label={`${t.stayBar.arrival}: ${t.stayBar.date}`}
            invalid={dropOffInvalid}
          />
          <TimeField
            value={stay.dropOffTime}
            onChange={(time) => update({ dropOffTime: time })}
            label={`${t.stayBar.arrival}: ${t.stayBar.time}`}
            invalid={dropOffInvalid}
          />
        </div>
      </div>

      <div role="group" aria-labelledby={`${idPrefix}-departure`} className={cn('min-w-0', departureClassName)}>
        <p id={`${idPrefix}-departure`} className="label mb-2 text-[0.9375rem] text-ink-faint">
          {t.stayBar.departure}
        </p>
        <div className="grid grid-cols-[1fr_6.25rem] gap-2 sm:grid-cols-[1fr_6.75rem]">
          <DateField
            value={stay.pickUpDate}
            min={stay.dropOffDate || today}
            rangeFrom={stay.dropOffDate}
            onChange={(date) => update({ pickUpDate: date })}
            label={`${t.stayBar.departure}: ${t.stayBar.date}`}
            invalid={pickUpInvalid}
          />
          <TimeField
            value={stay.pickUpTime}
            onChange={(time) => update({ pickUpTime: time })}
            label={`${t.stayBar.departure}: ${t.stayBar.time}`}
            invalid={pickUpInvalid}
          />
        </div>
      </div>
    </>
  );
}
