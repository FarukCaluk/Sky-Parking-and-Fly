import {
  BatteryCharging,
  Car,
  CarFront,
  Droplets,
  KeyRound,
  Motorbike,
  ShieldCheck,
  Sparkles,
  Van,
  type LucideIcon,
} from 'lucide-react';
import type { ExtraId, VehicleType } from '@/types';

export const EXTRA_ICONS: Record<ExtraId, LucideIcon> = {
  wash: Droplets,
  interior: Sparkles,
  ev: BatteryCharging,
  valet: KeyRound,
  insurance: ShieldCheck,
};

export const VEHICLE_ICONS: Record<VehicleType, LucideIcon> = {
  car: Car,
  suv: CarFront,
  van: Van,
  moto: Motorbike,
};
