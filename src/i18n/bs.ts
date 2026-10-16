/**
 * Bosnian (default language) - the source of truth for the shape of every dictionary.
 * `en.ts` and `de.ts` are typed as `Messages`, so a missing or extra key is a compile error.
 *
 * Facts (prices, distances, opening hours, FAQ) come from parkingandfly.ba.
 */

import type { NewsId } from '../data/news.ts';

/** Bosnian plural: 1 dan / 2-4 dana / 5+ dana (21 dan, 22 dana, 11 dana). */
function pluralBs(count: number, one: string, few: string, many: string): string {
  const abs = Math.abs(count);
  const mod10 = abs % 10;
  const mod100 = abs % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

/** One question of the FAQ. `list` and `after` exist only on the price answer. */
export interface FaqItem {
  q: string;
  a: string;
  list?: readonly { label: string; value: string }[];
  after?: string;
}

/** One block of a news article. `**bold**` marks inline emphasis. */
export type NewsBlock =
  | { type: 'heading'; text: string }
  | { type: 'p'; text: string }
  | { type: 'checks'; items: readonly string[] }
  | { type: 'steps'; items: readonly string[] };

export interface NewsArticleText {
  title: string;
  /** One or two sentences: shown on the card and used as the meta description */
  excerpt: string;
  /** What the photograph shows, for screen readers */
  alt: string;
  blocks: readonly NewsBlock[];
}

/**
 * The four latest posts of parkingandfly.ba/novosti. Wording follows the originals (including their friendly "ti"
 * voice); only punctuation was brought in line with the rest of the site (no long dashes) and the lists were tidied.
 */
const newsItems: Record<NewsId, NewsArticleText> = {
  checklist: {
    title: 'Check-lista prije puta: 5 sitnica koje čine veliku razliku',
    excerpt: 'Kratke stvari prije nego pređeš u transfer: brave i prozori, vrijednosti, fotka stanja, gume i tajming.',
    alt: 'Čovjek u odijelu bilježi stanje vozila pored retrovizora',
    blocks: [
      { type: 'heading', text: 'Check-lista prije puta: ostavi auto bez brige' },
      { type: 'p', text: 'Kratke stvari prije nego pređeš u transfer:' },
      {
        type: 'checks',
        items: [
          '**Brave i prozori:** provjeri još jednom, mir u glavi za 30 sekundi.',
          '**Vrijednosti:** skloni s vidljivog mjesta (torbice, kablovi, držači).',
          '**Fotka stanja:** jedna slika telefonom čuva živce.',
          '**Gume i tečnosti** (za duže boravke): da se po povratku odmah možeš voziti.',
          '**Tajming:** dođi 15-20 min ranije, ostatak ide brzo, vozač je tu.',
        ],
      },
      { type: 'p', text: 'Mi odvozimo do ulaza i preuzimamo logistiku; ti ulaziš u avion bez žurbe.' },
    ],
  },
  security: {
    title: 'Sigurnost na prvom mjestu: šta tačno radimo da ti auto bude miran',
    excerpt: 'Parking je ograđen, osvijetljen i pod video-nadzorom. Pristup imaju samo klijenti i osoblje.',
    alt: 'Plava oznaka Privatni parking i stub s video nadzornom kamerom i reflektorom',
    blocks: [
      { type: 'heading', text: 'Sigurnost vozila: nadzor 24/7 i ograđen prostor' },
      {
        type: 'p',
        text: 'Parking je ograđen, osvijetljen i pod video-nadzorom. Pristup imaju samo klijenti i osoblje. Imamo jasna pravila ulaza/izlaza i evidenciju kretanja.',
      },
      {
        type: 'p',
        text: 'Ne držimo vozila “negdje pored” niti radimo improvizacije. Ako želiš, pri preuzimanju auta uradimo kratak vizuelni pregled zajedno: da kreneš mirno i vratiš se još mirnije.',
      },
      {
        type: 'p',
        text: 'Zimi čistimo pristupe, ljeti pratimo gužve; cilj je da sve ide brzo, ali nikad nauštrb sigurnosti. Transfer radi i kad je gužva i kad je zora.',
      },
    ],
  },
  transfer: {
    title: 'Transfer do aerodroma, korak po korak',
    excerpt:
      'Stigneš na parking i parkiraš (ili predaš ključ), mi pomažemo s prtljagom, a transfer do ulaza u terminal traje oko jedan minut.',
    alt: 'Putnik u odijelu s torbom ispred aviona',
    blocks: [
      { type: 'heading', text: 'Besplatan transfer do aerodroma: kako izgleda' },
      {
        type: 'steps',
        items: [
          'Stigneš na parking i parkiraš (ili predaš ključ, kako ti je lakše).',
          'Pomažemo s prtljagom: koferi, kolica, dječije sjedalice.',
          'Transfer do ulaza u terminal traje oko jedan minut.',
          'Po povratku, čim preuzmeš prtljag, pošalji poruku ili nazovi.',
          'Naš vozač dolazi po tebe i vraća te do auta.',
        ],
      },
      {
        type: 'p',
        text: 'Sve je uključeno u cijenu parkinga. Bez taksija, bez cimanja prijatelja u 4 ujutro i bez lutanja po kružnim tokovima.',
      },
    ],
  },
  longStay: {
    title: 'Dugo parkiranje bez brige: 11-20 i 21+ dana',
    excerpt:
      'Za duže boravke cijena pada na 7 KM/dan (11-20 dana) i 6 KM/dan (21-30 dana), a svaki dan nakon 30. košta 5 KM.',
    alt: 'Automobili parkirani na šljunčanom parkingu',
    blocks: [
      {
        type: 'p',
        text: 'Za duže boravke (poslovno, posjeta porodici, produženi odmor) cijena pada na **7 KM/dan** (11-20 dana) i **6 KM/dan** (21-30 dana), a svaki dan nakon 30. košta **5 KM**.',
      },
      {
        type: 'p',
        text: 'Parking je ograđen i osvijetljen, uz video-nadzor i prisustvo ekipe. Ulazi/izlazi su u evidenciji: sve uredno i provjerljivo.',
      },
      {
        type: 'p',
        text: 'Treba ti **račun na firmu** ili posebna potvrda? Izdajemo odmah. Ako se povratak pomjeri, **produžimo rezervaciju**. Auto ostaje gdje si ga ostavio, a **transfer** te čeka kad stigneš.',
      },
    ],
  },
};

export const bs = {
  meta: {
    siteName: 'Sky Parking & Fly',
    ogLocale: 'bs_BA',
    pages: {
      home: {
        title: 'Sky Parking & Fly | Privatni parking 800 m od aerodroma Sarajevo',
        description:
          'Ograđen, osvijetljen i video nadziran parking kod aerodroma Sarajevo. Besplatan transfer do terminala i nazad, od 6 KM po danu.',
      },
      pricing: {
        title: 'Cijene parkinga | Sky Parking & Fly',
        description:
          'Parking kod aerodroma Sarajevo: 9 KM po danu (2-4 dana), 8 KM (5-10), 7 KM (11-20), 6 KM (21-30), nakon 30. dana 5 KM po danu. Transfer i nadzor uključeni.',
      },
      facilities: {
        title: 'Objekat i sigurnost | Sky Parking & Fly',
        description:
          'Ograđen i osvijetljen parking, video nadzor 24/7 i osoblje na licu mjesta. Pogledajte kako izgleda naš parking kod aerodroma Sarajevo.',
      },
      shuttle: {
        title: 'Besplatan transfer do terminala | Sky Parking & Fly',
        description:
          'Oko minut vožnje do ulaza u terminal, uz pomoć s prtljagom. Po povratku pošaljite poruku ili nas nazovite i vozač dolazi po vas.',
      },
      reviews: {
        title: 'Recenzije putnika | Sky Parking & Fly',
        description: 'Šta kažu putnici koji su ostavili auto na našem parkingu kod aerodroma Sarajevo.',
      },
      news: {
        title: 'Novosti | Sky Parking & Fly',
        description:
          'Savjeti i novosti o parkiranju kod aerodroma Sarajevo: check-lista prije puta, sigurnost vozila, transfer i duži boravci.',
      },
      faq: {
        title: 'Česta pitanja | Sky Parking & Fly',
        description:
          'Odgovori na najčešća pitanja o privatnom parkiranju kod aerodroma Sarajevo: sigurnost, rezervacija, plaćanje, cijene, transfer, ključevi i kašnjenje leta.',
      },
      contact: {
        title: 'Kontakt | Sky Parking & Fly',
        description:
          'Nazovite nas ili pošaljite poruku na WhatsApp ili Viber. Dr Atifa Purivatre 38, Sarajevo. Otvoreno 24/7, uključujući praznike.',
      },
      reservation: {
        title: 'Rezervacija parkinga | Sky Parking & Fly',
        description:
          'Odaberite datume, pogledajte okvirnu cijenu i pošaljite rezervaciju putem WhatsAppa, Vibera ili e-maila.',
      },
      confirmed: {
        title: 'Uspješna rezervacija | Sky Parking & Fly',
        description: 'Vaša rezervacija je primljena. Ovdje su kod rezervacije i svi detalji.',
      },
      terms: {
        title: 'Uslovi korištenja | Sky Parking & Fly',
        description: 'Uslovi korištenja usluge parkinga i transfera.',
      },
      privacy: {
        title: 'Politika privatnosti | Sky Parking & Fly',
        description: 'Kako postupamo s podacima koje nam pošaljete.',
      },
      cookies: {
        title: 'Politika kolačića | Sky Parking & Fly',
        description: 'Šta ova stranica pohranjuje u vašem pregledniku.',
      },
      notFound: {
        title: 'Stranica nije pronađena | Sky Parking & Fly',
        description: 'Tražena stranica ne postoji.',
      },
    },
  },

  common: {
    skipToContent: 'Preskoči na sadržaj',
    close: 'Zatvori',
    optional: 'Nije obavezno',
  },

  language: {
    label: 'Jezik',
    names: { bs: 'Bosanski', en: 'English', de: 'Deutsch' },
    codes: { bs: 'BS', en: 'EN', de: 'DE' },
    switchTo: (name: string) => `Promijeni jezik: ${name}`,
  },

  nav: {
    aria: 'Glavna navigacija',
    homeAria: 'Sky Parking & Fly, početna',
    pages: {
      home: 'Početna',
      pricing: 'Cijene',
      facilities: 'Objekat',
      shuttle: 'Shuttle',
      reviews: 'Recenzije',
      news: 'Novosti',
      faq: 'Pitanja',
      contact: 'Kontakt',
      reservation: 'Rezervacija',
      confirmed: 'Uspješna rezervacija',
      terms: 'Uslovi korištenja',
      privacy: 'Politika privatnosti',
      cookies: 'Politika kolačića',
    },
    book: 'Rezerviši',
    callUs: (phone: string) => `Nazovite nas: ${phone}`,
    menu: 'Meni',
    openMenu: 'Otvori meni',
    closeMenu: 'Zatvori meni',
    switchToLight: 'Uključi svijetlu temu',
    switchToDark: 'Uključi tamnu temu',
    lightTheme: 'Svijetla tema',
    darkTheme: 'Tamna tema',
  },

  date: {
    weekdaysLong: ['nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota'],
    weekdaysShort: ['ned', 'pon', 'uto', 'sri', 'čet', 'pet', 'sub'],
    monthsLong: [
      'januar',
      'februar',
      'mart',
      'april',
      'maj',
      'juni',
      'juli',
      'august',
      'septembar',
      'oktobar',
      'novembar',
      'decembar',
    ],
    monthsShort: ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
    short: (weekday: string, day: number, month: string) => `${weekday}, ${day}. ${month}`,
    long: (weekday: string, day: number, month: string, year: number) => `${weekday}, ${day}. ${month} ${year}.`,
    at: (date: string, time: string) => `${date} u ${time}`,
  },

  units: {
    days: (n: number) => `${n} ${pluralBs(n, 'dan', 'dana', 'dana')}`,
    perDay: 'po danu',
  },

  photos: {
    jet: 'Avion polijeće iznad automobila parkiranih na parkingu Sky Parking & Fly, a iza njih se vide planine',
    entrance:
      'Ulaz na parking: siva limena ograda s plavom tablom Sky Parking & Fly i strelicom ULAZ, a iza nje šljunčani parking s automobilima',
    sign: 'Tabla Sky Parking & Fly Sarajevo: parking kod aerodroma Sarajevo, 24h nadzor i transfer, ULAZ i telefon 062/963/901',
    pole: 'Plava oznaka Privatni parking i stub s video nadzornom kamerom i reflektorom',
  },

  hero: {
    title: 'Sky Parking and Fly Sarajevo',
    distance: '800 m od aerodroma',
    lead: 'Ograđen i osvijetljen parking pod video nadzorom 24/7, uz besplatan transfer do terminala i nazad za samo 2 minute.',
    message: 'Pošaljite poruku na',
  },

  stayBar: {
    aria: 'Termin boravka',
    arrival: 'Dolazak',
    departure: 'Odlazak',
    date: 'Datum',
    time: 'Vrijeme',
    estimate: 'Okvirna cijena',
    line: (days: string, rate: string) => `${days} × ${rate} po danu`,
    lineExtra: (days: string, first: string, extra: string) => `${days}: ${first} + ${extra}`,
  },

  stayErrors: {
    dropOffMissing: 'Odaberite datum i vrijeme dolaska.',
    dropOffPast: 'Vrijeme dolaska je već prošlo.',
    pickUpMissing: 'Odaberite datum i vrijeme odlaska.',
    pickUpBeforeDropOff: 'Odlazak mora biti nakon dolaska.',
    rangeTooShort: (minDays: number) =>
      `Minimalno trajanje parkiranja je ${minDays} ${pluralBs(minDays, 'dan', 'dana', 'dana')}. Za kraći boravak nas kontaktirajte.`,
    rangeTooLong: (maxDays: number) =>
      `Za boravak duži od ${maxDays} ${pluralBs(maxDays, 'dan', 'dana', 'dana')} nazovite nas, dogovorit ćemo posebnu cijenu.`,
  },

  picker: {
    chooseDate: 'Odaberite datum',
    chooseTime: 'Odaberite vrijeme',
    previousMonth: 'Prethodni mjesec',
    nextMonth: 'Sljedeći mjesec',
    today: 'Danas',
    hours: 'Sat',
    minutes: 'Minute',
    done: 'U redu',
    close: 'Zatvori',
  },

  journey: {
    title: 'Od parkinga do terminala za oko minut',
    lead: 'Ostavite auto, a mi vas vozimo. Na povratku dolazimo po vas.',
    steps: {
      book: {
        title: 'Rezervišite',
        text: 'Odaberite datume i pošaljite upit. Potvrdu dobijate porukom ili e-mailom.',
      },
      park: {
        title: 'Parkirajte',
        text: 'Parkirate sami ili nam ostavite ključ, kako vam je lakše. Pomažemo s koferima, kolicima i dječijim sjedalicama.',
      },
      ride: {
        title: 'Vozimo vas',
        text: 'Do ulaza u terminal je oko minut vožnje. Besplatno, uključeno u cijenu parkinga.',
      },
      back: {
        title: 'Vratite se',
        text: 'Kad preuzmete prtljag, pošaljite poruku ili nas nazovite. Vozač dolazi po vas i vraća vas do auta.',
      },
    },
    map: {
      aria: 'Shema puta od parkinga do aerodroma: 800 metara, 1 do 2 minute vožnje',
      parking: 'Parking',
      airport: 'Aerodrom',
      distance: '800 m',
      time: '1-2 min',
      note: 'Shema, nije u mjerilu',
    },
  },

  price: {
    title: 'Što duže ostajete, to je dan jeftiniji',
    lead: 'Cijena se računa po danu i zavisi od dužine boravka. Transfer, video nadzor i fizički nadzor su uključeni.',
    unit: 'KM po danu',
    daysLabel: 'Koliko dana ostajete',
    sliderAria: 'Dužina boravka u danima',
    totalLabel: 'Ukupno',
    totalFor: (days: string) => `za ${days}`,
    saving: (amount: string) => `Ušteda ${amount}`,
    approx: 'Okvirna cijena',
    tiers: {
      from2: { label: '2-4 dana', hint: 'Za kraća putovanja, vikend odmore i poslovne letove.' },
      from5: { label: '5-10 dana', hint: 'Povoljno parkiranje za odmore i putovanja.' },
      from11: { label: '11-20 dana', hint: 'Niža dnevna cijena za duži boravak.' },
      from21: { label: '21-30 dana', hint: 'Najpovoljnije cijene za duža putovanja.' },
    },
    extra: {
      label: 'Nakon 30. dana',
      unit: 'KM za svaki dodatni dan',
      hint: (base: string, rate: string) =>
        `Na osnovnu cijenu od ${base} za 30 dana dodaje se ${rate} za svaki naredni dan.`,
    },
    minStay: (days: string) => `Minimalno trajanje parkiranja je ${days}.`,
    howTitle: 'Kako se računa broj dana?',
    how: [
      'Obračun počinje tačnim vremenom dolaska na parking.',
      'Svaki započeti period od 24 sata računa se kao jedan dan.',
      'Dnevna cijena određuje se prema ukupnom broju obračunatih dana.',
      'Tačan broj dana i ukupan iznos vidite prije slanja rezervacije.',
    ],
    checkTitle: 'Provjeri cijenu za svoje datume',
    checkLead:
      'Odaberite datum i vrijeme dolaska i povratka kako biste odmah vidjeli broj dana parkiranja i ukupnu cijenu.',
    result: { days: 'Obračunati dani', rate: 'Cijena po danu', extra: 'Dodatni dani', total: 'Ukupno' },
    sameNextStep: 'Cijena je ista u sljedećem koraku rezervacije ako ne promijenite podatke.',
    details: {
      link: 'Detaljan cjenovnik i primjeri',
      title: 'Primjeri obračuna',
      note: 'Primjeri se odnose na tačno navedeni broj obračunatih dana.',
    },
    supportTitle: 'Podrška pri dolasku i povratku',
    supportText:
      'Naš tim vam stoji na raspolaganju prilikom dolaska, promjene leta i organizacije povratnog transfera.',
    supportIncluded: 'Transfer između parkinga i aerodroma uključen je u cijenu.',
    includedTitle: 'U cijeni parkinga',
    included: [
      'Besplatan transfer do aerodroma',
      'Video nadzor 24/7',
      'Fizički nadzor',
      'Ograđen i osvijetljen prostor',
      'Popust za više dana',
    ],
    payment: 'Plaćanje gotovinom pri dolasku ili odlasku. Ako želite platiti drugačije, javite nam se unaprijed.',
    longStay: 'Za duže boravke i stalne klijente odobravamo dodatne popuste i posebne pogodnosti.',
    currency: 'Sve cijene su u konvertibilnim markama (KM).',
  },

  lot: {
    title: 'Vaš auto ne ostaje bez nadzora',
    facts: {
      fenced: { title: 'Ograđen prostor', text: 'Pristup imaju samo klijenti i osoblje.' },
      cctv: { title: 'Video nadzor 24/7', text: 'Parking je pod video nadzorom 24 sata dnevno.' },
      staff: {
        title: 'Osoblje na parkingu',
        text: 'Fizički nadzor, jasna pravila ulaza i izlaza te evidencija kretanja.',
      },
      keys: {
        title: 'Ključevi u vašim rukama',
        text: 'Auto ostaje zaključan. Ključeve možete zadržati ili nam ih ostaviti na čuvanje.',
      },
    },
    link: 'Pogledaj objekat',
    entranceCaption: 'Ulaz je desno od table.',
    poleCaption: 'Kamera i reflektor na stubu.',
  },

  reviews: {
    title: 'Šta kažu putnici',
    lead: 'Prave recenzije putnika koji su ostavili auto kod nas.',
    google: 'Ocjena 5,0 na Google Maps',
    googleLink: 'Pogledaj sve recenzije na Google Maps',
    source: 'Google recenzija',
    starsAria: (stars: number) => `Ocjena ${stars} od 5`,
    marqueeAria: 'Recenzije putnika',
    pause: 'Pauziraj kretanje',
    play: 'Nastavi kretanje',
  },

  news: {
    title: 'Novosti',
    lead: 'Kratki savjeti o parkiranju, transferu i sigurnosti vašeg vozila.',
    latest: 'Posljednje novosti',
    all: 'Sve novosti',
    more: 'Još novosti',
    readMore: 'Pročitaj više',
    back: 'Sve novosti',
    items: newsItems,
  },

  faq: {
    title: 'Česta pitanja',
    lead: 'Ovdje ćete pronaći odgovore na najčešća pitanja o našim uslugama privatnog parkiranja u blizini aerodroma Sarajevo.',
    all: 'Sva pitanja',
    more: 'Pogledaj više',
    items: [
      {
        q: 'Da li je Sky Parking and Fly siguran za dugoročno parkiranje?',
        a: 'Da, naš parking prostor je ograđen, pod videonadzorom i osiguran 24/7. Vaše vozilo je kod nas na sigurnom, bilo da ostaje jedan dan ili više sedmica.',
      },
      {
        q: 'Kako mogu rezervisati svoje parking mjesto online?',
        a: 'Rezervaciju možete napraviti putem naše web stranice unosom osnovnih podataka i datuma. Potvrdu ćete dobiti odmah putem e-maila ili poruke.',
      },
      {
        q: 'Koje su opcije plaćanja dostupne?',
        a: 'Naplata se vrši gotovinom po dolasku ili odlasku, u zavisnosti šta Vama više odgovara. Ako želite platiti drugačijim načinom, slobodno nas kontaktirajte unaprijed kako bismo Vam to omogućili i rezervisali mjesto.',
      },
      {
        q: 'Koliko košta parking po danu i po sedmici?',
        a: 'Cijena parkinga zavisi od dužine boravka:',
        list: [
          { label: '2-4 dana', value: '9 KM po danu' },
          { label: '5-10 dana', value: '8 KM po danu' },
          { label: '11-20 dana', value: '7 KM po danu' },
          { label: '21-30 dana', value: '6 KM po danu' },
          { label: 'Nakon 30. dana', value: '5 KM za svaki dodatni dan' },
        ],
        after:
          'Minimalno trajanje parkiranja je 2 dana. Za duži period boravka, SKY Parking and Fly odobrava dodatne popuste i posebne pogodnosti za redovne klijente.',
      },
      {
        q: 'Gdje se tačno nalazi Sky Parking and Fly u odnosu na aerodrom?',
        a: 'Naš parking se nalazi svega 800m ili minutu vožnje od glavnog ulaza u Sarajevo International Airport. Lokaciju dobijate automatski prilikom rezervacije.',
      },
      {
        q: 'Da li nudite besplatan transfer do i od aerodroma?',
        a: 'Da, obezbjeđujemo besplatan i brz transfer do terminala i nazad, odmah nakon što parkirate vozilo.',
      },
      {
        q: 'Mogu li ostaviti ključeve od auta kod vas?',
        a: 'Po želji, da. Možete ih zadržati ili ostaviti kod nas na čuvanje. Ključevi se zaključavaju i čuvaju na sigurnom mjestu.',
      },
      {
        q: 'Da li je parking otvoren 24/7?',
        a: 'Da, radimo non-stop. Možete nas kontaktirati i parkirati vaše vozilo u bilo koje doba dana ili noći, uključujući praznike.',
      },
      {
        q: 'Šta se dešava ako mi let kasni ili se vraćam kasnije?',
        a: 'Nema brige, pratimo vaše letove i fleksibilni smo sa vremenom preuzimanja. Vaše vozilo će vas čekati bez dodatnih troškova za manje kašnjenje.',
      },
      {
        q: 'Kako mogu kontaktirati podršku ako imam dodatna pitanja?',
        a: 'Jednostavno nas pozovite, pošaljite poruku ili nas kontaktirajte putem WhatsApp-a. Tu smo da vam olakšamo svako putovanje.',
      },
    ] as FaqItem[],
  },

  facilities: {
    title: 'Ograđen. Osvijetljen. Pod nadzorom.',
    lead: 'Privatni parking kod aerodroma Sarajevo. Vaše vozilo ostaje na ograđenom prostoru, uz stalnu kontrolu i fizičko prisustvo osoblja.',
    features: {
      fenced: { title: 'Ograđen prostor', text: 'Pristup imaju samo klijenti i osoblje.' },
      lit: { title: 'Osvijetljen prostor', text: 'Reflektori na stubovima osvjetljavaju parking.' },
      cctv: { title: 'Video nadzor 24/7', text: 'Kamere na stubovima prate parking danonoćno.' },
      staff: {
        title: 'Fizički nadzor',
        text: 'Osoblje je na parkingu. Imamo jasna pravila ulaza i izlaza i evidenciju kretanja.',
      },
      keys: {
        title: 'Ključevi',
        text: 'Auto ostaje zaključan, a ključeve možete zadržati. Ako ih ostavite, zaključavamo ih i čuvamo na sigurnom mjestu.',
      },
      check: {
        title: 'Pregled pri preuzimanju',
        text: 'Ako želite, pri preuzimanju zajedno uradimo kratak vizuelni pregled auta.',
      },
    },
    find: {
      title: 'Kako nas prepoznati',
      text: 'Tražite plavu tablu s oznakom ULAZ. Ulaz je desno od table.',
      address: 'Dr Atifa Purivatre 38, Sarajevo',
      cta: 'Upute za vožnju',
    },
  },

  shuttle: {
    title: 'Besplatan transfer do terminala',
    lead: 'Do ulaza u terminal vozimo vas oko minut. U oba smjera, uključeno u cijenu parkinga.',
    howTitle: 'Kako izgleda',
    steps: [
      { title: 'Parkirate', text: 'Stižete na parking i parkirate, ili nam predate ključ, kako vam je lakše.' },
      { title: 'Pomažemo s prtljagom', text: 'Koferi, kolica, dječije sjedalice: pomažemo oko svega.' },
      { title: 'Vozimo vas do terminala', text: 'Do ulaza u terminal vožnja traje oko jedan minut.' },
      { title: 'Javite se po povratku', text: 'Čim preuzmete prtljag, pošaljite poruku ili nas nazovite.' },
      { title: 'Vraćamo vas do auta', text: 'Naš vozač dolazi po vas i vozi vas do auta.' },
    ],
    closing:
      'Sve je uključeno u cijenu parkinga. Bez taksija, bez zvanja prijatelja u 4 ujutro i bez lutanja po kružnim tokovima.',
    delay: {
      title: 'Ako let kasni',
      text: 'Pratimo letove i fleksibilni smo s vremenom preuzimanja. Za manja kašnjenja ne naplaćujemo dodatne troškove.',
    },
    checklist: {
      title: 'Prije nego krenete',
      items: [
        'Brave i prozori: provjerite još jednom, mir u glavi za 30 sekundi.',
        'Vrijednosti: sklonite s vidljivog mjesta torbice, kablove i držače.',
        'Fotografija stanja: jedan snimak telefonom čuva živce.',
        'Gume i tečnosti (za duže boravke): provjerite da se po povratku možete odmah voziti.',
        'Tajming: dođite 15-20 minuta ranije, ostatak ide brzo jer je vozač tu.',
      ],
    },
  },

  contact: {
    title: 'Pozovite nas. Radimo non-stop.',
    lead: 'Parkirati možete u bilo koje doba dana ili noći, uključujući praznike.',
    channels: {
      phone: { label: 'Telefon', hint: 'Svaki dan, 0-24h' },
      whatsapp: { label: 'WhatsApp', hint: 'Poruka ili poziv' },
      viber: { label: 'Viber', hint: 'Poruka ili poziv' },
      email: { label: 'E-mail', hint: 'Za upite i rezervacije' },
    },
    whatsappGeneric: 'Pozdrav, želim rezervisati parking.',
    addressTitle: 'Adresa',
    hoursTitle: 'Radno vrijeme',
    hours: 'Non-stop, svaki dan, uključujući praznike',
    map: {
      title: 'Lokacija',
      show: 'Prikaži kartu',
      note: 'Karta se učitava tek kad je zatražite.',
      embedTitle: 'Karta lokacije Sky Parking & Fly',
      google: 'Google Maps',
      apple: 'Apple Maps',
    },
  },

  reservation: {
    title: 'Rezervacija',
    lead: 'Odaberite datume, popunite podatke i pošaljite rezervaciju. Odmah dobijate potvrdu s kodom rezervacije na e-mail.',
    stayTitle: 'Termin',
    guestTitle: 'Vaši podaci',
    fields: {
      name: { label: 'Ime i prezime', placeholder: 'Amar Hodžić' },
      phone: { label: 'Telefon', placeholder: '061 123 456' },
      email: { label: 'E-mail', placeholder: 'ime@primjer.ba' },
      make: { label: 'Marka vozila', placeholder: 'Npr. VW Golf 7' },
      flight: { label: 'Broj leta', placeholder: 'FR 1234' },
      note: { label: 'Napomena', placeholder: 'Npr. kombi, dječija sjedalica, dolazak u 4 ujutro' },
    },
    errors: {
      name: { required: 'Unesite ime i prezime.', invalid: 'Ime mora sadržavati slova.' },
      phone: {
        required: 'Unesite broj telefona da vam možemo potvrditi termin.',
        invalid: 'Broj telefona nije ispravan (npr. 061 123 456).',
      },
      email: {
        required: 'Unesite e-mail na koji da pošaljemo potvrdu rezervacije.',
        invalid: 'E-mail adresa nije ispravna.',
      },
      flight: { invalid: 'Broj leta nije ispravan (npr. FR 1234).' },
    },
    submit: {
      label: 'Pošalji rezervaciju',
      sending: 'Šaljem…',
      note: 'Odmah nakon slanja dobijate e-mail s potvrdom, kodom rezervacije, datumima, cijenom i pravilima.',
    },
    failed: {
      title: 'Slanje nije uspjelo',
      text: 'Provjerite internet i pokušajte ponovo. Ako se ponovi, pošaljite upit putem WhatsAppa ili nas nazovite.',
    },
    summary: {
      title: 'Vaš upit',
      stay: 'Boravak',
      rate: 'Cijena po danu',
      extra: 'Dodatni dani nakon 30.',
      total: 'Okvirno ukupno',
    },
    send: {
      title: 'Pošaljite upit',
      hint: 'Poruka se šalje s vašeg uređaja, a mi vam potvrđujemo termin.',
      whatsapp: 'Pošalji na WhatsApp',
      viber: 'Viber',
      email: 'E-mail',
      call: 'Nazovi',
      viberCopied: 'Tekst je kopiran. Zalijepite ga u Viber razgovor.',
      fixErrors: 'Provjerite označena polja.',
      previewTitle: 'Tekst poruke',
    },
    message: {
      subject: 'Rezervacija parkinga',
      greeting: 'Pozdrav, želim rezervisati parking.',
      arrival: (when: string) => `Dolazak: ${when}`,
      departure: (when: string) => `Odlazak: ${when}`,
      stay: (days: string, total: string) => `Boravak: ${days}, okvirno ${total}`,
      name: (value: string) => `Ime: ${value}`,
      phone: (value: string) => `Telefon: ${value}`,
      email: (value: string) => `E-mail: ${value}`,
      make: (value: string) => `Vozilo: ${value}`,
      flight: (value: string) => `Let: ${value}`,
      note: (value: string) => `Napomena: ${value}`,
    },
  },

  confirmation: {
    pageTitle: 'Hvala vam!',
    pageLead:
      'Hvala što ste rezervisali. Ako vam potvrda ne stigne ili imate pitanja, nazovite nas ili pošaljite poruku.',
    title: 'Uspješna rezervacija',
    subject: (code: string) => `Uspješna rezervacija ${code} | Sky Parking & Fly Sarajevo`,
    period: (from: string, to: string) => `od ${from} do ${to}`,
    codeLabel: 'Kod rezervacije',
    keepCode: 'Sačuvajte ovaj kod i navedite ga kad nas kontaktirate.',
    greeting: (name: string) => `Pozdrav, ${name}!`,
    intro:
      'Hvala što ste rezervisali parking kod Sky Parking and Fly Sarajevo. Vaša rezervacija je uspješno primljena, a ovo su svi podaci.',
    detailsTitle: 'Detalji rezervacije',
    labels: {
      arrival: 'Dolazak',
      departure: 'Odlazak',
      days: 'Obračunati dani',
      vehicle: 'Vozilo',
      name: 'Ime i prezime',
      phone: 'Telefon',
      email: 'E-mail',
      flight: 'Broj leta',
      note: 'Napomena',
    },
    priceTitle: 'Cijena',
    priceTotal: 'Ukupna cijena',
    pricePayment: 'Plaćanje gotovinom pri dolasku ili odlasku.',
    rulesTitle: 'Važno znati',
    rules: [
      'Obračun počinje tačnim vremenom dolaska na parking. Svaki započeti period od 24 sata računa se kao jedan dan.',
      'Kašnjenje leta: pratimo letove i fleksibilni smo s vremenom preuzimanja, a za manja kašnjenja ne naplaćujemo dodatne troškove.',
      'Ako se povratak pomjeri, javite nam se čim saznate i produžit ćemo rezervaciju. Naš tim vam je na raspolaganju i kad se promijeni let.',
      'Po povratku, čim preuzmete prtljag, pošaljite poruku ili nas nazovite. Naš vozač dolazi po vas i vraća vas do auta.',
      'Transfer do terminala i nazad je besplatan i uključen u cijenu parkinga. Pomažemo s koferima, kolicima i dječijim sjedalicama.',
      'Ključeve možete zadržati ili ostaviti kod nas na čuvanje, kako vam je lakše.',
      'Plaćanje je gotovinom pri dolasku ili odlasku. Ako želite platiti drugačije, javite nam se unaprijed.',
      'Molimo vas da vrijedne stvari, torbice i kablove ne ostavljate na vidljivom mjestu u vozilu.',
    ],
    rulePrice: (rate: string) =>
      `Dnevna cijena određuje se prema ukupnom broju obračunatih dana, a svaki dan nakon 30. dana košta ${rate}.`,
    contactTitle: 'Pitanja ili promjena plana?',
    contactText: 'Javite nam se porukom ili pozivom. Radimo non-stop, uključujući praznike.',
    contactLabels: { phone: 'Telefon, WhatsApp i Viber', email: 'E-mail', address: 'Adresa' },
    mailSent: (email: string) => `Potvrdu s ovim podacima poslali smo na ${email}. Ako je ne vidite, provjerite spam.`,
    mailNotSent:
      'E-mail potvrda trenutno nije mogla biti poslana. Sačuvajte kod rezervacije, a mi ćemo vam se javiti porukom ili e-mailom.',
    copyCode: 'Kopiraj kod',
    copied: 'Kod je kopiran',
    print: 'Odštampaj potvrdu',
    another: 'Nova rezervacija',
    home: 'Na početnu',
  },
  viber: {
    title: 'Viber se nije otvorio?',
    text: (number: string) =>
      `Viber možda nije instaliran na ovom uređaju. Dodajte broj ${number} u Viber ili nam pišite na WhatsApp.`,
    copy: 'Kopiraj broj',
    copied: 'Broj je kopiran',
    download: 'Preuzmi Viber',
    close: 'Zatvori',
  },

  footer: {
    ctaTitle: 'Ostavite auto kod nas',
    ctaText: 'Rezervišite online ili nas nazovite, 24 sata dnevno.',
    contact: 'Kontakt',
    pages: 'Stranice',
    legal: 'Pravno',
    language: 'Jezik',
    navAria: 'Navigacija u podnožju',
    hours: 'Otvoreno 24/7, uključujući praznike',
    rights: (year: number) => `© ${year} Sky Parking and Fly. Sva prava zadržana.`,
    toTop: 'Na vrh',
  },

  legal: {
    updated: (date: string) => `Ažurirano ${date}`,
    docs: {
      terms: {
        title: 'Uslovi korištenja',
        updated: '16. oktobar 2026.',
        sections: [
          {
            heading: 'Usluga',
            body: 'Sky Parking and Fly nudi čuvanje vozila na ograđenom, osvijetljenom i video nadziranom parkingu kod aerodroma Sarajevo, uz besplatan transfer do terminala i nazad.',
          },
          {
            heading: 'Rezervacija',
            body: 'Rezervaciju možete poslati putem obrasca na ovoj stranici, preko WhatsAppa, Vibera ili e-maila, ili telefonom. Potvrdu termina dobijate porukom ili e-mailom.',
          },
          {
            heading: 'Cijena',
            body: 'Cijena se računa po danu: 9 KM za boravak od 2 do 4 dana, 8 KM od 5 do 10 dana, 7 KM od 11 do 20 dana i 6 KM od 21 do 30 dana, a svaki dan nakon 30. dana košta 5 KM. Minimalno trajanje parkiranja je 2 dana, a svaki započeti period od 24 sata računa se kao jedan dan. Iznos prikazan na stranici je okviran, a termin i cijenu potvrđujemo pri rezervaciji.',
          },
          {
            heading: 'Plaćanje',
            body: 'Naplata se vrši gotovinom po dolasku ili odlasku. Za drugi način plaćanja kontaktirajte nas unaprijed.',
          },
          {
            heading: 'Ključevi i kašnjenje leta',
            body: 'Ključeve možete zadržati ili ostaviti kod nas na čuvanje. Pratimo letove i fleksibilni smo s vremenom preuzimanja, a za manja kašnjenja ne naplaćujemo dodatne troškove.',
          },
          {
            heading: 'Vrijedne stvari',
            body: 'Molimo vas da vrijedne stvari, torbice i kablove ne ostavljate na vidljivom mjestu u vozilu.',
          },
        ],
      },
      privacy: {
        title: 'Politika privatnosti',
        updated: '15. oktobar 2026.',
        sections: [
          {
            heading: 'Ko smo mi',
            body: 'Sky Parking and Fly, Dr Atifa Purivatre 38, Sarajevo. Za sva pitanja o podacima pišite nam na info@parkingandfly.ba.',
          },
          {
            heading: 'Obrazac za rezervaciju',
            body: 'Kad pošaljete rezervaciju putem obrasca, podaci koje unesete (ime, telefon, e-mail, termin, marka vozila, broj leta i napomena) stižu nam e-mailom. Za prijenos koristimo uslugu FormSubmit (formsubmit.co), koja primjenjuje vlastita pravila. Podatke koristimo samo za potvrdu termina i komunikaciju s vama.',
          },
          {
            heading: 'WhatsApp, Viber i e-mail',
            body: 'Ako nam pišete putem WhatsAppa, Vibera ili e-maila, poruku šaljete sami, a te usluge rade prema vlastitim pravilima. Primamo ono što napišete u poruci i koristimo to samo za potvrdu termina i komunikaciju s vama.',
          },
          {
            heading: 'Video nadzor',
            body: 'Parking je pod video nadzorom radi zaštite vozila i imovine.',
          },
          {
            heading: 'Vaša prava',
            body: 'Za pristup, ispravku ili brisanje podataka koje imamo o vama javite nam se na info@parkingandfly.ba.',
          },
        ],
      },
      cookies: {
        title: 'Politika kolačića',
        updated: '13. oktobar 2026.',
        sections: [
          {
            heading: 'Šta koristimo',
            body: 'Ova stranica ne koristi kolačiće za praćenje ni oglašavanje. Vaš preglednik pohranjuje samo odabranu temu (svijetla ili tamna).',
          },
          {
            heading: 'Karta',
            body: 'Karta na stranici Kontakt učitava se tek nakon što je zatražite. Tada se učitava OpenStreetMap, koji primjenjuje vlastita pravila.',
          },
          {
            heading: 'Kako obrisati podatke',
            body: 'Lokalne podatke možete u svakom trenutku obrisati u postavkama svog preglednika.',
          },
        ],
      },
    },
  },

  notFound: {
    code: '404',
    title: 'Stranica nije pronađena',
    text: 'Stranica koju tražite ne postoji ili je premještena.',
    home: 'Na početnu',
  },
};

export type Messages = typeof bs;
