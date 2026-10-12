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

export interface NavLink {
  id: string;
  label: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { id: 'kako-radi', label: 'Kako radi' },
  { id: 'cijene', label: 'Cijene' },
  { id: 'objekat', label: 'Objekat' },
  { id: 'recenzije', label: 'Recenzije' },
  { id: 'kontakt', label: 'Kontakt' },
];

export interface ValueProp {
  icon: LucideIcon;
  title: string;
  text: string;
}

export const VALUE_PROPS: readonly ValueProp[] = [
  { icon: ShieldCheck, title: 'Čuvan parking', text: 'Ograđen prostor s osobljem 0–24h' },
  { icon: Cctv, title: 'Video nadzor 24/7', text: '48 kamera, snimci 30 dana' },
  { icon: Bus, title: 'Besplatan shuttle', text: 'Do terminala za 5 minuta' },
  { icon: BadgeCheck, title: 'Osigurana vozila', text: 'Osiguranje od odgovornosti' },
];

export interface ProcessStep {
  icon: LucideIcon;
  title: string;
  text: string;
}

export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    icon: CalendarCheck,
    title: 'Rezervišite online',
    text: 'Odaberite termin i usluge — cijenu vidite odmah, a potvrda stiže za nekoliko sekundi.',
  },
  {
    icon: ScanLine,
    title: 'Dolazak bez čekanja',
    text: 'Kamera prepoznaje vaše tablice i otvara rampu. Naš radnik vas usmjerava na rezervisano mjesto.',
  },
  {
    icon: Bus,
    title: 'Shuttle do terminala',
    text: 'Besplatan prijevoz sa prtljagom — svega pet minuta do prijave za let.',
  },
  {
    icon: CarFront,
    title: 'Povratak bez stresa',
    text: 'Javite nam se nakon slijetanja. Shuttle vas čeka, a vozilo je tamo gdje ste ga ostavili.',
  },
];

export interface FacilityFeature {
  icon: LucideIcon;
  title: string;
  text: string;
}

export const FACILITY_FEATURES: readonly FacilityFeature[] = [
  {
    icon: Cctv,
    title: 'Video nadzor 24/7',
    text: '48 HD kamera pokriva svaki metar parkinga. Snimci se arhiviraju 30 dana.',
  },
  {
    icon: ScanLine,
    title: 'Automatske rampe i ANPR',
    text: 'Prepoznavanje tablica otvara rampu za nekoliko sekundi — bez papira i bez gužve.',
  },
  {
    icon: HardHat,
    title: 'Osoblje na licu mjesta',
    text: 'Obezbjeđenje i radnik u svakoj smjeni, uključujući noći, praznike i vikende.',
  },
  {
    icon: Lightbulb,
    title: 'Rasvjeta i ograda',
    text: 'LED osvjetljenje cijelog prostora i ograda visine 2,4 m sa senzorima pokreta.',
  },
  {
    icon: ShieldCheck,
    title: 'Osiguranje vozila',
    text: 'Osiguranje od odgovornosti je uključeno, a kasko do 50.000 KM dodajete po želji.',
  },
  {
    icon: Wrench,
    title: 'Pomoć na licu mjesta',
    text: 'Pokretanje akumulatora i napuhavanje guma — besplatno, kad god vam zatreba.',
  },
];

export const STATS: readonly StatItem[] = [
  { id: 'travellers', value: 52000, suffix: '+', label: 'ispraćenih putnika' },
  { id: 'rating', value: 4.9, suffix: '/5', decimals: 1, label: 'prosječna ocjena' },
  { id: 'minutes', value: 5, suffix: ' min', label: 'do terminala' },
  { id: 'recommend', value: 98, suffix: '%', label: 'bi nas preporučilo' },
];

export const GOOGLE_RATING = { score: '4,9', count: '1.284' } as const;

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: 't1',
    name: 'Amela Hadžić',
    city: 'Sarajevo',
    rating: 5,
    date: 'septembar 2026.',
    trip: 'Istanbul',
    quote:
      'Prvi put smo ostavili auto na deset dana i nijednom nismo pomislili na njega. Shuttle je stigao za tri minute, a vozilo nas je dočekalo čisto i na istom mjestu.',
  },
  {
    id: 't2',
    name: 'Emir Kovačević',
    city: 'Zenica',
    rating: 5,
    date: 'august 2026.',
    trip: 'Frankfurt',
    quote:
      'Rezervacija je trajala manje od minute. Rampa me prepoznala po tablicama, bez ikakvih papira. Ovako bi trebalo svugdje da izgleda.',
  },
  {
    id: 't3',
    name: 'Lejla Mujić',
    city: 'Tuzla',
    rating: 5,
    date: 'januar 2026.',
    trip: 'Beč',
    quote:
      'Natkriveni sektor je spas zimi. Poslije sedmice u Beču auto je bio bez snijega i leda, a plaćanje pri preuzimanju je prošlo bez ikakvih iznenađenja.',
  },
  {
    id: 't4',
    name: 'Adnan Selimović',
    city: 'Mostar',
    rating: 4,
    date: 'juli 2026.',
    trip: 'Dubrovnik',
    quote:
      'Odlična usluga i ljubazno osoblje. U jutarnjoj špici shuttle je čekao par minuta, ali nas je s kuferima ukrcao i stigli smo na vrijeme.',
  },
  {
    id: 't5',
    name: 'Jasmina Begić',
    city: 'Travnik',
    rating: 5,
    date: 'juni 2026.',
    trip: 'Minhen',
    quote:
      'Putujemo dva puta godišnje i ovo nam je postao stalni izbor. Javimo se čim sletimo, a shuttle nas već čeka ispred terminala.',
  },
  {
    id: 't6',
    name: 'Mirza Delić',
    city: 'Bihać',
    rating: 5,
    date: 'oktobar 2026.',
    trip: 'Cirih',
    quote:
      'Vozim kombi pa je bilo teško naći sigurno mjesto. Ovdje je cijena fer, PDV je uključen i nema skrivenih troškova. Preporuka.',
  },
];
