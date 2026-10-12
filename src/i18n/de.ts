import type { Messages } from './bs';

/** German plural: 1 Tag / 2+ Tage. */
const plural = (count: number, one: string, many: string): string => (Math.abs(count) === 1 ? one : many);

export const de: Messages = {
  meta: {
    siteName: 'Sky Parking & Fly',
    ogLocale: 'de_DE',
    pages: {
      home: {
        title: 'Sky Parking & Fly — Sicheres Flughafenparken mit Shuttle-Transfer',
        description:
          'Bewachter Parkplatz nur wenige Minuten vom Terminal, Videoüberwachung rund um die Uhr, kostenloser Shuttle und versicherte Fahrzeuge. Preis berechnen und in unter einer Minute online buchen.',
      },
      pricing: {
        title: 'Preise und Parkrechner — Sky Parking & Fly',
        description:
          'Transparente Preise fürs Flughafenparken: überdacht und unter freiem Himmel, Rabatte für längere Aufenthalte und ein Rechner, der den Gesamtpreis inklusive MwSt. sofort anzeigt.',
      },
      facilities: {
        title: 'Einrichtungen und Sicherheit — Sky Parking & Fly',
        description:
          'Live-Videoüberwachung, automatische Schranken mit Kennzeichenerkennung, Personal vor Ort rund um die Uhr und die aktuelle Auslastung des Parkplatzes an einem Ort.',
      },
      shuttle: {
        title: 'Kostenloser Shuttle zum Terminal — Sky Parking & Fly',
        description:
          'Kostenloser Shuttle alle 15 Minuten zum Terminal des Flughafens Sarajevo. Strecke, Fahrplan und Zeit bis zum nächsten Shuttle auf einen Blick.',
      },
      reviews: {
        title: 'Reisendenbewertungen — Sky Parking & Fly',
        description:
          'Was Reisende sagen, die ihr Auto bei uns abgestellt haben: Bewertungen, Erfahrungen und verifizierte Rezensionen.',
      },
      contact: {
        title: 'Kontakt — Sky Parking & Fly',
        description:
          'Erreichen Sie uns per WhatsApp, Viber, Telefon oder E-Mail. Öffnungszeiten, Adresse und Lage des Parkplatzes auf der Karte.',
      },
      terms: {
        title: 'Nutzungsbedingungen — Sky Parking & Fly',
        description: 'Nutzungsbedingungen für den Parkservice und den Shuttle-Transfer.',
      },
      privacy: {
        title: 'Datenschutzerklärung — Sky Parking & Fly',
        description: 'Wie wir Ihre personenbezogenen Daten verarbeiten und schützen.',
      },
      cookies: {
        title: 'Cookie-Richtlinie — Sky Parking & Fly',
        description: 'Welche Daten diese Website in Ihrem Browser speichert.',
      },
      notFound: {
        title: 'Seite nicht gefunden — Sky Parking & Fly',
        description: 'Die angeforderte Seite existiert nicht.',
      },
    },
  },

  common: {
    skipToContent: 'Zum Inhalt springen',
    close: 'Schließen',
    optional: 'Optional',
    back: 'Zurück',
    loading: 'Wird geladen…',
  },

  language: {
    label: 'Sprache',
    names: { bs: 'Bosanski', en: 'English', de: 'Deutsch' },
    codes: { bs: 'BS', en: 'EN', de: 'DE' },
    switchTo: (name: string) => `Sprache wechseln: ${name}`,
  },

  nav: {
    aria: 'Hauptnavigation',
    homeAria: 'Sky Parking & Fly — Startseite',
    pages: {
      home: 'Startseite',
      pricing: 'Preise',
      facilities: 'Einrichtungen',
      shuttle: 'Shuttle',
      reviews: 'Bewertungen',
      contact: 'Kontakt',
      terms: 'Nutzungsbedingungen',
      privacy: 'Datenschutzerklärung',
      cookies: 'Cookie-Richtlinie',
    },
    book: 'Buchen',
    bookParking: 'Parkplatz buchen',
    callUs: (phone: string) => `Rufen Sie uns an: ${phone}`,
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
    switchToLight: 'Zum hellen Design wechseln',
    switchToDark: 'Zum dunklen Design wechseln',
    lightTheme: 'Helles Design',
    darkTheme: 'Dunkles Design',
  },

  date: {
    weekdaysLong: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    weekdaysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    calendarHeader: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    monthsLong: [
      'Januar',
      'Februar',
      'März',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'Dezember',
    ],
    monthsShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    short: (weekday: string, day: number, month: string) => `${weekday}, ${day}. ${month}`,
    long: (weekday: string, day: number, month: string, year: number) => `${weekday}, ${day}. ${month} ${year}`,
    monthTitle: (month: string, year: number) => `${month} ${year}`,
  },

  units: {
    days: (n: number) => `${n} ${plural(n, 'Tag', 'Tage')}`,
    dayWord: (n: number) => plural(n, 'Tag', 'Tage'),
    services: (n: number) => `${n} ${plural(n, 'Leistung', 'Leistungen')}`,
    perDayShort: '/Tag',
    perDayLong: 'pro Tag',
    kmPerDay: 'KM / Tag',
  },

  validation: {
    stay: {
      dropOffMissing: 'Wählen Sie Datum und Uhrzeit für die Abgabe Ihres Fahrzeugs.',
      dropOffPast: 'Die Abgabezeit liegt bereits in der Vergangenheit.',
      pickUpMissing: 'Wählen Sie Datum und Uhrzeit für die Abholung Ihres Fahrzeugs.',
      pickUpBeforeDropOff: 'Die Abholung muss nach der Abgabe liegen.',
      rangeTooLong: (maxDays: number) =>
        `Online-Buchungen sind bis zu ${maxDays} ${plural(maxDays, 'Tag', 'Tagen')} möglich. Für längere Aufenthalte kontaktieren Sie uns bitte.`,
    },
    fullName: {
      required: 'Geben Sie Ihren vollständigen Namen ein.',
      invalid: 'Geben Sie Vor- und Nachnamen ein (z. B. Amar Hodžić).',
    },
    email: { required: 'Geben Sie Ihre E-Mail-Adresse ein.', invalid: 'Die E-Mail-Adresse ist ungültig.' },
    phone: {
      required: 'Geben Sie Ihre Telefonnummer ein.',
      invalid: 'Die Telefonnummer ist ungültig (z. B. 061 000 000).',
    },
    plate: { required: 'Geben Sie das Kennzeichen ein.', invalid: 'Das Kennzeichen ist ungültig (z. B. A12-K-345).' },
    make: { required: 'Geben Sie Marke und Modell des Fahrzeugs ein.' },
    passengers: {
      required: 'Geben Sie die Anzahl der Mitreisenden ein.',
      range: 'Die Personenzahl muss zwischen 1 und 8 liegen.',
    },
    flightNumber: { invalid: 'Die Flugnummer ist ungültig (z. B. JU 123).' },
  },

  pricing: {
    tiers: {
      short: { label: '1–3 Tage', hint: 'Kurztrip' },
      week: { label: '4–7 Tage', hint: 'Woche' },
      extended: { label: '8–14 Tage', hint: 'Verlängert' },
      long: { label: '15+ Tage', hint: 'Langzeit' },
    },
    vehicles: {
      car: { label: 'Pkw', shortLabel: 'Pkw', hint: 'Personenwagen' },
      suv: { label: 'SUV', shortLabel: 'SUV', hint: 'Geländewagen / Crossover' },
      van: { label: 'Transporter', shortLabel: 'Van', hint: 'Bis 3,5 t' },
      moto: { label: 'Motorrad', shortLabel: 'Motorrad', hint: 'Krad' },
    },
    covers: {
      open: { label: 'Unter freiem Himmel', description: 'Beleuchteter und umzäunter Außenbereich' },
      covered: { label: 'Überdacht', description: 'Schutz vor Schnee, Hagel und Sonne' },
    },
    extras: {
      wash: {
        label: 'Außenwäsche',
        shortLabel: 'Außenwäsche',
        description: 'Handwäsche und Trocknung, während Sie unterwegs sind.',
      },
      interior: {
        label: 'Innenreinigung',
        shortLabel: 'Innenreinigung',
        description: 'Staubsaugen sowie Reinigung von Scheiben und Armaturen.',
      },
      ev: {
        label: 'Laden des Elektrofahrzeugs',
        shortLabel: 'E-Laden',
        description: 'Ein voller Akku erwartet Sie bei Ihrer Rückkehr.',
      },
      valet: {
        label: 'VIP-Abholung am Terminal',
        shortLabel: 'VIP-Abholung',
        description: 'Wir bringen Ihr Auto direkt zum Ausgang.',
      },
      insurance: {
        label: 'Erweiterter Fahrzeugschutz',
        shortLabel: 'Erweiterter Schutz',
        description: 'Kaskoschutz bis 50.000 KM.',
      },
    },
  },

  hero: {
    badge: 'Flughafen Sarajevo · rund um die Uhr geöffnet',
    titleLine1: 'Parken ohne Sorgen.',
    titleLine2: 'Fliegen ohne Stress.',
    lead: (minutes: number) =>
      `Bewachter, videoüberwachter Parkplatz ${minutes} Minuten vom Terminal. Kostenloser Shuttle, versichertes Fahrzeug und ein Preis, den Sie vorab sehen.`,
    cta: 'Parkplatz buchen',
    ctaSecondary: 'Preise ansehen',
    ratingSuffix: (count: string) => `bei Google · ${count} Bewertungen`,
    valueProps: {
      secure: { title: 'Bewachter Parkplatz', text: 'Umzäuntes Gelände mit Personal rund um die Uhr' },
      cctv: { title: 'Videoüberwachung 24/7', text: '48 Kameras, Aufnahmen 30 Tage' },
      shuttle: { title: 'Kostenloser Shuttle', text: '5 Minuten zum Terminal' },
      insured: { title: 'Versicherte Fahrzeuge', text: 'Haftpflichtversicherung inklusive' },
    },
  },

  widget: {
    title: 'Schnellbuchung',
    noDeposit: 'Keine Anzahlung',
    estimate: 'Preisschätzung',
    rateLine: (rate: string) => `${rate} / Tag · inkl. MwSt.`,
    saving: (amount: string) => `Sie sparen ${amount}`,
    continue: 'Weiter zur Buchung',
    footnote: 'Zahlung bei Abholung · Kostenlose Stornierung bis 24 Std. vor Ankunft',
  },

  stayForm: {
    coverLabel: 'Parkplatzart',
    dropOffTime: 'Uhrzeit der Abgabe',
    pickUpTime: 'Uhrzeit der Abholung',
    vehicleLabel: 'Fahrzeugart',
    extrasLabel: 'Zusatzleistungen',
  },

  dateRange: {
    dropOff: 'Abgabe',
    pickUp: 'Abholung',
    choose: 'Wählen',
    dialog: 'Datumsauswahl',
    prevMonth: 'Voriger Monat',
    nextMonth: 'Nächster Monat',
    today: 'heute',
    hintDropOff: 'Wählen Sie den Tag der Abgabe',
    hintPickUp: 'Wählen Sie jetzt den Tag der Abholung',
    hintPickUpHover: (date: string) => `Abholung: ${date}`,
  },

  how: {
    eyebrow: "So funktioniert's",
    title: 'Von der Buchung bis zum Abflug — in vier Schritten.',
    description: 'Ohne Papierkram, ohne Warten an der Schranke und ohne Hetzen mit dem Koffer zum Terminal.',
    steps: {
      book: {
        title: 'Online buchen',
        text: 'Wählen Sie Termin und Leistungen — den Preis sehen Sie sofort, die Bestätigung kommt in Sekunden.',
      },
      arrive: {
        title: 'Ankunft ohne Warten',
        text: 'Eine Kamera erkennt Ihr Kennzeichen und öffnet die Schranke. Unser Personal weist Sie zu Ihrem reservierten Platz.',
      },
      shuttle: {
        title: 'Shuttle zum Terminal',
        text: 'Kostenlose Fahrt samt Gepäck — nur fünf Minuten bis zum Check-in.',
      },
      return: {
        title: 'Entspannte Rückkehr',
        text: 'Melden Sie sich nach der Landung. Der Shuttle wartet, und Ihr Auto steht genau dort, wo Sie es abgestellt haben.',
      },
    },
  },

  home: {
    exploreEyebrow: 'Entdecken',
    exploreTitle: 'Alles Wichtige vor dem Abflug.',
    exploreDescription:
      'Preise, Sicherheit, Shuttle und Erfahrungen anderer Reisender — jeweils auf einer eigenen Seite.',
    pricing: {
      eyebrow: 'Preise',
      headline: (price: string) => `ab ${price} / Tag`,
      text: 'Eine transparente Preisliste, ein Echtzeit-Rechner und Rabatt bei längeren Aufenthalten.',
      link: 'Preis berechnen',
    },
    facilities: {
      eyebrow: 'Einrichtungen',
      headline: '48 Kameras',
      badge: 'Rund um die Uhr überwacht',
      text: 'Videoüberwachung, automatische Schranke und Personal vor Ort — die Auslastung sehen Sie live.',
      link: 'Einrichtungen ansehen',
    },
    shuttle: {
      eyebrow: 'Shuttle',
      next: 'Nächste Abfahrt',
      text: 'Kostenlose Fahrt zum Terminal alle 15 Minuten, nachts alle 30 Minuten.',
      link: 'Fahrplan ansehen',
    },
    reviews: {
      eyebrow: 'Bewertungen',
      headline: (score: string) => `${score} / 5`,
      text: (count: string) => `${count} Google-Bewertungen und tausende zufriedene Reisende.`,
      link: 'Erfahrungen lesen',
    },
  },

  calculator: {
    eyebrow: 'Preise und Leistungen',
    title: 'Der Preis, den Sie vorab sehen. Ohne Überraschungen.',
    description:
      'Je länger Sie bleiben, desto günstiger wird jeder Tag. Stellen Sie Dauer, Parkplatzart und Leistungen ein — der Gesamtpreis aktualisiert sich sofort.',
    coveredAria: 'Überdachter Parkplatz',
    standard: 'Standard',
    yourChoice: 'Ihre Wahl',
    noteCar: (vat: string) =>
      `Preise für einen Pkw · MwSt. (${vat}) inklusive · jeder angefangene Tag (24 Std.) zählt als voller Tag`,
    noteOther: (vat: string) =>
      `Preise für das gewählte Fahrzeug · MwSt. (${vat}) inklusive · jeder angefangene Tag (24 Std.) zählt als voller Tag`,
    duration: 'Aufenthaltsdauer',
    dayLess: 'Einen Tag weniger',
    dayMore: 'Einen Tag mehr',
    vehicleTitle: 'Fahrzeugart',
    extrasTitle: 'Zusatzleistungen',
    summaryTitle: 'Ihre Schätzung',
    parking: 'Parken',
    savings: 'Ersparnis bei längerem Aufenthalt',
    vatIncluded: 'inkl. MwSt.',
    coveredLower: 'überdacht',
    openLower: 'unter freiem Himmel',
    reserveFor: (total: string) => `Buchen für ${total}`,
    included: [
      'Kostenloser Shuttle alle 15 Minuten',
      'Videoüberwachung 24/7 und Personal vor Ort',
      'Haftpflichtversicherung für das Fahrzeug',
      'Hilfe: Starthilfe und Reifen aufpumpen',
    ],
  },

  facilities: {
    eyebrow: 'Einrichtungen und Sicherheit',
    title: 'Ihr Fahrzeug steht 24 Stunden am Tag unter Beobachtung.',
    description:
      'Sehen Sie, wie der Parkplatz gerade aussieht — Videoüberwachung, Auslastung und automatische Schranke an einem Ort.',
    features: {
      cctv: {
        title: 'Videoüberwachung 24/7',
        text: '48 HD-Kameras decken jeden Meter des Parkplatzes ab. Aufnahmen werden 30 Tage archiviert.',
      },
      anpr: {
        title: 'Automatische Schranken und ANPR',
        text: 'Die Kennzeichenerkennung öffnet die Schranke in Sekunden — ohne Papierkram und ohne Stau.',
      },
      staff: {
        title: 'Personal vor Ort',
        text: 'Sicherheitsdienst und Mitarbeiter in jeder Schicht, auch nachts, an Feiertagen und am Wochenende.',
      },
      lighting: {
        title: 'Beleuchtung und Zaun',
        text: 'LED-Beleuchtung auf dem gesamten Gelände und ein 2,4 m hoher Zaun mit Bewegungssensoren.',
      },
      insurance: {
        title: 'Fahrzeugversicherung',
        text: 'Die Haftpflichtversicherung ist inklusive, Kaskoschutz bis 50.000 KM können Sie optional hinzubuchen.',
      },
      help: {
        title: 'Hilfe vor Ort',
        text: 'Starthilfe und Reifen aufpumpen — kostenlos, wann immer Sie es brauchen.',
      },
    },
    camera: {
      title: 'Live-Videoüberwachung',
      sectionAria: 'Live-Videoüberwachung',
      tabsAria: 'Kameras',
      connecting: 'Verbindung zur Kamera wird hergestellt…',
      offline: 'Diese Kamera ist derzeit nicht verfügbar',
      retry: 'Erneut versuchen',
      note: 'Diese Ansicht ist eine Demonstration. Die Kameras werden über eine NextFrame-Schnittstelle angebunden, Aufnahmen werden 30 Tage archiviert.',
      imageAlt: (label: string) => `Kamera: ${label}`,
      cameras: {
        entrance: { label: 'Einfahrt und Schranke', zone: 'Haupteinfahrt' },
        'covered-a': { label: 'Bereich A', zone: 'Überdachter Parkplatz' },
        'open-b': { label: 'Bereich B', zone: 'Parkplatz im Freien' },
        shuttle: { label: 'Shuttle-Haltestelle', zone: 'Abfahrtspunkt' },
      },
    },
    occupancy: {
      title: 'Parkplatzauslastung',
      live: 'Live',
      free: 'frei',
      status: { full: 'Fast voll', filling: 'Füllt sich', plenty: 'Viel Platz' },
      sectors: { covered: 'Überdachter Bereich A', open: 'Freier Bereich B' },
    },
    barrier: {
      title: 'Automatische Schranke',
      closed: { title: 'Schranke geschlossen', text: 'Warte auf ein Fahrzeug' },
      scanning: { title: 'Kennzeichen wird gelesen…', text: 'ANPR-Kamera aktiv' },
      open: { title: 'Schranke geöffnet', text: 'Buchung gefunden' },
    },
  },

  shuttle: {
    eyebrow: 'Kostenloser Shuttle',
    title: 'Fünf Minuten zum Terminal. Alle fünfzehn Minuten.',
    description:
      'Die Fahrt samt Gepäck ist kostenlos und in jeder Buchung enthalten. Sehen Sie die Strecke und die nächste Abfahrt.',
    panelTitle: 'Kostenloser Shuttle',
    subtitle: (distance: string, minutes: number) => `${distance} zum Terminal · ${minutes} Minuten Fahrt`,
    frequency: 'Alle 15 Min. · nachts alle 30 Min.',
    mapAria: (minutes: number) => `Streckenkarte: Der Shuttle fährt in ${minutes} Minuten vom Parkplatz zum Terminal`,
    parkingLabel: 'Sky Parking',
    terminalLabel: 'Terminal · SJJ',
    minutesChip: (minutes: number) => `${minutes} Min.`,
    fromParking: 'Abfahrten vom Parkplatz',
    fromTerminal: 'Abfahrten vom Terminal',
    next: 'Nächste',
    landed: 'Gerade gelandet? Rufen Sie uns an, und der Shuttle wartet vor dem Ausgang.',
    call: 'Anrufen',
    countdown: {
      now: 'jetzt',
      minutes: (n: number) => `in ${n} Min.`,
      hours: (hours: number, minutes: string) => `in ${hours} Std. ${minutes} Min.`,
    },
    facts: {
      free: { title: 'Komplett kostenlos', text: 'Fahrt und Gepäck sind im Parkpreis enthalten — ohne Aufpreis.' },
      frequent: {
        title: 'Häufig und zuverlässig',
        text: 'Tagsüber alle 15 Minuten, nachts alle 30 Minuten — an jedem Tag des Jahres.',
      },
      onCall: {
        title: 'Wartet nach Ihrem Flug',
        text: 'Melden Sie sich nach der Landung, und der Shuttle holt Sie am Terminalausgang ab.',
      },
    },
  },

  reviews: {
    eyebrow: 'Bewertungen',
    title: 'Reisende vertrauen uns ihre Fahrzeuge an.',
    description:
      'Tausende Reisende aus ganz Bosnien und Herzegowina und der Diaspora lassen ihr Auto bei uns — das sagen sie.',
    googleCount: (count: string) => `${count} Google-Bewertungen`,
    verified: 'Verifizierter Reisender',
    ratingLabel: (rating: number) => `Bewertung ${rating} von 5`,
    flightTo: (destination: string) => `Flug nach ${destination}`,
    disclaimer: 'Bewertungen und Rezensionen sind beispielhaft und werden vor dem Start durch echte ersetzt.',
    stats: {
      travellers: 'verabschiedete Reisende',
      rating: 'Durchschnittsbewertung',
      minutes: 'zum Terminal',
      recommend: 'würden uns empfehlen',
    },
    items: {
      t1: {
        city: 'Sarajevo',
        date: 'September 2026',
        trip: 'Istanbul',
        quote:
          'Wir haben unser Auto zum ersten Mal zehn Tage stehen lassen und keinen Moment daran gedacht. Der Shuttle war in drei Minuten da, und das Auto stand sauber am selben Platz.',
      },
      t2: {
        city: 'Zenica',
        date: 'August 2026',
        trip: 'Frankfurt',
        quote:
          'Die Buchung dauerte weniger als eine Minute. Die Schranke hat mein Kennzeichen erkannt, ganz ohne Papiere. So sollte es überall sein.',
      },
      t3: {
        city: 'Tuzla',
        date: 'Januar 2026',
        trip: 'Wien',
        quote:
          'Der überdachte Bereich ist im Winter Gold wert. Nach einer Woche in Wien war das Auto frei von Schnee und Eis, und die Zahlung bei der Abholung verlief ohne Überraschungen.',
      },
      t4: {
        city: 'Mostar',
        date: 'Juli 2026',
        trip: 'Dubrovnik',
        quote:
          'Toller Service und freundliches Personal. Im Morgenverkehr musste der Shuttle ein paar Minuten warten, hat uns aber samt Koffern mitgenommen, und wir waren pünktlich da.',
      },
      t5: {
        city: 'Travnik',
        date: 'Juni 2026',
        trip: 'München',
        quote:
          'Wir reisen zweimal im Jahr, und das ist unsere feste Wahl geworden. Wir melden uns gleich nach der Landung, und der Shuttle wartet schon vor dem Terminal.',
      },
      t6: {
        city: 'Bihać',
        date: 'Oktober 2026',
        trip: 'Zürich',
        quote:
          'Ich fahre einen Transporter, deshalb war ein sicherer Stellplatz schwer zu finden. Hier ist der Preis fair, die MwSt. ist enthalten und es gibt keine versteckten Kosten. Empfehlenswert.',
      },
    },
  },

  contact: {
    eyebrow: 'Kontakt',
    title: 'Wir sind da — rund um die Uhr, jeden Tag.',
    description:
      'Eine Frage zur Buchung, zu einem verspäteten Flug oder zur Abholung Ihres Fahrzeugs? Erreichen Sie uns über den Kanal, der Ihnen am besten passt.',
    channels: {
      whatsapp: { label: 'WhatsApp', hint: 'Wir antworten innerhalb weniger Minuten' },
      viber: { label: 'Viber', hint: 'Nachricht oder Anruf' },
      phone: { label: 'Telefon', hint: 'Nonstop, rund um die Uhr' },
      email: { label: 'E-Mail', hint: 'Antwort innerhalb einer Stunde' },
    },
    channelAria: (label: string, value: string) => `${label}: ${value}`,
    whatsappDates: (from: string, to: string) =>
      `Guten Tag! Ich interessiere mich für einen Parkplatz am Flughafen von ${from} bis ${to}.`,
    whatsappGeneric: 'Guten Tag! Ich interessiere mich für einen Parkplatz am Flughafen.',
    hours: {
      title: 'Öffnungszeiten',
      openNow: 'Jetzt geöffnet',
      parking: { label: 'Parkplatz und Shuttle', value: 'Nonstop, rund um die Uhr' },
      reception: { label: 'Rezeption', value: 'Nonstop, rund um die Uhr' },
      admin: { label: 'Verwaltung', value: 'Mo–Fr, 08–18 Uhr' },
    },
    map: {
      aria: 'Standortkarte',
      terminalTitle: 'Terminal des Flughafens Sarajevo',
      distance: (distance: string) => `${distance} vom Parkplatz`,
      shuttleLine: (minutes: number) => `Shuttle ${minutes} Min., kostenlos`,
      google: 'Google Maps',
      apple: 'Apple Karten',
    },
  },

  footer: {
    ctaTitle: 'Buchen Sie Ihren Platz in unter einer Minute.',
    ctaText: 'Ohne Anzahlung und ohne Registrierung. Sie zahlen erst, wenn Sie Ihr Fahrzeug abholen.',
    about: (minutes: number) =>
      `Sicherer Parkplatz und kostenloser Shuttle zum Terminal des Flughafens Sarajevo — ${minutes} Minuten von der Einfahrt bis zum Check-in.`,
    country: 'Bosnien und Herzegowina',
    navAria: 'Navigation im Fußbereich',
    pages: 'Seiten',
    services: 'Leistungen',
    legal: 'Rechtliches',
    language: 'Sprache',
    rights: (year: number, company: string) => `© ${year} ${company}. Alle Rechte vorbehalten.`,
    priceNote: 'Alle Preise sind in KM angegeben und enthalten die MwSt.',
    toTop: 'Nach oben',
  },

  legal: {
    updated: (date: string) => `Aktualisiert am ${date}`,
    backHome: 'Zur Startseite',
    docs: {
      terms: {
        title: 'Nutzungsbedingungen',
        updated: '1. Oktober 2026',
        sections: [
          {
            heading: '1. Gegenstand der Leistung',
            body: '{{legalName}} bietet die Verwahrung von Fahrzeugen auf einem umzäunten, videoüberwachten Parkplatz sowie einen kostenlosen Shuttle-Transfer zum und vom Flughafenterminal entsprechend dem gebuchten Zeitraum an.',
          },
          {
            heading: '2. Buchung und Preis',
            body: 'Eine Buchung ist bestätigt, sobald Sie einen Referenzcode erhalten. Alle Preise sind in konvertiblen Mark (KM) angegeben und enthalten die MwSt. Abgerechnet wird jeder angefangene 24-Stunden-Zeitraum ab dem Zeitpunkt der Fahrzeugabgabe.',
          },
          {
            heading: '3. Zahlung',
            body: 'Die Zahlung erfolgt bei der Abholung des Fahrzeugs in bar oder per Karte. Bei Online-Buchungen erheben wir keine Anzahlung.',
          },
          {
            heading: '4. Stornierung und Änderungen',
            body: 'Sie können eine Buchung bis 24 Stunden vor der geplanten Ankunft kostenlos per Telefon, E-Mail oder Nachricht stornieren oder ändern. Wird das Fahrzeug später als gebucht abgeholt, werden die zusätzlichen Tage nach der gültigen Preisliste berechnet.',
          },
          {
            heading: '5. Haftung',
            body: 'Das Fahrzeug ist über die Haftpflichtversicherung des Betreibers versichert. Bitte lassen Sie keine Dokumente, kein Bargeld und keine Wertgegenstände im Fahrzeug. Für Schäden durch höhere Gewalt oder bereits bestehende Schäden haftet der Betreiber nicht. Bitte prüfen Sie das Fahrzeug bei der Abholung und melden Sie etwaige Schäden, bevor Sie den Parkplatz verlassen.',
          },
        ],
      },
      privacy: {
        title: 'Datenschutzerklärung',
        updated: '1. Oktober 2026',
        sections: [
          {
            heading: 'Wer Ihre Daten verarbeitet',
            body: 'Verantwortlich für die Verarbeitung personenbezogener Daten ist {{legalName}}, {{street}}, {{city}}. Bei Fragen erreichen Sie uns unter {{email}}.',
          },
          {
            heading: 'Welche Daten wir erheben',
            body: 'Für eine Buchung verarbeiten wir Ihren Namen, Ihre E-Mail-Adresse, Telefonnummer, das Kennzeichen und Fahrzeugdaten sowie Ihre Flugnummer, falls Sie diese angeben. Videoüberwachung und Kennzeichenerkennung erfassen Fahrzeuge bei Ein- und Ausfahrt.',
          },
          {
            heading: 'Zweck und Speicherdauer',
            body: 'Wir verwenden die Daten ausschließlich zur Durchführung der Buchung, zur Kommunikation mit Ihnen und zum Schutz des Eigentums. Buchungsdaten werden entsprechend den gesetzlichen Fristen aufbewahrt, Videoaufnahmen 30 Tage.',
          },
          {
            heading: 'Ihre Rechte',
            body: 'Nach dem Gesetz über den Schutz personenbezogener Daten in Bosnien und Herzegowina haben Sie das Recht auf Auskunft, Berichtigung und Löschung Ihrer Daten. Senden Sie uns Ihre Anfrage per E-Mail, wir antworten innerhalb der gesetzlichen Frist.',
          },
        ],
      },
      cookies: {
        title: 'Cookie-Richtlinie',
        updated: '1. Oktober 2026',
        sections: [
          {
            heading: 'Was wir verwenden',
            body: 'Diese Website verwendet keine Marketing- oder Analyse-Cookies von Drittanbietern. Wir speichern nur das von Ihnen gewählte Design (hell oder dunkel) und, falls Sie buchen, einen Buchungsvermerk im lokalen Speicher Ihres Browsers.',
          },
          {
            heading: 'So löschen Sie die Daten',
            body: 'Lokale Daten können Sie jederzeit in den Einstellungen Ihres Browsers löschen. Dadurch werden die Standardeinstellungen der Website wiederhergestellt.',
          },
        ],
      },
    },
  },

  notFound: {
    code: '404',
    title: 'Seite nicht gefunden',
    text: 'Die gesuchte Seite existiert nicht oder wurde verschoben. Prüfen Sie die Adresse oder kehren Sie zur Startseite zurück.',
    home: 'Zur Startseite',
    pricing: 'Preise ansehen',
  },

  booking: {
    title: 'Parkplatzbuchung',
    thanks: 'Vielen Dank!',
    done: 'Fertig',
    stepEyebrow: (step: number, days: string) => `Schritt ${step} von 3 · ${days}`,
    stepsAria: 'Buchungsschritte',
    stepLabels: { details: 'Details', vehicle: 'Fahrzeug', confirm: 'Bestätigen' },
    stepTitles: { one: 'Wann und was parken Sie?', two: 'Fahrzeug und Kontakt', three: 'Prüfen und bestätigen' },
    total: 'Gesamt',
    next: 'Weiter',
    back: 'Zurück',
    confirmButton: 'Buchung bestätigen',
    confirmedHeading: 'Buchung bestätigt',
    vehicleStep: {
      vehicleLegend: 'Ihr Fahrzeug',
      plate: 'Kennzeichen',
      platePlaceholder: 'A12-K-345',
      make: 'Marke und Modell',
      makePlaceholder: 'Volkswagen Golf 7',
      color: 'Farbe',
      colorPlaceholder: 'Grau',
      passengers: 'Anzahl der Personen',
      flight: 'Flugnummer',
      flightPlaceholder: 'JU 123',
      flightHint: 'Wir verfolgen Flugverspätungen und passen den Shuttle an.',
      contactLegend: 'Kontaktdaten',
      fullName: 'Vor- und Nachname',
      fullNamePlaceholder: 'Max Mustermann',
      email: 'E-Mail',
      emailPlaceholder: 'name@beispiel.de',
      phone: 'Telefon',
      phonePlaceholder: '+49 170 1234567',
    },
    confirmStep: {
      totalToPay: 'Gesamtbetrag',
      vatIncluded: 'inkl. MwSt.',
      ofWhichVat: (vat: string) => `davon MwSt. ${vat}`,
      paymentBefore: 'Die Zahlung erfolgt ',
      paymentStrong: 'bei der Abholung des Fahrzeugs',
      paymentAfter: ' — in bar oder per Karte. Wir erheben keine Anzahlung.',
      termsSummary: 'Zusammenfassung der Bedingungen',
      show: 'Anzeigen',
      hide: 'Ausblenden',
      terms: [
        'Kostenlose Stornierung oder Änderung bis 24 Stunden vor Ankunft.',
        'Jeder angefangene 24-Stunden-Zeitraum wird als voller Tag berechnet.',
        'Das Fahrzeug ist über die Haftpflichtversicherung des Betreibers versichert.',
        'Bitte lassen Sie keine Dokumente oder Wertgegenstände im Fahrzeug.',
      ],
      consent:
        'Ich habe die Nutzungsbedingungen und die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Daten für die Buchung zu.',
      consentError: 'Bitte bestätigen Sie, dass Sie die Bedingungen gelesen haben.',
    },
    summary: {
      dropOff: 'Abgabe',
      pickUp: 'Abholung',
      at: (time: string) => `um ${time} Uhr`,
      duration: 'Dauer',
      parking: 'Parkplatz',
      vehicle: 'Fahrzeug',
      passengers: 'Personen',
      flight: (flight: string) => `Flug ${flight}`,
      contact: 'Kontakt',
      parkingPrice: 'Parkpreis',
    },
    success: {
      heldBefore: 'Ihr Platz ist reserviert. Die Schranke erkennt das Kennzeichen ',
      heldAfter: ' bei Ihrer Ankunft.',
      referenceCode: 'Referenzcode',
      codeAria: (code: string) => `Code: ${code}`,
      copyCode: 'Code kopieren',
      codeCopied: 'Code kopiert',
      arrival: 'Ankunft',
      returning: 'Rückkehr',
      duration: 'Dauer',
      payOnPickup: 'Zahlung bei Abholung',
      addToCalendar: 'Zum Kalender',
      share: 'Teilen',
      changesBefore: 'Änderungen oder Stornierung: spätestens 24 Std. vor Ankunft unter ',
      changesOr: ' oder ',
      changesAfter: '.',
      whatsappGreeting: (reference: string) => `Guten Tag, ich schreibe wegen der Buchung ${reference}.`,
      shareText: (reference: string, company: string, dropOff: string, pickUp: string, plate: string) =>
        `Buchung ${reference} — ${company}\nAbgabe: ${dropOff}\nAbholung: ${pickUp}\nFahrzeug: ${plate}`,
    },
    errors: {
      network: 'Keine Verbindung zum Server. Prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.',
      timeout: 'Die Verbindung ist zu langsam. Prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.',
      server: 'Der Server kann die Buchung derzeit nicht verarbeiten. Bitte versuchen Sie es erneut.',
      aborted: 'Das Senden wurde abgebrochen.',
      unknown: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
    },
    ics: {
      dropOff: 'Parkplatz — Fahrzeugabgabe',
      pickUp: 'Parkplatz — Fahrzeugabholung',
      description: (reference: string, plate: string, phone: string) =>
        `Buchung ${reference} · Fahrzeug ${plate} · ${phone}`,
      calendarName: 'Buchungen',
    },
  },
};
