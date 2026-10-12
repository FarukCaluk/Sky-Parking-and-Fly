import { Car, Hash, Mail, Phone, Plane, Users, User, Palette } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import type { BookingWizard } from '@/hooks/useBookingWizard';
import { normalizeFlight, normalizePlate } from '@/utils/validation';

export function StepVehicle({ wizard }: { wizard: BookingWizard }) {
  const { state, errorFor, isValid, setDriver, setVehicle, touch } = wizard;
  const { driver, vehicle } = state;

  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="mb-3 text-[0.9375rem] font-bold tracking-[-0.015em]">Vaše vozilo</legend>
        <div className="grid gap-x-4 sm:grid-cols-2">
          <Input
            label="Registarske tablice"
            name="plate"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            placeholder="A12-K-345"
            leftIcon={<Hash />}
            value={vehicle.plate}
            error={errorFor('plate')}
            valid={isValid('plate')}
            onChange={(e) => setVehicle('plate', e.target.value.toUpperCase())}
            onBlur={() => {
              setVehicle('plate', normalizePlate(vehicle.plate));
              touch('plate');
            }}
            required
          />
          <Input
            label="Marka i model"
            name="make"
            autoComplete="off"
            placeholder="Volkswagen Golf 7"
            leftIcon={<Car />}
            value={vehicle.make}
            error={errorFor('make')}
            valid={isValid('make')}
            onChange={(e) => setVehicle('make', e.target.value)}
            onBlur={() => touch('make')}
            required
          />
          <Input
            label="Boja"
            name="color"
            optional
            autoComplete="off"
            placeholder="Siva"
            leftIcon={<Palette />}
            value={vehicle.color}
            onChange={(e) => setVehicle('color', e.target.value)}
          />
          <Input
            label="Broj putnika"
            name="passengers"
            type="number"
            inputMode="numeric"
            min={1}
            max={8}
            leftIcon={<Users />}
            value={vehicle.passengers}
            error={errorFor('passengers')}
            valid={isValid('passengers')}
            onChange={(e) => setVehicle('passengers', e.target.value)}
            onBlur={() => touch('passengers')}
            required
          />
        </div>
        <Input
          label="Broj leta"
          name="flight"
          optional
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          placeholder="JU 123"
          hint="Pratimo kašnjenja leta i prilagođavamo shuttle."
          leftIcon={<Plane />}
          value={vehicle.flightNumber}
          error={errorFor('flightNumber')}
          valid={isValid('flightNumber')}
          onChange={(e) => setVehicle('flightNumber', e.target.value.toUpperCase())}
          onBlur={() => {
            setVehicle('flightNumber', normalizeFlight(vehicle.flightNumber));
            touch('flightNumber');
          }}
        />
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-[0.9375rem] font-bold tracking-[-0.015em]">Kontakt podaci</legend>
        <Input
          label="Ime i prezime"
          name="name"
          autoComplete="name"
          placeholder="Amar Hodžić"
          leftIcon={<User />}
          value={driver.fullName}
          error={errorFor('fullName')}
          valid={isValid('fullName')}
          onChange={(e) => setDriver('fullName', e.target.value)}
          onBlur={() => touch('fullName')}
          required
        />
        <div className="grid gap-x-4 sm:grid-cols-2">
          <Input
            label="E-mail"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="ime@primjer.ba"
            leftIcon={<Mail />}
            value={driver.email}
            error={errorFor('email')}
            valid={isValid('email')}
            onChange={(e) => setDriver('email', e.target.value)}
            onBlur={() => touch('email')}
            required
          />
          <Input
            label="Telefon"
            name="tel"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="061 000 000"
            leftIcon={<Phone />}
            value={driver.phone}
            error={errorFor('phone')}
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
