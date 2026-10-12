import {
  BadgeCheck,
  Bus,
  CalendarCheck,
  Cctv,
  CarFront,
  HardHat,
  Lightbulb,
  ScanLine,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import type { StatItem, Testimonial } from '@/types';

/** Icons and structure only — every visible string comes from the i18n dictionaries. */

export const VALUE_PROPS = [
  { id: 'secure', icon: ShieldCheck },
  { id: 'cctv', icon: Cctv },
  { id: 'shuttle', icon: Bus },
  { id: 'insured', icon: BadgeCheck },
] as const satisfies readonly { id: string; icon: LucideIcon }[];

export const PROCESS_STEPS = [
  { id: 'book', icon: CalendarCheck },
  { id: 'arrive', icon: ScanLine },
  { id: 'shuttle', icon: Bus },
  { id: 'return', icon: CarFront },
] as const satisfies readonly { id: string; icon: LucideIcon }[];

export const FACILITY_FEATURES = [
  { id: 'cctv', icon: Cctv },
  { id: 'anpr', icon: ScanLine },
  { id: 'staff', icon: HardHat },
  { id: 'lighting', icon: Lightbulb },
  { id: 'insurance', icon: ShieldCheck },
  { id: 'help', icon: Wrench },
] as const satisfies readonly { id: string; icon: LucideIcon }[];

export const STATS: readonly StatItem[] = [
  { id: 'travellers', value: 52000, suffix: '+' },
  { id: 'rating', value: 4.9, suffix: '/5', decimals: 1 },
  { id: 'minutes', value: 5, suffix: ' min' },
  { id: 'recommend', value: 98, suffix: '%' },
];

export const GOOGLE_RATING = { score: 4.9, count: 1284 } as const;

export const TESTIMONIALS: readonly Testimonial[] = [
  { id: 't1', name: 'Amela Hadžić', rating: 5 },
  { id: 't2', name: 'Emir Kovačević', rating: 5 },
  { id: 't3', name: 'Lejla Mujić', rating: 5 },
  { id: 't4', name: 'Adnan Selimović', rating: 4 },
  { id: 't5', name: 'Jasmina Begić', rating: 5 },
  { id: 't6', name: 'Mirza Delić', rating: 5 },
];
