/**
 * Bosnian (default language) — the source of truth for the shape of every dictionary.
 * `en.ts` and `de.ts` are typed as `Messages`, so a missing or extra key is a compile error.
 */

/** Bosnian plural: 1 dan / 2–4 dana / 5+ dana (21 dan, 22 dana, 11 dana). */
function pluralBs(count: number, one: string, few: string, many: string): string {
  const abs = Math.abs(count);
  const mod10 = abs % 10;
  const mod100 = abs % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

export const bs = {
  meta: {
    siteName: 'Sky Parking & Fly',
    ogLocale: 'bs_BA',
    pages: {
      home: {
        title: 'Sky Parking & Fly — Siguran aerodromski parking i shuttle transfer',
        description:
          'Čuvan parking nekoliko minuta od terminala, video nadzor 24/7, besplatan shuttle i osigurana vozila. Izračunajte cijenu i rezervišite online za manje od minute.',
      },
      pricing: {
        title: 'Cijene i kalkulator parkinga — Sky Parking & Fly',
        description:
          'Transparentne cijene aerodromskog parkinga: natkriveno i nenatkriveno, popust za duži boravak i kalkulator koji odmah računa ukupan iznos s PDV-om.',
      },
      facilities: {
        title: 'Objekat i sigurnost — Sky Parking & Fly',
        description:
          'Video nadzor uživo, automatske rampe s prepoznavanjem tablica, osoblje 0–24h i stvarno stanje zauzetosti parkinga na jednom mjestu.',
      },
      shuttle: {
        title: 'Besplatan shuttle do terminala — Sky Parking & Fly',
        description:
          'Besplatan shuttle svakih 15 minuta do terminala aerodroma Sarajevo. Pogledajte rutu, raspored polazaka i vrijeme do sljedećeg shuttlea.',
      },
      reviews: {
        title: 'Recenzije putnika — Sky Parking & Fly',
        description: 'Šta kažu putnici koji su kod nas ostavili vozilo: ocjene, iskustva i verifikovane recenzije.',
      },
      contact: {
        title: 'Kontakt — Sky Parking & Fly',
        description:
          'Javite nam se putem WhatsAppa, Vibera, telefona ili e-maila. Radno vrijeme, adresa i lokacija parkinga na karti.',
      },
      terms: {
        title: 'Uslovi korištenja — Sky Parking & Fly',
        description: 'Uslovi korištenja usluge parkinga i shuttle transfera.',
      },
      privacy: {
        title: 'Politika privatnosti — Sky Parking & Fly',
        description: 'Kako obrađujemo i štitimo vaše lične podatke.',
      },
      cookies: {
        title: 'Politika kolačića — Sky Parking & Fly',
        description: 'Koje podatke ova stranica pohranjuje u vašem pregledniku.',
      },
      notFound: {
        title: 'Stranica nije pronađena — Sky Parking & Fly',
        description: 'Tražena stranica ne postoji.',
      },
    },
  },

  common: {
    skipToContent: 'Preskoči na sadržaj',
    close: 'Zatvori',
    optional: 'Opcionalno',
    back: 'Nazad',
    loading: 'Učitavanje…',
  },

  language: {
    label: 'Jezik',
    names: { bs: 'Bosanski', en: 'English', de: 'Deutsch' },
    codes: { bs: 'BS', en: 'EN', de: 'DE' },
    switchTo: (name: string) => `Promijeni jezik: ${name}`,
  },

  nav: {
    aria: 'Glavna navigacija',
    homeAria: 'Sky Parking & Fly — početna',
    pages: {
      home: 'Početna',
      pricing: 'Cijene',
      facilities: 'Objekat',
      shuttle: 'Shuttle',
      reviews: 'Recenzije',
      contact: 'Kontakt',
      terms: 'Uslovi korištenja',
      privacy: 'Politika privatnosti',
      cookies: 'Politika kolačića',
    },
    book: 'Rezerviši',
    bookParking: 'Rezerviši parking',
    callUs: (phone: string) => `Nazovite nas: ${phone}`,
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
    calendarHeader: ['pon', 'uto', 'sri', 'čet', 'pet', 'sub', 'ned'],
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
    monthTitle: (month: string, year: number) => `${month} ${year}.`,
  },

  units: {
    days: (n: number) => `${n} ${pluralBs(n, 'dan', 'dana', 'dana')}`,
    dayWord: (n: number) => pluralBs(n, 'dan', 'dana', 'dana'),
    services: (n: number) => `${n} ${pluralBs(n, 'usluga', 'usluge', 'usluga')}`,
    perDayShort: '/dan',
    perDayLong: 'po danu',
    kmPerDay: 'KM / dan',
  },

  validation: {
    stay: {
      dropOffMissing: 'Odaberite datum i vrijeme ostavljanja vozila.',
      dropOffPast: 'Vrijeme ostavljanja vozila je već prošlo.',
      pickUpMissing: 'Odaberite datum i vrijeme preuzimanja vozila.',
      pickUpBeforeDropOff: 'Preuzimanje mora biti nakon ostavljanja vozila.',
      rangeTooLong: (maxDays: number) =>
        `Online rezervacija je moguća do ${maxDays} ${pluralBs(maxDays, 'dan', 'dana', 'dana')}. Za duži boravak nas kontaktirajte.`,
    },
    fullName: { required: 'Unesite ime i prezime.', invalid: 'Unesite ime i prezime (npr. Amar Hodžić).' },
    email: { required: 'Unesite e-mail adresu.', invalid: 'E-mail adresa nije ispravna.' },
    phone: { required: 'Unesite broj telefona.', invalid: 'Broj telefona nije ispravan (npr. 061 000 000).' },
    plate: { required: 'Unesite registarske tablice.', invalid: 'Tablice nisu ispravne (npr. A12-K-345).' },
    make: { required: 'Unesite marku i model vozila.' },
    passengers: { required: 'Unesite broj putnika.', range: 'Broj putnika mora biti od 1 do 8.' },
    flightNumber: { invalid: 'Broj leta nije ispravan (npr. JU 123).' },
  },

  pricing: {
    tiers: {
      short: { label: '1–3 dana', hint: 'Kratki put' },
      week: { label: '4–7 dana', hint: 'Sedmica' },
      extended: { label: '8–14 dana', hint: 'Produženi' },
      long: { label: '15+ dana', hint: 'Dugoročni' },
    },
    vehicles: {
      car: { label: 'Automobil', shortLabel: 'Auto', hint: 'Putnički' },
      suv: { label: 'SUV', shortLabel: 'SUV', hint: 'Terenac / crossover' },
      van: { label: 'Kombi', shortLabel: 'Kombi', hint: 'Do 3,5 t' },
      moto: { label: 'Motor', shortLabel: 'Motor', hint: 'Motocikl' },
    },
    covers: {
      open: { label: 'Nenatkriveno', description: 'Osvijetljen i ograđen otvoreni sektor' },
      covered: { label: 'Natkriveno', description: 'Zaštita od snijega, grada i sunca' },
    },
    extras: {
      wash: {
        label: 'Vanjsko pranje',
        shortLabel: 'Vanjsko pranje',
        description: 'Ručno pranje i sušenje dok ste na putu.',
      },
      interior: {
        label: 'Unutrašnje čišćenje',
        shortLabel: 'Unutrašnje čišćenje',
        description: 'Usisavanje, čišćenje stakala i armature.',
      },
      ev: {
        label: 'Punjenje električnog vozila',
        shortLabel: 'Punjenje EV',
        description: 'Pun akumulator na vašem povratku.',
      },
      valet: {
        label: 'VIP preuzimanje na terminalu',
        shortLabel: 'VIP preuzimanje',
        description: 'Vozilo vam dostavljamo ispred izlaza.',
      },
      insurance: {
        label: 'Proširena zaštita vozila',
        shortLabel: 'Proširena zaštita',
        description: 'Kasko pokriće do 50.000 KM.',
      },
    },
  },

  hero: {
    badge: 'Aerodrom Sarajevo · otvoreno 0–24h',
    titleLine1: 'Parkirajte bez brige.',
    titleLine2: 'Letite bez stresa.',
    lead: (minutes: number) =>
      `Čuvan, video nadziran parking ${minutes} minuta od terminala. Besplatan shuttle, osigurano vozilo i cijena koju vidite unaprijed.`,
    cta: 'Rezerviši parking',
    ctaSecondary: 'Pogledaj cijene',
    ratingSuffix: (count: string) => `na Googleu · ${count} recenzija`,
    valueProps: {
      secure: { title: 'Čuvan parking', text: 'Ograđen prostor s osobljem 0–24h' },
      cctv: { title: 'Video nadzor 24/7', text: '48 kamera, snimci 30 dana' },
      shuttle: { title: 'Besplatan shuttle', text: 'Do terminala za 5 minuta' },
      insured: { title: 'Osigurana vozila', text: 'Osiguranje od odgovornosti' },
    },
  },

  widget: {
    title: 'Brza rezervacija',
    noDeposit: 'Bez avansa',
    estimate: 'Procjena cijene',
    rateLine: (rate: string) => `${rate} / dan · PDV uključen`,
    saving: (amount: string) => `Ušteda ${amount}`,
    continue: 'Nastavi na rezervaciju',
    footnote: 'Plaćanje pri preuzimanju · Besplatno otkazivanje do 24h prije dolaska',
  },

  stayForm: {
    coverLabel: 'Vrsta parkinga',
    dropOffTime: 'Vrijeme ostavljanja',
    pickUpTime: 'Vrijeme preuzimanja',
    vehicleLabel: 'Vrsta vozila',
    extrasLabel: 'Dodatne usluge',
  },

  dateRange: {
    dropOff: 'Ostavljam vozilo',
    pickUp: 'Preuzimam vozilo',
    choose: 'Odaberite',
    dialog: 'Odabir datuma',
    prevMonth: 'Prethodni mjesec',
    nextMonth: 'Sljedeći mjesec',
    today: 'danas',
    hintDropOff: 'Odaberite dan ostavljanja vozila',
    hintPickUp: 'Sada odaberite dan preuzimanja',
    hintPickUpHover: (date: string) => `Preuzimanje: ${date}`,
  },

  how: {
    eyebrow: 'Kako radi',
    title: 'Od rezervacije do polijetanja — četiri koraka.',
    description: 'Bez papira, bez čekanja na rampi i bez trčanja do terminala s kuferima.',
    steps: {
      book: {
        title: 'Rezervišite online',
        text: 'Odaberite termin i usluge — cijenu vidite odmah, a potvrda stiže za nekoliko sekundi.',
      },
      arrive: {
        title: 'Dolazak bez čekanja',
        text: 'Kamera prepoznaje vaše tablice i otvara rampu. Naš radnik vas usmjerava na rezervisano mjesto.',
      },
      shuttle: {
        title: 'Shuttle do terminala',
        text: 'Besplatan prijevoz sa prtljagom — svega pet minuta do prijave za let.',
      },
      return: {
        title: 'Povratak bez stresa',
        text: 'Javite nam se nakon slijetanja. Shuttle vas čeka, a vozilo je tamo gdje ste ga ostavili.',
      },
    },
  },

  home: {
    exploreEyebrow: 'Istražite',
    exploreTitle: 'Sve što trebate znati prije polaska.',
    exploreDescription: 'Cijene, sigurnost, shuttle i iskustva putnika — svako na svojoj stranici.',
    pricing: {
      eyebrow: 'Cijene',
      headline: (price: string) => `od ${price} / dan`,
      text: 'Transparentan cjenovnik, kalkulator u realnom vremenu i popust za duži boravak.',
      link: 'Izračunaj cijenu',
    },
    facilities: {
      eyebrow: 'Objekat',
      headline: '48 kamera',
      badge: 'Nadzor 0–24h',
      text: 'Video nadzor, automatska rampa i osoblje na licu mjesta — a zauzetost možete pratiti uživo.',
      link: 'Pogledaj objekat',
    },
    shuttle: {
      eyebrow: 'Shuttle',
      next: 'Sljedeći polazak',
      text: 'Besplatan prijevoz do terminala svakih 15 minuta, a noću svakih 30.',
      link: 'Raspored polazaka',
    },
    reviews: {
      eyebrow: 'Recenzije',
      headline: (score: string) => `${score} / 5`,
      text: (count: string) => `${count} Google recenzija i hiljade zadovoljnih putnika.`,
      link: 'Pročitaj iskustva',
    },
  },

  calculator: {
    eyebrow: 'Cijene i usluge',
    title: 'Cijena koju vidite unaprijed. Bez iznenađenja.',
    description:
      'Što duže ostajete, to je dan jeftiniji. Podesite trajanje, vrstu parkinga i usluge — ukupan iznos se računa u trenutku.',
    coveredAria: 'Natkriveni parking',
    standard: 'Standard',
    yourChoice: 'Vaš izbor',
    noteCar: (vat: string) =>
      `Cijene za putnički automobil · PDV (${vat}) je uključen · svaki započeti dan (24h) se računa kao cijeli`,
    noteOther: (vat: string) =>
      `Cijene za odabrano vozilo · PDV (${vat}) je uključen · svaki započeti dan (24h) se računa kao cijeli`,
    duration: 'Trajanje boravka',
    dayLess: 'Jedan dan manje',
    dayMore: 'Jedan dan više',
    vehicleTitle: 'Vrsta vozila',
    extrasTitle: 'Dodatne usluge',
    summaryTitle: 'Vaša procjena',
    parking: 'Parking',
    savings: 'Ušteda za duži boravak',
    vatIncluded: 'PDV uključen',
    coveredLower: 'natkriveno',
    openLower: 'nenatkriveno',
    reserveFor: (total: string) => `Rezerviši za ${total}`,
    included: [
      'Besplatan shuttle svakih 15 minuta',
      'Video nadzor 24/7 i čuvar na licu mjesta',
      'Osiguranje vozila od odgovornosti',
      'Pomoć: pokretanje i napuhavanje guma',
    ],
  },

  facilities: {
    eyebrow: 'Objekat i sigurnost',
    title: 'Vaše vozilo je pod nadzorom 24 sata dnevno.',
    description:
      'Pogledajte kako izgleda parking upravo sada — video nadzor, zauzetost i automatska rampa na jednom mjestu.',
    features: {
      cctv: {
        title: 'Video nadzor 24/7',
        text: '48 HD kamera pokriva svaki metar parkinga. Snimci se arhiviraju 30 dana.',
      },
      anpr: {
        title: 'Automatske rampe i ANPR',
        text: 'Prepoznavanje tablica otvara rampu za nekoliko sekundi — bez papira i bez gužve.',
      },
      staff: {
        title: 'Osoblje na licu mjesta',
        text: 'Obezbjeđenje i radnik u svakoj smjeni, uključujući noći, praznike i vikende.',
      },
      lighting: {
        title: 'Rasvjeta i ograda',
        text: 'LED osvjetljenje cijelog prostora i ograda visine 2,4 m sa senzorima pokreta.',
      },
      insurance: {
        title: 'Osiguranje vozila',
        text: 'Osiguranje od odgovornosti je uključeno, a kasko do 50.000 KM dodajete po želji.',
      },
      help: {
        title: 'Pomoć na licu mjesta',
        text: 'Pokretanje akumulatora i napuhavanje guma — besplatno, kad god vam zatreba.',
      },
    },
    camera: {
      title: 'Video nadzor uživo',
      sectionAria: 'Video nadzor uživo',
      tabsAria: 'Kamere',
      connecting: 'Povezivanje s kamerom…',
      offline: 'Kamera trenutno nije dostupna',
      retry: 'Pokušaj ponovo',
      note: 'Prikaz je demonstracija. Kamere se povezuju putem NextFrame sučelja, a snimci se arhiviraju 30 dana.',
      imageAlt: (label: string) => `Kamera: ${label}`,
      cameras: {
        entrance: { label: 'Ulaz i rampa', zone: 'Glavni ulaz' },
        'covered-a': { label: 'Sektor A', zone: 'Natkriveni parking' },
        'open-b': { label: 'Sektor B', zone: 'Otvoreni parking' },
        shuttle: { label: 'Shuttle stanica', zone: 'Točka polaska' },
      },
    },
    occupancy: {
      title: 'Zauzetost parkinga',
      live: 'Uživo',
      free: 'slobodno',
      status: { full: 'Skoro popunjeno', filling: 'Popunjava se', plenty: 'Dosta mjesta' },
      sectors: { covered: 'Natkriveni sektor A', open: 'Otvoreni sektor B' },
    },
    barrier: {
      title: 'Automatska rampa',
      closed: { title: 'Rampa zatvorena', text: 'Čekam vozilo' },
      scanning: { title: 'Čitam tablice…', text: 'ANPR kamera aktivna' },
      open: { title: 'Rampa otvorena', text: 'Rezervacija pronađena' },
    },
  },

  shuttle: {
    eyebrow: 'Besplatan shuttle',
    title: 'Do terminala za pet minuta. Svakih petnaest.',
    description:
      'Prijevoz s prtljagom je besplatan i uključen u svaku rezervaciju. Pogledajte rutu i vrijeme sljedećeg polaska.',
    panelTitle: 'Besplatan shuttle',
    subtitle: (distance: string, minutes: number) => `${distance} do terminala · ${minutes} minuta vožnje`,
    frequency: 'Svakih 15 min · noću 30 min',
    mapAria: (minutes: number) => `Karta rute: shuttle vozi od parkinga do terminala za ${minutes} minuta`,
    parkingLabel: 'Sky Parking',
    terminalLabel: 'Terminal · SJJ',
    minutesChip: (minutes: number) => `${minutes} min`,
    fromParking: 'Polasci s parkinga',
    fromTerminal: 'Polasci s terminala',
    next: 'Sljedeći',
    landed: 'Sletjeli ste? Javite nam se i shuttle vas čeka ispred izlaza.',
    call: 'Pozovi',
    countdown: {
      now: 'sada',
      minutes: (n: number) => `za ${n} min`,
      hours: (hours: number, minutes: string) => `za ${hours} h ${minutes} min`,
    },
    facts: {
      free: { title: 'Potpuno besplatno', text: 'Prijevoz i prtljag su uključeni u cijenu parkinga — bez doplate.' },
      frequent: {
        title: 'Čest i pouzdan',
        text: 'Svakih 15 minuta tokom dana i svakih 30 minuta noću, svaki dan u godini.',
      },
      onCall: {
        title: 'Čeka vas nakon leta',
        text: 'Javite se nakon slijetanja i shuttle vas dočekuje ispred izlaza iz terminala.',
      },
    },
  },

  reviews: {
    eyebrow: 'Recenzije',
    title: 'Putnici nam vjeruju svoja vozila.',
    description: 'Hiljade putnika iz cijele Bosne i Hercegovine i dijaspore ostavlja auto kod nas — evo šta kažu.',
    googleCount: (count: string) => `${count} Google recenzija`,
    verified: 'Verifikovan putnik',
    ratingLabel: (rating: number) => `Ocjena ${rating} od 5`,
    flightTo: (destination: string) => `let za ${destination}`,
    disclaimer: 'Ocjene i recenzije su ilustrativne i bit će zamijenjene stvarnim prije objave.',
    stats: {
      travellers: 'ispraćenih putnika',
      rating: 'prosječna ocjena',
      minutes: 'do terminala',
      recommend: 'bi nas preporučilo',
    },
    items: {
      t1: {
        city: 'Sarajevo',
        date: 'septembar 2026.',
        trip: 'Istanbul',
        quote:
          'Prvi put smo ostavili auto na deset dana i nijednom nismo pomislili na njega. Shuttle je stigao za tri minute, a vozilo nas je dočekalo čisto i na istom mjestu.',
      },
      t2: {
        city: 'Zenica',
        date: 'august 2026.',
        trip: 'Frankfurt',
        quote:
          'Rezervacija je trajala manje od minute. Rampa me prepoznala po tablicama, bez ikakvih papira. Ovako bi trebalo svugdje da izgleda.',
      },
      t3: {
        city: 'Tuzla',
        date: 'januar 2026.',
        trip: 'Beč',
        quote:
          'Natkriveni sektor je spas zimi. Poslije sedmice u Beču auto je bio bez snijega i leda, a plaćanje pri preuzimanju je prošlo bez ikakvih iznenađenja.',
      },
      t4: {
        city: 'Mostar',
        date: 'juli 2026.',
        trip: 'Dubrovnik',
        quote:
          'Odlična usluga i ljubazno osoblje. U jutarnjoj špici shuttle je čekao par minuta, ali nas je s kuferima ukrcao i stigli smo na vrijeme.',
      },
      t5: {
        city: 'Travnik',
        date: 'juni 2026.',
        trip: 'Minhen',
        quote:
          'Putujemo dva puta godišnje i ovo nam je postao stalni izbor. Javimo se čim sletimo, a shuttle nas već čeka ispred terminala.',
      },
      t6: {
        city: 'Bihać',
        date: 'oktobar 2026.',
        trip: 'Cirih',
        quote:
          'Vozim kombi pa je bilo teško naći sigurno mjesto. Ovdje je cijena fer, PDV je uključen i nema skrivenih troškova. Preporuka.',
      },
    },
  },

  contact: {
    eyebrow: 'Kontakt',
    title: 'Tu smo — 0–24h, svaki dan.',
    description:
      'Pitanje o rezervaciji, kašnjenju leta ili preuzimanju vozila? Javite se kanalom koji vam najviše odgovara.',
    channels: {
      whatsapp: { label: 'WhatsApp', hint: 'Odgovaramo za par minuta' },
      viber: { label: 'Viber', hint: 'Poruka ili poziv' },
      phone: { label: 'Telefon', hint: 'Non-stop, 0–24h' },
      email: { label: 'E-mail', hint: 'Odgovor u roku od sat vremena' },
    },
    channelAria: (label: string, value: string) => `${label}: ${value}`,
    whatsappDates: (from: string, to: string) => `Zdravo! Zanima me parking od ${from} do ${to}.`,
    whatsappGeneric: 'Zdravo! Zanima me parking na aerodromu.',
    hours: {
      title: 'Radno vrijeme',
      openNow: 'Otvoreno sada',
      parking: { label: 'Parking i shuttle', value: 'Non-stop, 0–24h' },
      reception: { label: 'Recepcija', value: 'Non-stop, 0–24h' },
      admin: { label: 'Administracija', value: 'Pon–Pet, 08–18h' },
    },
    map: {
      aria: 'Karta lokacije',
      terminalTitle: 'Terminal aerodroma Sarajevo',
      distance: (distance: string) => `${distance} od parkinga`,
      shuttleLine: (minutes: number) => `Shuttle ${minutes} min, besplatno`,
      google: 'Google Maps',
      apple: 'Apple Maps',
    },
  },

  footer: {
    ctaTitle: 'Rezervišite mjesto za manje od minute.',
    ctaText: 'Bez avansa i bez registracije. Plaćate tek kada preuzmete vozilo.',
    about: (minutes: number) =>
      `Siguran parking i besplatan shuttle do terminala aerodroma Sarajevo — ${minutes} minuta od ulaza do prijave leta.`,
    country: 'Bosna i Hercegovina',
    navAria: 'Navigacija u podnožju',
    pages: 'Stranice',
    services: 'Usluge',
    legal: 'Pravno',
    language: 'Jezik',
    rights: (year: number, company: string) => `© ${year} ${company}. Sva prava zadržana.`,
    priceNote: 'Sve cijene su izražene u KM i uključuju PDV.',
    toTop: 'Na vrh',
  },

  legal: {
    updated: (date: string) => `Ažurirano ${date}`,
    backHome: 'Na početnu',
    docs: {
      terms: {
        title: 'Uslovi korištenja',
        updated: '1. oktobar 2026.',
        sections: [
          {
            heading: '1. Predmet usluge',
            body: '{{legalName}} pruža uslugu čuvanja vozila na ograđenom i video nadziranom parkingu te besplatan shuttle prijevoz do terminala aerodroma i nazad, u skladu s rezervisanim terminom.',
          },
          {
            heading: '2. Rezervacija i cijena',
            body: 'Rezervacija je potvrđena u trenutku kada dobijete referentni kod. Sve cijene su izražene u konvertibilnim markama (KM) i uključuju PDV. Obračun se vrši po svakom započetom periodu od 24 sata, računajući od vremena ostavljanja vozila.',
          },
          {
            heading: '3. Plaćanje',
            body: 'Plaćanje se vrši prilikom preuzimanja vozila, gotovinom ili platnom karticom. Online rezervacijom ne naplaćujemo nikakve avanse.',
          },
          {
            heading: '4. Otkazivanje i izmjene',
            body: 'Rezervaciju možete besplatno otkazati ili izmijeniti najkasnije 24 sata prije planiranog dolaska, putem telefona, e-maila ili poruke. U slučaju kasnijeg preuzimanja vozila od rezervisanog, dodatni dani se obračunavaju prema važećem cjenovniku.',
          },
          {
            heading: '5. Odgovornost',
            body: 'Vozilo je osigurano osiguranjem od odgovornosti operatera. Molimo da u vozilu ne ostavljate dokumente, novac i vrijedne predmete. Za štete nastale zbog više sile ili ranije postojećih oštećenja operater ne odgovara. Prilikom preuzimanja molimo provjerite vozilo i prijavite eventualnu štetu prije napuštanja parkinga.',
          },
        ],
      },
      privacy: {
        title: 'Politika privatnosti',
        updated: '1. oktobar 2026.',
        sections: [
          {
            heading: 'Ko obrađuje vaše podatke',
            body: 'Rukovalac ličnim podacima je {{legalName}}, {{street}}, {{city}}. Za sva pitanja možete nas kontaktirati na {{email}}.',
          },
          {
            heading: 'Koje podatke prikupljamo',
            body: 'Za potrebe rezervacije obrađujemo ime i prezime, e-mail adresu, broj telefona, registarske tablice i podatke o vozilu te broj leta ako ga navedete. Video nadzor i sistem za prepoznavanje tablica bilježe vozila na ulazu i izlazu.',
          },
          {
            heading: 'Svrha i rok čuvanja',
            body: 'Podatke koristimo isključivo za izvršenje rezervacije, komunikaciju s vama i zaštitu imovine. Podaci o rezervaciji čuvaju se u skladu sa zakonskim rokovima, a snimci video nadzora 30 dana.',
          },
          {
            heading: 'Vaša prava',
            body: 'U skladu sa Zakonom o zaštiti ličnih podataka u Bosni i Hercegovini imate pravo na pristup, ispravku i brisanje podataka. Zahtjev nam pošaljite e-mailom, a odgovorit ćemo u zakonskom roku.',
          },
        ],
      },
      cookies: {
        title: 'Politika kolačića',
        updated: '1. oktobar 2026.',
        sections: [
          {
            heading: 'Šta koristimo',
            body: 'Ova stranica ne koristi marketinške niti analitičke kolačiće trećih strana. Pohranjujemo samo vašu odabranu temu (svijetla ili tamna) i, ako rezervišete, evidenciju rezervacije u lokalnoj memoriji vašeg preglednika.',
          },
          {
            heading: 'Kako ih obrisati',
            body: 'Lokalne podatke možete u svakom trenutku obrisati u postavkama svog preglednika. Brisanjem se vraćaju podrazumijevane postavke stranice.',
          },
        ],
      },
    },
  },

  notFound: {
    code: '404',
    title: 'Stranica nije pronađena',
    text: 'Stranica koju tražite ne postoji ili je premještena. Provjerite adresu ili se vratite na početnu.',
    home: 'Na početnu',
    pricing: 'Pogledaj cijene',
  },

  booking: {
    title: 'Rezervacija parkinga',
    thanks: 'Hvala vam!',
    done: 'Gotovo',
    stepEyebrow: (step: number, days: string) => `Korak ${step} od 3 · ${days}`,
    stepsAria: 'Koraci rezervacije',
    stepLabels: { details: 'Detalji', vehicle: 'Vozilo', confirm: 'Potvrda' },
    stepTitles: { one: 'Kada i šta parkirate?', two: 'Vozilo i kontakt', three: 'Pregled i potvrda' },
    total: 'Ukupno',
    next: 'Nastavi',
    back: 'Nazad',
    confirmButton: 'Potvrdi rezervaciju',
    confirmedHeading: 'Rezervacija je potvrđena',
    vehicleStep: {
      vehicleLegend: 'Vaše vozilo',
      plate: 'Registarske tablice',
      platePlaceholder: 'A12-K-345',
      make: 'Marka i model',
      makePlaceholder: 'Volkswagen Golf 7',
      color: 'Boja',
      colorPlaceholder: 'Siva',
      passengers: 'Broj putnika',
      flight: 'Broj leta',
      flightPlaceholder: 'JU 123',
      flightHint: 'Pratimo kašnjenja leta i prilagođavamo shuttle.',
      contactLegend: 'Kontakt podaci',
      fullName: 'Ime i prezime',
      fullNamePlaceholder: 'Amar Hodžić',
      email: 'E-mail',
      emailPlaceholder: 'ime@primjer.ba',
      phone: 'Telefon',
      phonePlaceholder: '061 000 000',
    },
    confirmStep: {
      totalToPay: 'Ukupno za plaćanje',
      vatIncluded: 'PDV uključen',
      ofWhichVat: (vat: string) => `od toga PDV ${vat}`,
      paymentBefore: 'Plaćanje se vrši ',
      paymentStrong: 'pri preuzimanju vozila',
      paymentAfter: ' — gotovinom ili karticom. Ne naplaćujemo avans.',
      termsSummary: 'Sažetak uslova',
      show: 'Prikaži',
      hide: 'Sakrij',
      terms: [
        'Besplatno otkazivanje ili izmjena do 24 sata prije dolaska.',
        'Svaki započeti period od 24 sata obračunava se kao cijeli dan.',
        'Vozilo je osigurano osiguranjem od odgovornosti operatera.',
        'Molimo ne ostavljajte dokumente i vrijedne predmete u vozilu.',
      ],
      consent:
        'Upoznat/a sam s uslovima korištenja i politikom privatnosti i slažem se s obradom podataka za potrebe rezervacije.',
      consentError: 'Potvrdite da ste upoznati s uslovima.',
    },
    summary: {
      dropOff: 'Ostavljanje',
      pickUp: 'Preuzimanje',
      at: (time: string) => `u ${time}`,
      duration: 'Trajanje',
      parking: 'Parking',
      vehicle: 'Vozilo',
      passengers: 'Putnici',
      flight: (flight: string) => `Let ${flight}`,
      contact: 'Kontakt',
      parkingPrice: 'Cijena parkinga',
    },
    success: {
      heldBefore: 'Vaše mjesto je zadržano. Rampa će prepoznati tablice ',
      heldAfter: ' pri dolasku.',
      referenceCode: 'Referentni kod',
      codeAria: (code: string) => `Kod: ${code}`,
      copyCode: 'Kopiraj kod',
      codeCopied: 'Kod je kopiran',
      arrival: 'Dolazak',
      returning: 'Povratak',
      duration: 'Trajanje',
      payOnPickup: 'Plaćanje pri preuzimanju',
      addToCalendar: 'U kalendar',
      share: 'Podijeli',
      changesBefore: 'Izmjene ili otkazivanje: najkasnije 24h prije dolaska na ',
      changesOr: ' ili ',
      changesAfter: '.',
      whatsappGreeting: (reference: string) => `Poštovanje, javljam se u vezi rezervacije ${reference}.`,
      shareText: (reference: string, company: string, dropOff: string, pickUp: string, plate: string) =>
        `Rezervacija ${reference} — ${company}\nOstavljanje: ${dropOff}\nPreuzimanje: ${pickUp}\nVozilo: ${plate}`,
    },
    errors: {
      network: 'Nema veze sa serverom. Provjerite internet i pokušajte ponovo.',
      timeout: 'Veza je prespora. Provjerite internet i pokušajte ponovo.',
      server: 'Server trenutno ne može obraditi rezervaciju. Pokušajte ponovo.',
      aborted: 'Slanje je prekinuto.',
      unknown: 'Došlo je do greške. Pokušajte ponovo.',
    },
    ics: {
      dropOff: 'Parking — ostavljanje vozila',
      pickUp: 'Parking — preuzimanje vozila',
      description: (reference: string, plate: string, phone: string) =>
        `Rezervacija ${reference} · vozilo ${plate} · ${phone}`,
      calendarName: 'Rezervacije',
    },
  },
};

export type Messages = typeof bs;
