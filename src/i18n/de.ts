import type { Messages } from './bs.ts';

/** German plural: 1 Tag / 2+ Tage. */
const plural = (count: number, one: string, many: string): string => (Math.abs(count) === 1 ? one : many);

/** The four latest posts of parkingandfly.ba/novosti, translated. */
const newsItems: Messages['news']['items'] = {
  checklist: {
    title: 'Checkliste vor der Reise: 5 Kleinigkeiten, die einen großen Unterschied machen',
    excerpt:
      'Ein paar kurze Dinge, bevor Sie in den Transfer steigen: Schlösser und Fenster, Wertsachen, ein Foto vom Zustand, Reifen und Zeitplanung.',
    alt: 'Ein Mann im Anzug notiert den Zustand eines Autos neben dem Außenspiegel',
    blocks: [
      { type: 'heading', text: 'Checkliste vor der Reise: Auto abstellen ohne Sorgen' },
      { type: 'p', text: 'Ein paar kurze Dinge, bevor Sie in den Transfer steigen:' },
      {
        type: 'checks',
        items: [
          '**Schlösser und Fenster:** noch einmal prüfen, 30 Sekunden für die Gewissheit.',
          '**Wertsachen:** aus dem Blickfeld nehmen (Taschen, Kabel, Halterungen).',
          '**Foto vom Zustand:** ein Bild mit dem Handy schont die Nerven.',
          '**Reifen und Flüssigkeiten** (bei längeren Aufenthalten): prüfen, damit Sie bei der Rückkehr sofort losfahren können.',
          '**Zeitplanung:** 15-20 Minuten früher kommen, der Rest geht schnell, der Fahrer ist da.',
        ],
      },
      {
        type: 'p',
        text: 'Wir fahren Sie bis zum Eingang und übernehmen die Logistik; Sie steigen ohne Hektik ins Flugzeug.',
      },
    ],
  },
  security: {
    title: 'Sicherheit an erster Stelle: Was wir genau tun, damit Ihr Auto sicher steht',
    excerpt: 'Der Parkplatz ist eingezäunt, beleuchtet und videoüberwacht. Zutritt haben nur Kunden und Personal.',
    alt: 'Ein blaues Schild Privatparkplatz und ein Mast mit Überwachungskamera und Flutlicht',
    blocks: [
      { type: 'heading', text: 'Fahrzeugsicherheit: Überwachung rund um die Uhr und eingezäuntes Gelände' },
      {
        type: 'p',
        text: 'Der Parkplatz ist eingezäunt, beleuchtet und videoüberwacht. Zutritt haben nur Kunden und Personal. Es gelten klare Regeln für Ein- und Ausfahrt, und die Bewegungen werden protokolliert.',
      },
      {
        type: 'p',
        text: 'Wir stellen Fahrzeuge nicht „irgendwo daneben“ ab und improvisieren nicht. Wenn Sie möchten, machen wir bei der Übernahme Ihres Autos gemeinsam eine kurze Sichtkontrolle, damit Sie ruhig losfahren und noch ruhiger zurückkehren.',
      },
      {
        type: 'p',
        text: 'Im Winter räumen wir die Zufahrten, im Sommer behalten wir den Andrang im Blick; das Ziel ist, dass alles schnell geht, aber nie auf Kosten der Sicherheit. Der Transfer fährt auch bei viel Betrieb und im Morgengrauen.',
      },
    ],
  },
  transfer: {
    title: 'Transfer zum Flughafen, Schritt für Schritt',
    excerpt:
      'Sie kommen an und parken (oder geben den Schlüssel ab), wir helfen mit dem Gepäck, und der Transfer bis zum Terminaleingang dauert etwa eine Minute.',
    alt: 'Ein Reisender im Anzug mit Tasche vor einem Flugzeug',
    blocks: [
      { type: 'heading', text: 'Kostenloser Transfer zum Flughafen: So läuft er ab' },
      {
        type: 'steps',
        items: [
          'Sie kommen auf dem Parkplatz an und parken (oder geben den Schlüssel ab, ganz wie es Ihnen lieber ist).',
          'Wir helfen beim Gepäck: Koffer, Kinderwagen, Kindersitze.',
          'Der Transfer bis zum Terminaleingang dauert etwa eine Minute.',
          'Nach Ihrer Rückkehr, sobald Sie Ihr Gepäck haben, schreiben oder rufen Sie uns an.',
          'Unser Fahrer holt Sie ab und bringt Sie zurück zu Ihrem Auto.',
        ],
      },
      {
        type: 'p',
        text: 'Alles ist im Parkpreis enthalten. Kein Taxi, keine Freunde, die um 4 Uhr morgens geweckt werden, und kein Herumirren in Kreisverkehren.',
      },
    ],
  },
  longStay: {
    title: 'Langzeitparken ohne Sorgen: 11-20 und 21+ Tage',
    excerpt:
      'Bei längeren Aufenthalten sinkt der Preis auf 7 KM pro Tag (11-20 Tage) und 6 KM pro Tag (21-30 Tage), und jeder Tag nach dem 30. kostet 5 KM.',
    alt: 'Autos auf einem Kiesparkplatz',
    blocks: [
      {
        type: 'p',
        text: 'Bei längeren Aufenthalten (Geschäftsreise, Familienbesuch, verlängerter Urlaub) sinkt der Preis auf **7 KM/Tag** (11-20 Tage) und **6 KM/Tag** (21-30 Tage), und jeder Tag nach dem 30. kostet **5 KM**.',
      },
      {
        type: 'p',
        text: 'Der Parkplatz ist eingezäunt und beleuchtet, mit Videoüberwachung und Personal vor Ort. Ein- und Ausfahrten werden protokolliert: alles ordentlich und nachvollziehbar.',
      },
      {
        type: 'p',
        text: 'Sie brauchen eine **Rechnung auf die Firma** oder eine besondere Bestätigung? Wir stellen sie sofort aus. Wenn sich Ihre Rückreise verschiebt, **verlängern wir die Reservierung**. Ihr Auto bleibt dort, wo Sie es abgestellt haben, und der **Transfer** wartet auf Sie, wenn Sie ankommen.',
      },
    ],
  },
};

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
          'Parken am Flughafen Sarajevo: 9 KM pro Tag (2-4 Tage), 8 KM (5-10), 7 KM (11-20), 6 KM (21-30), danach 5 KM je weiterem Tag. Transfer und Überwachung inklusive.',
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
      news: {
        title: 'Neuigkeiten | Sky Parking & Fly',
        description:
          'Tipps und Neuigkeiten zum Parken am Flughafen Sarajevo: Checkliste vor der Reise, Fahrzeugsicherheit, Transfer und längere Aufenthalte.',
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
      confirmed: {
        title: 'Reservierung bestätigt | Sky Parking & Fly',
        description: 'Ihre Reservierung ist eingegangen. Hier finden Sie Ihren Reservierungscode und alle Details.',
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
      news: 'Neuigkeiten',
      faq: 'FAQ',
      contact: 'Kontakt',
      reservation: 'Reservierung',
      confirmed: 'Reservierung bestätigt',
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
    galleryLot: 'Autos in einer Reihe auf einem Schotterparkplatz, im Hintergrund ein Berg',
    galleryCars: 'Ein weißer Golf und ein schwarzer Audi auf dem Parkplatz, umgeben von Grün',
    galleryGate: 'Ein schwarzes Auto fährt durch das Blechtor auf den Parkplatz',
    galleryField: 'Ein weitläufiger Schotterparkplatz mit Zaun und Tor',
    galleryCamera: 'Eine Überwachungskamera und ein LED-Flutlicht an einem Mast',
    posterCare:
      'Plakat Sky Parking & Fly: Parken ohne Sorgen! Videoüberwachung rund um die Uhr, nah am Flughafen, flexibel Tag und Nacht',
    posterAerial:
      'Plakat Sky Parking & Fly: Ihr Auto ist sicher. Luftbild des Parkplatzes neben der Landebahn des Flughafens Sarajevo',
    posterTravel:
      'Plakat Sky Parking & Fly: Sie reisen, wir passen auf! Parken mit Vertrauen, Sicherheit steht an erster Stelle',
  },

  hero: {
    title: 'Sky Parking and Fly Sarajevo',
    distance: '800 Meter vom Flughafen',
    lead: 'Eingezäunter, beleuchteter Parkplatz mit Videoüberwachung rund um die Uhr und kostenlosem Transfer zum Terminal und zurück in nur 2 Minuten.',
    message: 'Schreiben Sie uns auf',
  },

  stayBar: {
    aria: 'Aufenthaltszeitraum',
    arrival: 'Ankunft',
    departure: 'Abreise',
    date: 'Datum',
    time: 'Uhrzeit',
    estimate: 'Ungefährer Preis',
    line: (days: string, rate: string) => `${days} × ${rate} pro Tag`,
    lineExtra: (days: string, first: string, extra: string) => `${days}: ${first} + ${extra}`,
  },

  stayErrors: {
    dropOffMissing: 'Wählen Sie Datum und Uhrzeit der Ankunft.',
    dropOffPast: 'Die Ankunftszeit liegt bereits in der Vergangenheit.',
    pickUpMissing: 'Wählen Sie Datum und Uhrzeit der Abreise.',
    pickUpBeforeDropOff: 'Die Abreise muss nach der Ankunft liegen.',
    rangeTooShort: (minDays: number) =>
      `Die Mindestparkdauer beträgt ${minDays} ${plural(minDays, 'Tag', 'Tage')}. Für einen kürzeren Aufenthalt kontaktieren Sie uns bitte.`,
    rangeTooLong: (maxDays: number) =>
      `Für Aufenthalte über ${maxDays} Tage rufen Sie uns an, wir vereinbaren einen Sonderpreis.`,
  },

  picker: {
    chooseDate: 'Datum wählen',
    chooseTime: 'Uhrzeit wählen',
    previousMonth: 'Vorheriger Monat',
    nextMonth: 'Nächster Monat',
    today: 'Heute',
    hours: 'Stunde',
    minutes: 'Minuten',
    done: 'Fertig',
    close: 'Schließen',
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
      aria: 'Karte der Strecke vom Parkplatz zum Flughafen: 800 Meter, 1 bis 2 Minuten Fahrt',
      parking: 'Parkplatz',
      airport: 'Flughafen',
      distance: '800 m',
      time: '1-2 Min.',
      note: '© OpenStreetMap',
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
      from2: { label: '2-4 Tage', hint: 'Für kürzere Reisen, Wochenendtrips und Geschäftsflüge.' },
      from5: { label: '5-10 Tage', hint: 'Günstig parken für Urlaub und Reisen.' },
      from11: { label: '11-20 Tage', hint: 'Ein niedrigerer Tagespreis für längere Aufenthalte.' },
      from21: { label: '21-30 Tage', hint: 'Die günstigsten Preise für längere Reisen.' },
    },
    extra: {
      label: 'Ab dem 31. Tag',
      unit: 'KM für jeden weiteren Tag',
      hint: (base: string, rate: string) =>
        `Zum Grundpreis von ${base} für 30 Tage kommen ${rate} für jeden weiteren Tag hinzu.`,
    },
    minStay: (days: string) => `Die Mindestparkdauer beträgt ${days}.`,
    howTitle: 'Wie wird die Anzahl der Tage berechnet?',
    how: [
      'Die Berechnung beginnt mit der genauen Ankunftszeit auf dem Parkplatz.',
      'Jeder angefangene 24-Stunden-Zeitraum zählt als ein Tag.',
      'Der Tagespreis richtet sich nach der Gesamtzahl der berechneten Tage.',
      'Die genaue Anzahl der Tage und den Gesamtbetrag sehen Sie, bevor Sie die Reservierung senden.',
    ],
    checkTitle: 'Preis für Ihre Daten prüfen',
    checkLead:
      'Wählen Sie Datum und Uhrzeit von Ankunft und Rückkehr, um sofort die Anzahl der Parktage und den Gesamtpreis zu sehen.',
    result: { days: 'Berechnete Tage', rate: 'Preis pro Tag', extra: 'Weitere Tage', total: 'Gesamt' },
    sameNextStep: 'Der Preis bleibt im nächsten Schritt der Reservierung derselbe, wenn Sie Ihre Angaben nicht ändern.',
    details: {
      link: 'Detaillierte Preisliste und Beispiele',
      title: 'Berechnungsbeispiele',
      note: 'Die Beispiele gelten für genau die angegebene Anzahl berechneter Tage.',
    },
    supportTitle: 'Unterstützung bei Ankunft und Rückkehr',
    supportText:
      'Unser Team steht Ihnen bei der Ankunft, bei einer Flugänderung und bei der Organisation des Rücktransfers zur Verfügung.',
    supportIncluded: 'Der Transfer zwischen Parkplatz und Flughafen ist im Preis enthalten.',
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
    lead: 'Echte Bewertungen von Reisenden, die ihr Auto bei uns abgestellt haben.',
    google: 'Bewertung 5,0 auf Google Maps',
    googleLink: 'Alle Bewertungen auf Google Maps ansehen',
    source: 'Google-Bewertung',
    starsAria: (stars: number) => `Bewertung ${stars} von 5`,
    marqueeAria: 'Bewertungen von Reisenden',
    pause: 'Bewegung anhalten',
    play: 'Bewegung fortsetzen',
  },

  news: {
    title: 'Neuigkeiten',
    lead: 'Kurze Tipps zu Parken, Transfer und Sicherheit Ihres Fahrzeugs.',
    latest: 'Aktuelle Neuigkeiten',
    all: 'Alle Neuigkeiten',
    more: 'Weitere Neuigkeiten',
    readMore: 'Weiterlesen',
    back: 'Alle Neuigkeiten',
    items: newsItems,
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
          { label: '2-4 Tage', value: '9 KM pro Tag' },
          { label: '5-10 Tage', value: '8 KM pro Tag' },
          { label: '11-20 Tage', value: '7 KM pro Tag' },
          { label: '21-30 Tage', value: '6 KM pro Tag' },
          { label: 'Ab dem 31. Tag', value: '5 KM für jeden weiteren Tag' },
        ],
        after:
          'Die Mindestparkdauer beträgt 2 Tage. Für längere Aufenthalte gewährt SKY Parking and Fly zusätzliche Rabatte und besondere Vorteile für Stammkunden.',
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
    gallery: {
      title: 'Der Parkplatz in Bildern',
      lead: 'Fotos unseres Parkplatzes: eingezäunt, beleuchtet und videoüberwacht.',
      postersTitle: 'Aus unseren Beiträgen',
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
    lead: 'Wählen Sie Ihre Daten, füllen Sie Ihre Angaben aus und senden Sie Ihre Reservierung. Die Bestätigung mit Ihrem Reservierungscode erhalten Sie sofort per E-Mail.',
    stayTitle: 'Zeitraum',
    guestTitle: 'Ihre Angaben',
    fields: {
      name: { label: 'Vor- und Nachname', placeholder: 'Amar Hodžić' },
      phone: { label: 'Telefon', placeholder: '+387 61 123 456' },
      email: { label: 'E-Mail', placeholder: 'name@beispiel.de' },
      make: { label: 'Automarke', placeholder: 'Z. B. VW Golf 7' },
      flight: { label: 'Flugnummer', placeholder: 'FR 1234' },
      note: { label: 'Hinweis', placeholder: 'Z. B. Transporter, Kindersitz, Ankunft um 4 Uhr morgens' },
    },
    errors: {
      name: { required: 'Geben Sie Ihren Namen ein.', invalid: 'Der Name muss Buchstaben enthalten.' },
      phone: {
        required: 'Geben Sie Ihre Telefonnummer an, damit wir den Termin bestätigen können.',
        invalid: 'Die Telefonnummer ist nicht gültig. Geben Sie sie mit Landesvorwahl ein, z. B. +387 61 123 456.',
      },
      email: {
        required: 'Geben Sie die E-Mail-Adresse ein, an die wir die Bestätigung senden sollen.',
        invalid: 'Die E-Mail-Adresse ist nicht gültig.',
      },
      make: { required: 'Bitte geben Sie Marke und Modell Ihres Autos an.' },
    },
    submit: {
      label: 'Reservierung senden',
      sending: 'Wird gesendet…',
      note: 'Gleich nach dem Absenden erhalten Sie eine E-Mail mit der Bestätigung, Ihrem Reservierungscode, den Terminen, dem Preis und den Regeln.',
    },
    failed: {
      title: 'Senden fehlgeschlagen',
      text: 'Prüfen Sie Ihre Verbindung und versuchen Sie es erneut. Wenn es weiter nicht klappt, senden Sie Ihre Anfrage über WhatsApp oder rufen Sie uns an.',
    },
    summary: {
      title: 'Ihre Anfrage',
      stay: 'Aufenthalt',
      rate: 'Preis pro Tag',
      extra: 'Tage nach dem 30.',
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
      email: (value: string) => `E-Mail: ${value}`,
      make: (value: string) => `Fahrzeug: ${value}`,
      flight: (value: string) => `Flug: ${value}`,
      note: (value: string) => `Hinweis: ${value}`,
    },
  },

  confirmation: {
    pageTitle: 'Vielen Dank!',
    pageLead:
      'Vielen Dank für Ihre Buchung. Wenn die Bestätigung nicht ankommt oder Sie Fragen haben, rufen Sie uns an oder schreiben Sie uns.',
    title: 'Reservierung erfolgreich',
    subject: (code: string) => `Reservierung erfolgreich ${code} | Sky Parking & Fly Sarajevo`,
    period: (from: string, to: string) => `von ${from} bis ${to}`,
    codeLabel: 'Reservierungscode',
    keepCode: 'Bewahren Sie diesen Code auf und nennen Sie ihn, wenn Sie uns kontaktieren.',
    greeting: (name: string) => `Guten Tag ${name},`,
    intro:
      'Vielen Dank für Ihre Reservierung bei Sky Parking and Fly Sarajevo. Ihre Reservierung ist eingegangen, hier sind alle Angaben.',
    detailsTitle: 'Details der Reservierung',
    labels: {
      arrival: 'Ankunft',
      departure: 'Abreise',
      days: 'Berechnete Tage',
      vehicle: 'Fahrzeug',
      name: 'Vor- und Nachname',
      phone: 'Telefon',
      email: 'E-Mail',
      flight: 'Flugnummer',
      note: 'Hinweis',
    },
    priceTitle: 'Preis',
    priceTotal: 'Gesamtpreis',
    pricePayment: 'Bezahlung in bar bei Ankunft oder Abreise.',
    rulesTitle: 'Gut zu wissen',
    rules: [
      'Die Berechnung beginnt mit der genauen Ankunftszeit auf dem Parkplatz. Jeder angefangene 24-Stunden-Zeitraum zählt als ein Tag.',
      'Flugverspätung: Wir verfolgen die Flüge und sind bei der Abholzeit flexibel, für geringfügige Verspätungen berechnen wir nichts extra.',
      'Wenn sich Ihre Rückreise verschiebt, melden Sie sich so früh wie möglich, wir verlängern die Reservierung. Unser Team ist auch bei einer Flugänderung für Sie da.',
      'Sobald Sie zurück sind und Ihr Gepäck haben, schreiben oder rufen Sie uns an. Unser Fahrer holt Sie ab und bringt Sie zurück zu Ihrem Auto.',
      'Der Transfer zum Terminal und zurück ist kostenlos und im Parkpreis enthalten. Wir helfen bei Koffern, Kinderwagen und Kindersitzen.',
      'Sie können die Schlüssel behalten oder zur Aufbewahrung bei uns lassen, ganz wie es Ihnen lieber ist.',
      'Die Bezahlung erfolgt in bar bei Ankunft oder Abreise. Wenn Sie anders bezahlen möchten, kontaktieren Sie uns bitte im Voraus.',
      'Bitte lassen Sie keine Wertsachen, Taschen oder Kabel sichtbar im Fahrzeug liegen.',
    ],
    rulePrice: (rate: string) =>
      `Der Tagespreis richtet sich nach der Gesamtzahl der berechneten Tage, und jeder Tag nach dem 30. Tag kostet ${rate}.`,
    contactTitle: 'Fragen oder Planänderung?',
    contactText: 'Schreiben oder rufen Sie uns an. Wir sind rund um die Uhr da, auch an Feiertagen.',
    contactLabels: { phone: 'Telefon, WhatsApp und Viber', email: 'E-Mail', address: 'Adresse' },
    mailSent: (email: string) =>
      `Wir haben eine Bestätigung mit diesen Angaben an ${email} gesendet. Falls Sie sie nicht sehen, prüfen Sie den Spam-Ordner.`,
    mailNotSent:
      'Die Bestätigungs-E-Mail konnte gerade nicht gesendet werden. Bewahren Sie Ihren Reservierungscode auf, wir melden uns per Nachricht oder E-Mail bei Ihnen.',
    copyCode: 'Code kopieren',
    copied: 'Code kopiert',
    print: 'Bestätigung drucken',
    another: 'Neue Reservierung',
    home: 'Zur Startseite',
  },
  viber: {
    title: 'Hat sich Viber nicht geöffnet?',
    text: (number: string) =>
      `Viber ist auf diesem Gerät möglicherweise nicht installiert. Fügen Sie die Nummer ${number} in Viber hinzu oder schreiben Sie uns auf WhatsApp.`,
    copy: 'Nummer kopieren',
    copied: 'Nummer kopiert',
    download: 'Viber laden',
    close: 'Schließen',
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
        updated: '16. Oktober 2026',
        sections: [
          {
            heading: 'Leistung',
            body: 'Sky Parking and Fly bietet das Abstellen von Fahrzeugen auf einem eingezäunten, beleuchteten und videoüberwachten Parkplatz am Flughafen Sarajevo, mit kostenlosem Transfer zum Terminal und zurück.',
          },
          {
            heading: 'Reservierung',
            body: 'Sie können Ihre Reservierung über das Formular auf dieser Website, per WhatsApp, Viber oder E-Mail oder telefonisch senden. Die Bestätigung des Termins erhalten Sie per Nachricht oder E-Mail.',
          },
          {
            heading: 'Preis',
            body: 'Der Preis gilt pro Tag: 9 KM bei einem Aufenthalt von 2 bis 4 Tagen, 8 KM von 5 bis 10 Tagen, 7 KM von 11 bis 20 Tagen und 6 KM von 21 bis 30 Tagen, und jeder Tag nach dem 30. Tag kostet 5 KM. Die Mindestparkdauer beträgt 2 Tage, und jeder angefangene 24-Stunden-Zeitraum zählt als ein Tag. Der auf der Website angezeigte Betrag ist ungefähr, Termin und Preis bestätigen wir bei der Reservierung.',
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
        updated: '15. Oktober 2026',
        sections: [
          {
            heading: 'Wer wir sind',
            body: 'Sky Parking and Fly, Dr Atifa Purivatre 38, Sarajevo. Bei Fragen zu Daten schreiben Sie uns an info@parkingandfly.ba.',
          },
          {
            heading: 'Das Reservierungsformular',
            body: 'Wenn Sie eine Reservierung über das Formular senden, werden Ihre Angaben (Name, Telefon, E-Mail, Termin, Automarke, Flugnummer und Hinweis) per E-Mail an uns übermittelt. Die Übermittlung übernimmt FormSubmit (formsubmit.co), ein Dienst mit eigenen Regeln. Wir verwenden die Angaben nur, um den Termin zu bestätigen und mit Ihnen zu kommunizieren.',
          },
          {
            heading: 'WhatsApp, Viber und E-Mail',
            body: 'Wenn Sie uns über WhatsApp, Viber oder E-Mail schreiben, senden Sie die Nachricht selbst, und diese Dienste wenden eigene Regeln an. Wir erhalten, was Sie in die Nachricht schreiben, und verwenden es nur, um den Termin zu bestätigen und mit Ihnen zu kommunizieren.',
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
