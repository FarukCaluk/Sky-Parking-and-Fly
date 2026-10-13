import type { Messages } from './bs';

/** German plural: 1 Tag / 2+ Tage. */
const plural = (count: number, one: string, many: string): string => (Math.abs(count) === 1 ? one : many);

export const de: Messages = {
  meta: {
    siteName: 'Sky Parking & Fly',
    ogLocale: 'de_DE',
    pages: {
      home: {
        title: 'Sky Parking & Fly | Privatparkplatz 800 m vom Flughafen Sarajevo',
        description:
          'Eingezäunter, beleuchteter und videoüberwachter Parkplatz am Flughafen Sarajevo. Kostenloser Transfer zum Terminal und zurück, ab 6 KM pro Tag.',
      },
      pricing: {
        title: 'Parkpreise | Sky Parking & Fly',
        description:
          'Parken am Flughafen Sarajevo: 8 KM pro Tag (1-10 Tage), 7 KM (11-20 Tage), 6 KM (ab 21 Tagen). Transfer und Überwachung inklusive. Berechnen Sie Ihren Aufenthalt.',
      },
      facilities: {
        title: 'Gelände und Sicherheit | Sky Parking & Fly',
        description:
          'Eingezäunter und beleuchteter Parkplatz, Videoüberwachung rund um die Uhr und Personal vor Ort. So sieht unser Parkplatz am Flughafen Sarajevo aus.',
      },
      shuttle: {
        title: 'Kostenloser Transfer zum Terminal | Sky Parking & Fly',
        description:
          'Etwa eine Minute bis zum Terminaleingang, mit Hilfe beim Gepäck. Nach der Landung senden Sie eine Nachricht oder rufen an, und der Fahrer holt Sie ab.',
      },
      reviews: {
        title: 'Bewertungen | Sky Parking & Fly',
        description: 'Was Reisende sagen, die ihr Auto auf unserem Parkplatz am Flughafen Sarajevo abgestellt haben.',
      },
      faq: {
        title: 'Häufige Fragen | Sky Parking & Fly',
        description:
          'Antworten auf die häufigsten Fragen zum privaten Parken am Flughafen Sarajevo: Sicherheit, Reservierung, Zahlung, Preise, Transfer, Schlüssel und Flugverspätung.',
      },
      contact: {
        title: 'Kontakt | Sky Parking & Fly',
        description:
          'Rufen Sie uns an oder schreiben Sie uns über WhatsApp oder Viber. Dr Atifa Purivatre 38, Sarajevo. Rund um die Uhr geöffnet, auch an Feiertagen.',
      },
      reservation: {
        title: 'Parkplatz reservieren | Sky Parking & Fly',
        description:
          'Wählen Sie Ihre Daten, sehen Sie den ungefähren Preis und senden Sie Ihre Reservierung per WhatsApp, Viber oder E-Mail.',
      },
      terms: {
        title: 'Nutzungsbedingungen | Sky Parking & Fly',
        description: 'Bedingungen für den Parkplatz- und Transferservice.',
      },
      privacy: {
        title: 'Datenschutz | Sky Parking & Fly',
        description: 'Wie wir mit den Angaben umgehen, die Sie uns senden.',
      },
      cookies: {
        title: 'Cookies | Sky Parking & Fly',
        description: 'Was diese Website in Ihrem Browser speichert.',
      },
      notFound: {
        title: 'Seite nicht gefunden | Sky Parking & Fly',
        description: 'Die gesuchte Seite existiert nicht.',
      },
    },
  },

  common: {
    skipToContent: 'Zum Inhalt springen',
    close: 'Schließen',
    optional: 'Optional',
  },

  language: {
    label: 'Sprache',
    names: { bs: 'Bosanski', en: 'English', de: 'Deutsch' },
    codes: { bs: 'BS', en: 'EN', de: 'DE' },
    switchTo: (name: string) => `Sprache wechseln: ${name}`,
  },

  nav: {
    aria: 'Hauptnavigation',
    homeAria: 'Sky Parking & Fly, Startseite',
    pages: {
      home: 'Start',
      pricing: 'Preise',
      facilities: 'Gelände',
      shuttle: 'Shuttle',
      reviews: 'Bewertungen',
      faq: 'FAQ',
      contact: 'Kontakt',
      reservation: 'Reservierung',
      terms: 'Nutzungsbedingungen',
      privacy: 'Datenschutz',
      cookies: 'Cookies',
    },
    book: 'Reservieren',
    callUs: (phone: string) => `Rufen Sie uns an: ${phone}`,
    menu: 'Menü',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
    switchToLight: 'Helles Design einschalten',
    switchToDark: 'Dunkles Design einschalten',
    lightTheme: 'Helles Design',
    darkTheme: 'Dunkles Design',
  },

  date: {
    weekdaysLong: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    weekdaysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
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
    at: (date: string, time: string) => `${date}, ${time} Uhr`,
  },

  units: {
    days: (n: number) => `${n} ${plural(n, 'Tag', 'Tage')}`,
    perDay: 'pro Tag',
  },

  photos: {
    jet: 'Ein Flugzeug startet über den Autos auf dem Parkplatz von Sky Parking & Fly, dahinter Berge',
    entrance:
      'Der Eingang: ein grauer Blechzaun mit blauem Sky-Parking-&-Fly-Schild und dem Pfeil ULAZ (Eingang), dahinter ein Kiesparkplatz mit Autos',
    sign: 'Das Schild von Sky Parking & Fly Sarajevo: Parken am Flughafen Sarajevo, 24h Überwachung und Transfer, ULAZ (Eingang) und Telefon 062/963/901',
    pole: 'Ein blaues Schild Privatparkplatz und ein Mast mit Überwachungskamera und Flutlicht',
  },

  hero: {
    title: 'Parken 800 Meter vom Flughafen',
    lead: 'Eingezäunter, beleuchteter Parkplatz mit Videoüberwachung rund um die Uhr und kostenlosem Transfer zum Terminal und zurück.',
  },

  stayBar: {
    aria: 'Aufenthaltszeitraum',
    arrival: 'Ankunft',
    departure: 'Abreise',
    date: 'Datum',
    time: 'Uhrzeit',
    estimate: 'Ungefährer Preis',
    line: (days: string, rate: string) => `${days} × ${rate} pro Tag`,
  },

  stayErrors: {
    dropOffMissing: 'Wählen Sie Datum und Uhrzeit der Ankunft.',
    dropOffPast: 'Die Ankunftszeit liegt bereits in der Vergangenheit.',
    pickUpMissing: 'Wählen Sie Datum und Uhrzeit der Abreise.',
    pickUpBeforeDropOff: 'Die Abreise muss nach der Ankunft liegen.',
    rangeTooLong: (maxDays: number) =>
      `Für Aufenthalte über ${maxDays} Tage rufen Sie uns an, wir vereinbaren einen Sonderpreis.`,
  },

  journey: {
    title: 'Vom Parkplatz zum Terminal in etwa einer Minute',
    lead: 'Lassen Sie Ihr Auto bei uns, wir fahren Sie. Bei der Rückkehr holen wir Sie ab.',
    steps: {
      book: {
        title: 'Reservieren',
        text: 'Wählen Sie Ihre Daten und senden Sie Ihre Anfrage. Die Bestätigung erhalten Sie per Nachricht oder E-Mail.',
      },
      park: {
        title: 'Parken',
        text: 'Sie parken selbst oder lassen uns den Schlüssel, ganz wie es Ihnen lieber ist. Wir helfen bei Koffern, Kinderwagen und Kindersitzen.',
      },
      ride: {
        title: 'Wir fahren Sie',
        text: 'Bis zum Terminaleingang ist es etwa eine Minute Fahrt. Kostenlos, im Parkpreis enthalten.',
      },
      back: {
        title: 'Zurückkehren',
        text: 'Sobald Sie Ihr Gepäck haben, senden Sie eine Nachricht oder rufen Sie uns an. Ein Fahrer holt Sie ab und bringt Sie zu Ihrem Auto.',
      },
    },
    map: {
      aria: 'Skizze der Strecke vom Parkplatz zum Flughafen: 800 Meter, 1 bis 2 Minuten Fahrt',
      parking: 'Parkplatz',
      airport: 'Flughafen',
      distance: '800 m',
      time: '1-2 Min.',
      note: 'Skizze, nicht maßstabsgetreu',
    },
  },

  price: {
    title: 'Je länger Sie bleiben, desto günstiger der Tag',
    lead: 'Der Preis gilt pro Tag und hängt von der Aufenthaltsdauer ab. Transfer, Videoüberwachung und Personal vor Ort sind inklusive.',
    unit: 'KM pro Tag',
    daysLabel: 'Wie viele Tage bleiben Sie',
    sliderAria: 'Aufenthaltsdauer in Tagen',
    totalLabel: 'Gesamt',
    totalFor: (days: string) => `für ${days}`,
    saving: (amount: string) => `Sie sparen ${amount}`,
    approx: 'Ungefährer Preis',
    tiers: {
      short: {
        label: '1-10 Tage',
        hint: 'Die ideale Lösung für kurze Aufenthalte und schnelle Reisen.',
      },
      mid: {
        label: '11-20 Tage',
        hint: 'Die beliebteste Wahl für Reisende mit längerem Aufenthalt, eine hervorragende Balance zwischen Preis und Komfort.',
      },
      long: {
        label: '21+ Tage',
        hint: 'Das günstigste Paket für längere Aufenthalte, maximale Sicherheit zum besten Preis.',
      },
    },
    includedTitle: 'Im Preis enthalten',
    included: [
      'Kostenloser Transfer zum Flughafen',
      'Videoüberwachung rund um die Uhr',
      'Physische Überwachung',
      'Eingezäunter und gut beleuchteter Bereich',
      'Rabatt für längere Aufenthalte',
    ],
    payment:
      'Bezahlung in bar bei Ankunft oder Abreise. Wenn Sie anders bezahlen möchten, kontaktieren Sie uns bitte im Voraus.',
    longStay: 'Für längere Aufenthalte und Stammkunden gewähren wir zusätzliche Rabatte und besondere Vorteile.',
    currency: 'Alle Preise in konvertiblen Mark (KM, Währungscode BAM).',
  },

  lot: {
    title: 'Ihr Auto bleibt nie unbeaufsichtigt',
    facts: {
      fenced: { title: 'Eingezäuntes Gelände', text: 'Zutritt haben nur Kunden und Personal.' },
      cctv: {
        title: 'Videoüberwachung rund um die Uhr',
        text: 'Der Parkplatz steht 24 Stunden am Tag unter Videoüberwachung.',
      },
      staff: {
        title: 'Personal vor Ort',
        text: 'Physische Überwachung, klare Regeln für Ein- und Ausfahrt und ein Protokoll der Bewegungen.',
      },
      keys: {
        title: 'Die Schlüssel bleiben bei Ihnen',
        text: 'Ihr Auto bleibt verschlossen. Sie können die Schlüssel behalten oder uns zur Aufbewahrung geben.',
      },
    },
    link: 'Gelände ansehen',
    entranceCaption: 'Die Einfahrt liegt rechts vom Schild.',
    poleCaption: 'Kamera und Flutlicht an einem Mast.',
  },

  reviews: {
    title: 'Was Reisende sagen',
    lead: 'Erfahrungen von Reisenden, die ihr Auto bei uns abgestellt haben.',
    google: 'Bewertung 5,0 auf Google Maps',
    googleLink: 'Alle Bewertungen auf Google Maps',
    items: {
      nedim: {
        title: 'Beste Erfahrung bisher',
        quote:
          'Wenn man von einer Reise zurückkommt und am Flughafenausgang jemand auf einen wartet, ist das unbezahlbar. Großes Lob an das Team von Sky Parking and Fly.',
        name: 'Nedim K.',
      },
      lejla: {
        title: 'Eine große Erleichterung für Reisende',
        quote:
          'Man muss nicht ans Taxifahren oder Warten denken. Man stellt das Auto ab und um alles Weitere kümmern sich die anderen.',
        name: 'Lejla B.',
      },
      jasmin: {
        title: 'Ich komme wieder!',
        quote:
          'Das ist schon das dritte Mal, dass ich Sky Parking and Fly nutze, und jedes Mal bin ich sehr zufrieden. Absolut empfehlenswert!',
        name: 'Jasmin H.',
      },
      ajla: {
        title: 'Zuverlässig und schnell',
        quote:
          'Kurze Wartezeit, klare Kommunikation und freundliches Personal. Ich kann mir keine bessere Lösung für einen Flug von Sarajevo vorstellen.',
        name: 'Ajla S.',
      },
      haris: {
        title: 'Einfache Buchung',
        quote:
          'Die Reservierung dauerte 1 Minute, alles war klar und deutlich. Die Bestätigung per E-Mail erhielt ich sofort.',
        name: 'Haris V.',
      },
      mirela: {
        title: 'Ideal für Familien mit Kindern',
        quote:
          'Wir waren mit einem kleinen Kind unterwegs und der Transfer zum Flughafen war schnell und bequem. Die Leute sind wirklich zuvorkommend.',
        name: 'Mirela D.',
      },
    },
  },

  faq: {
    title: 'Häufige Fragen',
    lead: 'Hier finden Sie Antworten auf die häufigsten Fragen zu unseren privaten Parkdienstleistungen in der Nähe des Flughafens Sarajevo.',
    all: 'Alle Fragen',
    more: 'Mehr ansehen',
    items: [
      {
        q: 'Ist Sky Parking and Fly für Langzeitparken sicher?',
        a: 'Ja, unser Parkplatz ist eingezäunt, videoüberwacht und rund um die Uhr gesichert. Ihr Fahrzeug ist bei uns sicher, egal ob es einen Tag oder mehrere Wochen bleibt.',
      },
      {
        q: 'Wie kann ich meinen Parkplatz online reservieren?',
        a: 'Sie können Ihre Reservierung über unsere Website vornehmen, indem Sie grundlegende Informationen und Daten eingeben. Die Bestätigung erhalten Sie umgehend per E-Mail oder Nachricht.',
      },
      {
        q: 'Welche Zahlungsmöglichkeiten stehen zur Verfügung?',
        a: 'Die Bezahlung erfolgt in bar bei der Ankunft oder Abreise, je nachdem, was Ihnen besser passt. Wenn Sie eine andere Zahlungsmethode bevorzugen, kontaktieren Sie uns bitte im Voraus, damit wir dies für Sie ermöglichen und Ihren Platz reservieren können.',
      },
      {
        q: 'Wie viel kostet das Parken pro Tag und pro Woche?',
        a: 'Der Parkplatzpreis hängt von der Aufenthaltsdauer ab:',
        list: [
          { label: '1-10 Tage', value: '8 KM pro Tag' },
          { label: '11-20 Tage', value: '7 KM pro Tag' },
          { label: '21+ Tage', value: '6 KM pro Tag' },
        ],
        after:
          'Für längere Aufenthalte gewährt SKY Parking and Fly zusätzliche Rabatte und besondere Vorteile für Stammkunden.',
      },
      {
        q: 'Wo genau befindet sich Sky Parking and Fly im Verhältnis zum Flughafen?',
        a: 'Unser Parkplatz befindet sich nur 800 Meter bzw. eine Minute Fahrt vom Haupteingang des Internationalen Flughafens Sarajevo entfernt. Den Standort erhalten Sie automatisch bei der Reservierung.',
      },
      {
        q: 'Bieten Sie einen kostenlosen Transfer zum und vom Flughafen an?',
        a: 'Ja, wir bieten einen kostenlosen und schnellen Transfer zum Terminal und zurück, direkt nachdem Sie Ihr Fahrzeug geparkt haben.',
      },
      {
        q: 'Kann ich meine Autoschlüssel bei Ihnen lassen?',
        a: 'Wenn Sie möchten, ja. Sie können die Schlüssel bei sich behalten oder sie zur sicheren Aufbewahrung bei uns lassen. Die Schlüssel werden verschlossen und sicher aufbewahrt.',
      },
      {
        q: 'Ist der Parkplatz rund um die Uhr geöffnet?',
        a: 'Ja, wir arbeiten rund um die Uhr. Sie können uns jederzeit kontaktieren und Ihr Fahrzeug parken, auch an Feiertagen.',
      },
      {
        q: 'Was passiert, wenn mein Flug verspätet ist oder ich später als geplant zurückkomme?',
        a: 'Keine Sorge, wir verfolgen Ihre Flüge und sind flexibel bei der Abholzeit. Ihr Fahrzeug wartet auf Sie ohne zusätzliche Kosten bei geringfügiger Verspätung.',
      },
      {
        q: 'Wie kann ich den Support kontaktieren, wenn ich weitere Fragen habe?',
        a: 'Rufen Sie uns einfach an, senden Sie eine Nachricht oder kontaktieren Sie uns über WhatsApp. Wir sind hier, um Ihre Reise zu erleichtern.',
      },
    ],
  },

  facilities: {
    title: 'Eingezäunt. Beleuchtet. Überwacht.',
    lead: 'Privater Parkplatz am Flughafen Sarajevo. Ihr Fahrzeug steht auf einem eingezäunten Gelände, unter ständiger Kontrolle und mit Personal vor Ort.',
    features: {
      fenced: { title: 'Eingezäuntes Gelände', text: 'Zutritt haben nur Kunden und Personal.' },
      lit: { title: 'Beleuchtetes Gelände', text: 'Flutlicht an Masten beleuchtet den Parkplatz.' },
      cctv: {
        title: 'Videoüberwachung rund um die Uhr',
        text: 'Kameras an Masten beobachten den Parkplatz Tag und Nacht.',
      },
      staff: {
        title: 'Physische Überwachung',
        text: 'Personal ist vor Ort. Wir haben klare Regeln für Ein- und Ausfahrt und ein Protokoll der Bewegungen.',
      },
      keys: {
        title: 'Schlüssel',
        text: 'Ihr Auto bleibt verschlossen, und Sie können die Schlüssel behalten. Wenn Sie sie uns lassen, schließen wir sie weg und bewahren sie sicher auf.',
      },
      check: {
        title: 'Kontrolle bei der Abholung',
        text: 'Wenn Sie möchten, machen wir bei der Abholung gemeinsam einen kurzen Sichtcheck des Autos.',
      },
    },
    find: {
      title: 'So erkennen Sie uns',
      text: 'Achten Sie auf das blaue Schild mit der Aufschrift ULAZ (Eingang). Die Einfahrt liegt rechts vom Schild.',
      address: 'Dr Atifa Purivatre 38, Sarajevo',
      cta: 'Route anzeigen',
    },
  },

  shuttle: {
    title: 'Kostenloser Transfer zum Terminal',
    lead: 'Wir fahren Sie in etwa einer Minute zum Terminaleingang. In beide Richtungen, im Parkpreis enthalten.',
    howTitle: 'So läuft es ab',
    steps: [
      {
        title: 'Sie parken',
        text: 'Sie kommen an und parken oder übergeben uns den Schlüssel, ganz wie es Ihnen lieber ist.',
      },
      { title: 'Wir helfen beim Gepäck', text: 'Koffer, Kinderwagen, Kindersitze: wir helfen bei allem.' },
      { title: 'Wir fahren Sie zum Terminal', text: 'Die Fahrt bis zum Terminaleingang dauert etwa eine Minute.' },
      {
        title: 'Melden Sie sich nach der Landung',
        text: 'Sobald Sie Ihr Gepäck haben, senden Sie eine Nachricht oder rufen Sie uns an.',
      },
      { title: 'Wir bringen Sie zu Ihrem Auto', text: 'Unser Fahrer holt Sie ab und fährt Sie zurück zu Ihrem Auto.' },
    ],
    closing:
      'Alles ist im Parkpreis enthalten. Kein Taxi, kein Anruf bei Freunden um 4 Uhr morgens und kein Kreisen um Kreisverkehre.',
    delay: {
      title: 'Wenn Ihr Flug Verspätung hat',
      text: 'Wir verfolgen die Flüge und sind flexibel bei der Abholzeit. Für geringfügige Verspätungen berechnen wir nichts extra.',
    },
    checklist: {
      title: 'Bevor Sie losfahren',
      items: [
        'Schlösser und Fenster: noch einmal prüfen, Ruhe im Kopf in 30 Sekunden.',
        'Wertsachen: Taschen, Kabel und Halterungen aus dem Blickfeld nehmen.',
        'Foto vom Zustand: eine Aufnahme mit dem Handy spart Nerven.',
        'Reifen und Flüssigkeiten (bei längeren Aufenthalten): prüfen, damit Sie bei der Rückkehr sofort losfahren können.',
        'Timing: 15-20 Minuten früher kommen, der Rest geht schnell, weil der Fahrer da ist.',
      ],
    },
  },

  contact: {
    title: 'Rufen Sie uns an. Wir sind rund um die Uhr da.',
    lead: 'Sie können zu jeder Tages- und Nachtzeit parken, auch an Feiertagen.',
    channels: {
      phone: { label: 'Telefon', hint: 'Jeden Tag, 24 Stunden' },
      whatsapp: { label: 'WhatsApp', hint: 'Nachricht oder Anruf' },
      viber: { label: 'Viber', hint: 'Nachricht oder Anruf' },
      email: { label: 'E-Mail', hint: 'Für Anfragen und Reservierungen' },
    },
    whatsappGeneric: 'Guten Tag, ich möchte einen Parkplatz reservieren.',
    addressTitle: 'Adresse',
    hoursTitle: 'Öffnungszeiten',
    hours: 'Rund um die Uhr, jeden Tag, auch an Feiertagen',
    map: {
      title: 'Standort',
      show: 'Karte anzeigen',
      note: 'Die Karte wird erst geladen, wenn Sie sie anfordern.',
      embedTitle: 'Karte des Standorts von Sky Parking & Fly',
      google: 'Google Maps',
      apple: 'Apple Karten',
    },
  },

  reservation: {
    title: 'Reservierung',
    lead: 'Wählen Sie Ihre Daten, sehen Sie den ungefähren Preis und senden Sie Ihre Anfrage. Die Bestätigung erhalten Sie per Nachricht oder E-Mail.',
    stayTitle: 'Zeitraum',
    guestTitle: 'Ihre Angaben',
    fields: {
      name: { label: 'Vor- und Nachname', placeholder: 'Amar Hodžić' },
      phone: { label: 'Telefon', placeholder: '061 123 456' },
      plate: { label: 'Kennzeichen', placeholder: 'A12-K-345' },
      flight: { label: 'Flugnummer', placeholder: 'FR 1234' },
      note: { label: 'Hinweis', placeholder: 'Z. B. Transporter, Kindersitz, Ankunft um 4 Uhr morgens' },
    },
    errors: {
      name: { required: 'Geben Sie Ihren Namen ein.', invalid: 'Der Name muss Buchstaben enthalten.' },
      phone: { invalid: 'Die Telefonnummer ist nicht gültig (z. B. 061 123 456).' },
      plate: { invalid: 'Das Kennzeichen ist nicht gültig (z. B. A12-K-345).' },
      flight: { invalid: 'Die Flugnummer ist nicht gültig (z. B. FR 1234).' },
    },
    summary: {
      title: 'Ihre Anfrage',
      stay: 'Aufenthalt',
      rate: 'Preis pro Tag',
      total: 'Ungefähre Summe',
    },
    send: {
      title: 'Anfrage senden',
      hint: 'Die Nachricht wird von Ihrem eigenen Gerät gesendet, und wir bestätigen den Termin.',
      whatsapp: 'Per WhatsApp senden',
      viber: 'Viber',
      email: 'E-Mail',
      call: 'Anrufen',
      viberCopied: 'Der Text wurde kopiert. Fügen Sie ihn in den Viber-Chat ein.',
      fixErrors: 'Prüfen Sie die markierten Felder.',
      previewTitle: 'Nachrichtentext',
    },
    message: {
      subject: 'Parkplatzreservierung',
      greeting: 'Guten Tag, ich möchte einen Parkplatz reservieren.',
      arrival: (when: string) => `Ankunft: ${when}`,
      departure: (when: string) => `Abreise: ${when}`,
      stay: (days: string, total: string) => `Aufenthalt: ${days}, ca. ${total}`,
      name: (value: string) => `Name: ${value}`,
      phone: (value: string) => `Telefon: ${value}`,
      plate: (value: string) => `Fahrzeug: ${value}`,
      flight: (value: string) => `Flug: ${value}`,
      note: (value: string) => `Hinweis: ${value}`,
    },
  },

  footer: {
    ctaTitle: 'Lassen Sie Ihr Auto bei uns',
    ctaText: 'Reservieren Sie online oder rufen Sie uns an, rund um die Uhr.',
    contact: 'Kontakt',
    pages: 'Seiten',
    legal: 'Rechtliches',
    language: 'Sprache',
    navAria: 'Navigation im Fußbereich',
    hours: 'Rund um die Uhr geöffnet, auch an Feiertagen',
    rights: (year: number) => `© ${year} Sky Parking and Fly. Alle Rechte vorbehalten.`,
    toTop: 'Nach oben',
  },

  legal: {
    updated: (date: string) => `Aktualisiert am ${date}`,
    docs: {
      terms: {
        title: 'Nutzungsbedingungen',
        updated: '13. Oktober 2026',
        sections: [
          {
            heading: 'Leistung',
            body: 'Sky Parking and Fly bietet das Abstellen von Fahrzeugen auf einem eingezäunten, beleuchteten und videoüberwachten Parkplatz am Flughafen Sarajevo, mit kostenlosem Transfer zum Terminal und zurück.',
          },
          {
            heading: 'Reservierung',
            body: 'Sie können Ihre Reservierung über diese Website (WhatsApp, Viber oder E-Mail) oder telefonisch senden. Die Bestätigung des Termins erhalten Sie per Nachricht oder E-Mail.',
          },
          {
            heading: 'Preis',
            body: 'Der Preis gilt pro Tag: 8 KM bei einem Aufenthalt von 1 bis 10 Tagen, 7 KM von 11 bis 20 Tagen und 6 KM ab 21 Tagen. Der auf der Website angezeigte Betrag ist ungefähr, Termin und Preis bestätigen wir bei der Reservierung.',
          },
          {
            heading: 'Bezahlung',
            body: 'Die Bezahlung erfolgt in bar bei Ankunft oder Abreise. Für eine andere Zahlungsart kontaktieren Sie uns bitte im Voraus.',
          },
          {
            heading: 'Schlüssel und Flugverspätung',
            body: 'Sie können die Schlüssel behalten oder zur Aufbewahrung bei uns lassen. Wir verfolgen die Flüge und sind bei der Abholzeit flexibel, für geringfügige Verspätungen berechnen wir nichts extra.',
          },
          {
            heading: 'Wertsachen',
            body: 'Bitte lassen Sie keine Wertsachen, Taschen oder Kabel sichtbar im Fahrzeug liegen.',
          },
        ],
      },
      privacy: {
        title: 'Datenschutz',
        updated: '13. Oktober 2026',
        sections: [
          {
            heading: 'Wer wir sind',
            body: 'Sky Parking and Fly, Dr Atifa Purivatre 38, Sarajevo. Bei Fragen zu Daten schreiben Sie uns an info@parkingandfly.ba.',
          },
          {
            heading: 'Was mit den Formulardaten geschieht',
            body: 'Das Reservierungsformular auf dieser Website sendet keine Daten an unseren Server. Ihre Eingaben dienen nur dazu, die Nachricht zusammenzustellen, die Sie selbst über WhatsApp, Viber oder E-Mail senden. Diese Dienste werden von Dritten nach eigenen Regeln betrieben.',
          },
          {
            heading: 'Daten, die wir erhalten',
            body: 'Wenn Sie uns eine Anfrage senden, erhalten wir die Angaben aus Ihrer Nachricht, meist Name, Termin, Telefonnummer und Kennzeichen. Wir verwenden sie ausschließlich, um den Termin zu bestätigen und mit Ihnen zu kommunizieren.',
          },
          {
            heading: 'Videoüberwachung',
            body: 'Der Parkplatz steht zum Schutz von Fahrzeugen und Eigentum unter Videoüberwachung.',
          },
          {
            heading: 'Ihre Rechte',
            body: 'Für Auskunft, Berichtigung oder Löschung der Daten, die wir über Sie haben, wenden Sie sich an info@parkingandfly.ba.',
          },
        ],
      },
      cookies: {
        title: 'Cookies',
        updated: '13. Oktober 2026',
        sections: [
          {
            heading: 'Was wir verwenden',
            body: 'Diese Website verwendet keine Cookies zur Verfolgung oder Werbung. Ihr Browser speichert nur das gewählte Design (hell oder dunkel).',
          },
          {
            heading: 'Karte',
            body: 'Die Karte auf der Kontaktseite wird erst geladen, nachdem Sie sie angefordert haben. Dann wird OpenStreetMap geladen, das eigene Regeln anwendet.',
          },
          {
            heading: 'Daten löschen',
            body: 'Lokale Daten können Sie jederzeit in den Einstellungen Ihres Browsers löschen.',
          },
        ],
      },
    },
  },

  notFound: {
    code: '404',
    title: 'Seite nicht gefunden',
    text: 'Die gesuchte Seite existiert nicht oder wurde verschoben.',
    home: 'Zur Startseite',
  },
};
