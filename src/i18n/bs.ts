/**
 * Bosnian (default language) - the source of truth for the shape of every dictionary.
 * `en.ts` and `de.ts` are typed as `Messages`, so a missing or extra key is a compile error.
 *
 * Facts (prices, distances, opening hours, FAQ) come from parkingandfly.ba.
 */

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
          'Parking kod aerodroma Sarajevo: 8 KM po danu (1-10 dana), 7 KM (11-20 dana), 6 KM (21+ dana). Transfer i nadzor su uključeni. Izračunajte svoj boravak.',
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
      faq: 'Pitanja',
      contact: 'Kontakt',
      reservation: 'Rezervacija',
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
    title: 'Parking 800 metara od aerodroma',
    lead: 'Ograđen i osvijetljen parking pod video nadzorom 24/7, uz besplatan transfer do terminala i nazad.',
  },

  stayBar: {
    aria: 'Termin boravka',
    arrival: 'Dolazak',
    departure: 'Odlazak',
    date: 'Datum',
    time: 'Vrijeme',
    estimate: 'Okvirna cijena',
    line: (days: string, rate: string) => `${days} × ${rate} po danu`,
  },

  stayErrors: {
    dropOffMissing: 'Odaberite datum i vrijeme dolaska.',
    dropOffPast: 'Vrijeme dolaska je već prošlo.',
    pickUpMissing: 'Odaberite datum i vrijeme odlaska.',
    pickUpBeforeDropOff: 'Odlazak mora biti nakon dolaska.',
    rangeTooLong: (maxDays: number) =>
      `Za boravak duži od ${maxDays} ${pluralBs(maxDays, 'dan', 'dana', 'dana')} nazovite nas, dogovorit ćemo posebnu cijenu.`,
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
      short: {
        label: '1-10 dana',
        hint: 'Idealno rješenje za kraće boravke i brza putovanja.',
      },
      mid: {
        label: '11-20 dana',
        hint: 'Najpopularniji izbor putnika koji ostaju duže, odličan balans cijene i praktičnosti.',
      },
      long: {
        label: '21+ dana',
        hint: 'Najpovoljniji paket za dugotrajnije boravke, maksimalna sigurnost po najboljoj cijeni.',
      },
    },
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
    lead: 'Iskustva putnika koji su ostavili auto kod nas.',
    google: 'Ocjena 5,0 na Google Maps',
    googleLink: 'Sve recenzije na Google Maps',
    items: {
      nedim: {
        title: 'Najbolje iskustvo do sada',
        quote:
          'Kada se vratite sa puta i imate nekoga ko vas čeka na izlazu iz aerodroma, to je neprocjenjivo. Sve pohvale za ekipu Sky Parking and Fly.',
        name: 'Nedim K.',
      },
      lejla: {
        title: 'Veliko olakšanje za putnike',
        quote: 'Ne moraš misliti o taxi vožnji ni zadržavanju. Ostaviš auto i sve ostalo riješe oni.',
        name: 'Lejla B.',
      },
      jasmin: {
        title: 'Vraćam se opet!',
        quote:
          'Ovo mi je već treći put da koristim Sky Parking and Fly i svaki put sam prezadovoljan. Topla preporuka!',
        name: 'Jasmin H.',
      },
      ajla: {
        title: 'Pouzdani i brzi',
        quote:
          'Kratko čekanje, jasna komunikacija i ljubazno osoblje. Ne mogu da zamislim bolje rješenje kad letim iz Sarajeva.',
        name: 'Ajla S.',
      },
      haris: {
        title: 'Jednostavna rezervacija',
        quote: 'Rezervacija je trajala 1 minutu, sve jasno i precizno. Potvrdu sam odmah dobio na e-mail.',
        name: 'Haris V.',
      },
      mirela: {
        title: 'Super za porodice s djecom',
        quote:
          'Putovali smo s malim djetetom i transfer do aerodroma je bio brz i udoban. Ljudi su stvarno susretljivi.',
        name: 'Mirela D.',
      },
    },
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
          { label: '1-10 dana', value: '8 KM po danu' },
          { label: '11-20 dana', value: '7 KM po danu' },
          { label: '21+ dana', value: '6 KM po danu' },
        ],
        after:
          'Za duži period boravka, SKY Parking and Fly odobrava dodatne popuste i posebne pogodnosti za redovne klijente.',
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
    lead: 'Odaberite datume, pogledajte okvirnu cijenu i pošaljite upit. Potvrdu dobijate porukom ili e-mailom.',
    stayTitle: 'Termin',
    guestTitle: 'Vaši podaci',
    fields: {
      name: { label: 'Ime i prezime', placeholder: 'Amar Hodžić' },
      phone: { label: 'Telefon', placeholder: '061 123 456' },
      plate: { label: 'Registarske tablice', placeholder: 'A12-K-345' },
      flight: { label: 'Broj leta', placeholder: 'FR 1234' },
      note: { label: 'Napomena', placeholder: 'Npr. kombi, dječija sjedalica, dolazak u 4 ujutro' },
    },
    errors: {
      name: { required: 'Unesite ime i prezime.', invalid: 'Ime mora sadržavati slova.' },
      phone: { invalid: 'Broj telefona nije ispravan (npr. 061 123 456).' },
      plate: { invalid: 'Tablice nisu ispravne (npr. A12-K-345).' },
      flight: { invalid: 'Broj leta nije ispravan (npr. FR 1234).' },
    },
    summary: {
      title: 'Vaš upit',
      stay: 'Boravak',
      rate: 'Cijena po danu',
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
      plate: (value: string) => `Vozilo: ${value}`,
      flight: (value: string) => `Let: ${value}`,
      note: (value: string) => `Napomena: ${value}`,
    },
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
        updated: '13. oktobar 2026.',
        sections: [
          {
            heading: 'Usluga',
            body: 'Sky Parking and Fly nudi čuvanje vozila na ograđenom, osvijetljenom i video nadziranom parkingu kod aerodroma Sarajevo, uz besplatan transfer do terminala i nazad.',
          },
          {
            heading: 'Rezervacija',
            body: 'Rezervaciju možete poslati putem ove stranice (WhatsApp, Viber ili e-mail) ili telefonom. Potvrdu termina dobijate porukom ili e-mailom.',
          },
          {
            heading: 'Cijena',
            body: 'Cijena se računa po danu: 8 KM za boravak od 1 do 10 dana, 7 KM od 11 do 20 dana i 6 KM za 21 dan i duže. Iznos prikazan na stranici je okviran, a termin i cijenu potvrđujemo pri rezervaciji.',
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
        updated: '13. oktobar 2026.',
        sections: [
          {
            heading: 'Ko smo mi',
            body: 'Sky Parking and Fly, Dr Atifa Purivatre 38, Sarajevo. Za sva pitanja o podacima pišite nam na info@parkingandfly.ba.',
          },
          {
            heading: 'Šta se dešava s podacima iz obrasca',
            body: 'Obrazac za rezervaciju na ovoj stranici ne šalje podatke na naš server. Ono što unesete koristi se samo za sastavljanje poruke koju sami šaljete putem WhatsAppa, Vibera ili e-maila. Te usluge pružaju treće strane prema vlastitim pravilima.',
          },
          {
            heading: 'Podaci koje primamo',
            body: 'Kad nam pošaljete upit, primamo podatke koje ste naveli u poruci, najčešće ime, termin, broj telefona i registarske tablice. Koristimo ih isključivo za potvrdu termina i komunikaciju s vama.',
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
