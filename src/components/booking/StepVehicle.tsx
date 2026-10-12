import { Car, Hash, Mail, Palette, Phone, Plane, User, Users } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import type { BookingWizard } from '@/hooks/useBookingWizard';
import { useI18n } from '@/i18n/context';
import { fieldMessage } from '@/i18n/helpers';
import type { DriverField, VehicleField } from '@/types';
import { normalizeFlight, normalizePlate } from '@/utils/validation';

export function StepVehicle({ wizard }: { wizard: BookingWizard }) {
  const { t } = useI18n();
  const { state, errorFor, isValid, setDriver, setVehicle, touch } = wizard;
  const { driver, vehicle } = state;
  const s = t.booking.vehicleStep;

  /** Visible error text for a field, in the active language. */
  const error = (field: DriverField | VehicleField): string | undefined => {
    const code = errorFor(field);
    return code ? fieldMessage(t, field, code) : undefined;
  };

  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="mb-3 text-[0.9375rem] font-bold tracking-[-0.015em]">{s.vehicleLegend}</legend>
        <div className="grid gap-x-4 sm:grid-cols-2">
          <Input
            label={s.plate}
            name="plate"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            placeholder={s.platePlaceholder}
            leftIcon={<Hash />}
            value={vehicle.plate}
            error={error('plate')}
            valid={isValid('plate')}
            onChange={(e) => setVehicle('plate', e.target.value.toUpperCase())}
            onBlur={() => {
              setVehicle('plate', normalizePlate(vehicle.plate));
              touch('plate');
            }}
            required
          />
          <Input
            label={s.make}
            name="make"
            autoComplete="off"
            placeholder={s.makePlaceholder}
            leftIcon={<Car />}
            value={vehicle.make}
            error={error('make')}
            valid={isValid('make')}
            onChange={(e) => setVehicle('make', e.target.value)}
            onBlur={() => touch('make')}
            required
          />
          <Input
            label={s.color}
            name="color"
            optional
            autoComplete="off"
            placeholder={s.colorPlaceholder}
            leftIcon={<Palette />}
            value={vehicle.color}
            onChange={(e) => setVehicle('color', e.target.value)}
          />
          <Input
            label={s.passengers}
            name="passengers"
            type="number"
            inputMode="numeric"
            min={1}
            max={8}
            leftIcon={<Users />}
            value={vehicle.passengers}
            error={error('passengers')}
            valid={isValid('passengers')}
            onChange={(e) => setVehicle('passengers', e.target.value)}
            onBlur={() => touch('passengers')}
            required
          />
        </div>
        <Input
          label={s.flight}
          name="flight"
          optional
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          placeholder={s.flightPlaceholder}
          hint={s.flightHint}
          leftIcon={<Plane />}
          value={vehicle.flightNumber}
          error={error('flightNumber')}
          valid={isValid('flightNumber')}
          onChange={(e) => setVehicle('flightNumber', e.target.value.toUpperCase())}
          onBlur={() => {
            setVehicle('flightNumber', normalizeFlight(vehicle.flightNumber));
            touch('flightNumber');
          }}
        />
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-[0.9375rem] font-bold tracking-[-0.015em]">{s.contactLegend}</legend>
        <Input
          label={s.fullName}
          name="name"
          autoComplete="name"
          placeholder={s.fullNamePlaceholder}
          leftIcon={<User />}
          value={driver.fullName}
          error={error('fullName')}
          valid={isValid('fullName')}
          onChange={(e) => setDriver('fullName', e.target.value)}
          onBlur={() => touch('fullName')}
          required
        />
        <div className="grid gap-x-4 sm:grid-cols-2">
          <Input
            label={s.email}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            placeholder={s.emailPlaceholder}
            leftIcon={<Mail />}
            value={driver.email}
            error={error('email')}
            valid={isValid('email')}
            onChange={(e) => setDriver('email', e.target.value)}
            onBlur={() => touch('email')}
            required
          />
          <Input
            label={s.phone}
            name="tel"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={s.phonePlaceholder}
            leftIcon={<Phone />}
            value={driver.phone}
            error={error('phone')}
            valid={isValid('phone')}
            onChange={(e) => setDriver('phone', e.target.value)}
            onBlur={() => touch('phone')}
            required
          />
        </div>
      </fieldset>
    </div>
  );
}
