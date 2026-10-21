import type { PhotoId } from './photos.ts';

/**
 * The news posts, newest first: the four posts of parkingandfly.ba/novosti (dated 2026, as the business asked). Only what does not change with the
 * language lives here (date, photograph, address); the texts are in the dictionaries (`news.items` in `src/i18n`).
 *
 * Pure data with no `@/` imports, because the route table reads it and the Vite config (sitemap) reads the route
 * table. Every entry becomes a page of its own, `article-<id>`, in every language.
 */
interface NewsEntry {
  id: string;
  /** Publication date, ISO `YYYY-MM-DD` */
  date: string;
  photo: PhotoId;
  /** Path of the article in each language, at the root like the original posts (the Bosnian ones are the original addresses) */
  slugs: { bs: string; en: string; de: string };
}

export const NEWS = [
  {
    id: 'checklist',
    date: '2026-10-09',
    photo: 'newsChecklist',
    slugs: {
      bs: 'check-lista-prije-puta-5-sitnica-koje-cine-veliku-razliku',
      en: 'pre-trip-checklist-5-small-things-that-make-a-big-difference',
      de: 'checkliste-vor-der-reise-5-kleinigkeiten-mit-grosser-wirkung',
    },
  },
  {
    id: 'security',
    date: '2026-10-02',
    // The original post uses a Facebook-style graphic with the text baked in; the clean photograph of the same pole
    // translates and crops properly
    photo: 'pole',
    slugs: {
      bs: 'sigurnost-na-prvom-mjestu-sta-tacno-radimo-da-ti-auto-bude-miran',
      en: 'safety-first-what-we-do-so-you-can-relax-about-your-car',
      de: 'sicherheit-an-erster-stelle-was-wir-genau-tun',
    },
  },
  {
    id: 'transfer',
    date: '2026-09-25',
    photo: 'newsTransfer',
    slugs: {
      bs: 'transfer-do-aerodroma-korak-po-korak',
      en: 'airport-transfer-step-by-step',
      de: 'transfer-zum-flughafen-schritt-fuer-schritt',
    },
  },
  {
    id: 'longStay',
    date: '2026-09-18',
    photo: 'newsLongStay',
    slugs: {
      bs: 'dugo-parkiranje-bez-brige-11-20-i-21-dana',
      en: 'long-term-parking-without-worries-11-20-and-21-days',
      de: 'langzeitparken-ohne-sorgen-11-20-und-21-tage',
    },
  },
  {
    id: 'tips',
    date: '2026-09-11',
    photo: 'newsTips',
    slugs: {
      bs: 'top-5-savjeta-za-bezbrizno-putovanje-iz-sarajeva',
      en: 'top-5-tips-for-a-stress-free-trip-from-sarajevo',
      de: 'top-5-tipps-fuer-eine-stressfreie-reise-ab-sarajevo',
    },
  },
  {
    id: 'process',
    date: '2026-09-04',
    photo: 'newsProcess',
    slugs: {
      bs: 'kako-funkcionise-nas-servis-za-preuzimanje-i-vracanje-vozila',
      en: 'how-our-car-drop-off-and-pick-up-service-works',
      de: 'so-funktioniert-unser-service-fuer-abgabe-und-rueckgabe',
    },
  },
  {
    id: 'compare',
    date: '2026-08-28',
    photo: 'newsCompare',
    slugs: {
      bs: 'uporedili-smo-cijene-privatni-vs-zvanicni-aerodromski-parking',
      en: 'prices-compared-private-vs-official-airport-parking',
      de: 'preisvergleich-privater-und-offizieller-flughafenparkplatz',
    },
  },
  {
    id: 'why',
    date: '2026-08-21',
    photo: 'newsWhy',
    slugs: {
      bs: 'zasto-izabrati-privatni-parking-kod-aerodroma-sarajevo',
      en: 'why-choose-a-private-parking-lot-near-sarajevo-airport',
      de: 'warum-ein-privater-parkplatz-am-flughafen-sarajevo',
    },
  },
  {
    id: 'how',
    date: '2026-08-14',
    photo: 'newsHow',
    slugs: {
      bs: 'kako-zapravo-funkcionise-sky-parking-and-fly',
      en: 'how-sky-parking-and-fly-really-works',
      de: 'wie-sky-parking-and-fly-wirklich-funktioniert',
    },
  },
  {
    id: 'prices',
    date: '2026-08-07',
    photo: 'newsPrices',
    slugs: {
      bs: 'cijene-bez-iznenadjenja-sto-duze-ostajes-manje-placas',
      en: 'prices-without-surprises-the-longer-you-stay-the-less-you-pay',
      de: 'preise-ohne-ueberraschungen-je-laenger-desto-guenstiger',
    },
  },
  {
    id: 'weekend',
    date: '2026-07-31',
    photo: 'newsWeekend',
    slugs: {
      bs: 'vikend-put-bez-trosenja-zivaca-kratko-parkiranje-1-4-dana',
      en: 'weekend-trip-without-the-stress-short-term-parking',
      de: 'wochenendreise-ohne-stress-kurzzeitparken',
    },
  },
] as const satisfies readonly NewsEntry[];

export type NewsId = (typeof NEWS)[number]['id'];
