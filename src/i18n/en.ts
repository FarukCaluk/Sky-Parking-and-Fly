import type { Messages } from './bs';

/** English plural: 1 day / 2+ days. */
const plural = (count: number, one: string, many: string): string => (Math.abs(count) === 1 ? one : many);

export const en: Messages = {
  meta: {
    siteName: 'Sky Parking & Fly',
    ogLocale: 'en_US',
    pages: {
      home: {
        title: 'Sky Parking & Fly | Private parking 800 m from Sarajevo airport',
        description:
          'Fenced, lit and video-monitored parking near Sarajevo airport. Free transfer to the terminal and back, from 6 KM per day.',
      },
      pricing: {
        title: 'Parking prices | Sky Parking & Fly',
        description:
          'Parking near Sarajevo airport: 8 KM per day (1-10 days), 7 KM (11-20 days), 6 KM (21+ days). Transfer and security included. Work out your stay.',
      },
      facilities: {
        title: 'Facility and security | Sky Parking & Fly',
        description:
          'Fenced and lit parking, 24/7 video surveillance and staff on site. See what our parking near Sarajevo airport looks like.',
      },
      shuttle: {
        title: 'Free transfer to the terminal | Sky Parking & Fly',
        description:
          'About a minute to the terminal entrance, with help for your luggage. On your return, send a message or call and a driver comes to get you.',
      },
      reviews: {
        title: 'Traveller reviews | Sky Parking & Fly',
        description: 'What travellers say about leaving their car at our parking near Sarajevo airport.',
      },
      faq: {
        title: 'Frequently asked questions | Sky Parking & Fly',
        description:
          'Answers to the most common questions about private parking near Sarajevo airport: security, booking, payment, prices, transfer, keys and flight delays.',
      },
      contact: {
        title: 'Contact | Sky Parking & Fly',
        description:
          'Call us or message us on WhatsApp or Viber. Dr Atifa Purivatre 38, Sarajevo. Open 24/7, including holidays.',
      },
      reservation: {
        title: 'Book parking | Sky Parking & Fly',
        description:
          'Pick your dates, see the estimated price and send your reservation via WhatsApp, Viber or e-mail.',
      },
      terms: {
        title: 'Terms of use | Sky Parking & Fly',
        description: 'Terms for the parking and transfer service.',
      },
      privacy: {
        title: 'Privacy policy | Sky Parking & Fly',
        description: 'How we handle the information you send us.',
      },
      cookies: {
        title: 'Cookie policy | Sky Parking & Fly',
        description: 'What this site stores in your browser.',
      },
      notFound: {
        title: 'Page not found | Sky Parking & Fly',
        description: 'The page you are looking for does not exist.',
      },
    },
  },

  common: {
    skipToContent: 'Skip to content',
    close: 'Close',
    optional: 'Optional',
  },

  language: {
    label: 'Language',
    names: { bs: 'Bosanski', en: 'English', de: 'Deutsch' },
    codes: { bs: 'BS', en: 'EN', de: 'DE' },
    switchTo: (name: string) => `Switch language: ${name}`,
  },

  nav: {
    aria: 'Main navigation',
    homeAria: 'Sky Parking & Fly, home',
    pages: {
      home: 'Home',
      pricing: 'Pricing',
      facilities: 'Facility',
      shuttle: 'Shuttle',
      reviews: 'Reviews',
      faq: 'FAQ',
      contact: 'Contact',
      reservation: 'Reservation',
      terms: 'Terms of use',
      privacy: 'Privacy policy',
      cookies: 'Cookie policy',
    },
    book: 'Book',
    callUs: (phone: string) => `Call us: ${phone}`,
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchToLight: 'Switch to light theme',
    switchToDark: 'Switch to dark theme',
    lightTheme: 'Light theme',
    darkTheme: 'Dark theme',
  },

  date: {
    weekdaysLong: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    monthsLong: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    short: (weekday: string, day: number, month: string) => `${weekday}, ${month} ${day}`,
    long: (weekday: string, day: number, month: string, year: number) => `${weekday}, ${month} ${day}, ${year}`,
    at: (date: string, time: string) => `${date} at ${time}`,
  },

  units: {
    days: (n: number) => `${n} ${plural(n, 'day', 'days')}`,
    perDay: 'per day',
  },

  photos: {
    jet: 'A plane takes off above the cars parked at Sky Parking & Fly, with mountains behind',
    entrance:
      'The entrance: a grey sheet-metal fence with a blue Sky Parking & Fly sign and an ULAZ (entrance) arrow, and a gravel lot with cars behind it',
    sign: 'The Sky Parking & Fly Sarajevo sign: parking near Sarajevo airport, 24h surveillance and transfer, ULAZ (entrance) and phone 062/963/901',
    pole: 'A blue Private parking sign and a pole with a video surveillance camera and a floodlight',
  },

  hero: {
    title: 'Parking 800 metres from the airport',
    lead: 'Fenced, lit parking under 24/7 video surveillance, with a free transfer to the terminal and back.',
  },

  stayBar: {
    aria: 'Stay dates',
    arrival: 'Arrival',
    departure: 'Departure',
    date: 'Date',
    time: 'Time',
    estimate: 'Estimated price',
    line: (days: string, rate: string) => `${days} × ${rate} per day`,
  },

  stayErrors: {
    dropOffMissing: 'Choose an arrival date and time.',
    dropOffPast: 'The arrival time has already passed.',
    pickUpMissing: 'Choose a departure date and time.',
    pickUpBeforeDropOff: 'Departure must be after arrival.',
    rangeTooLong: (maxDays: number) =>
      `For stays longer than ${maxDays} days, call us and we will agree a special price.`,
  },

  journey: {
    title: 'From the lot to the terminal in about a minute',
    lead: 'Leave your car, we drive you. On your return, we come to get you.',
    steps: {
      book: {
        title: 'Book',
        text: 'Pick your dates and send your request. You get a confirmation by message or e-mail.',
      },
      park: {
        title: 'Park',
        text: 'Park yourself or leave us the key, whichever suits you. We help with suitcases, strollers and child seats.',
      },
      ride: {
        title: 'We drive you',
        text: 'It is about a minute to the terminal entrance. Free, included in the parking price.',
      },
      back: {
        title: 'Come back',
        text: 'Once you have your luggage, send a message or call us. A driver comes to get you and takes you back to your car.',
      },
    },
    map: {
      aria: 'Diagram of the route from the parking to the airport: 800 metres, 1 to 2 minutes by car',
      parking: 'Parking',
      airport: 'Airport',
      distance: '800 m',
      time: '1-2 min',
      note: 'Diagram, not to scale',
    },
  },

  price: {
    title: 'The longer you stay, the cheaper each day',
    lead: 'The price is per day and depends on the length of your stay. Transfer, video surveillance and on-site security are included.',
    unit: 'KM per day',
    daysLabel: 'How many days are you staying',
    sliderAria: 'Length of stay in days',
    totalLabel: 'Total',
    totalFor: (days: string) => `for ${days}`,
    saving: (amount: string) => `You save ${amount}`,
    approx: 'Estimated price',
    tiers: {
      short: {
        label: '1-10 days',
        hint: 'The ideal solution for short stays and quick trips.',
      },
      mid: {
        label: '11-20 days',
        hint: 'The most popular choice for travellers staying longer, a great balance of price and convenience.',
      },
      long: {
        label: '21+ days',
        hint: 'The best value for long stays, maximum security at the best price.',
      },
    },
    includedTitle: 'Included in the price',
    included: [
      'Free transfer to the airport',
      '24/7 video surveillance',
      'Physical security',
      'Fenced and well-lit area',
      'Discount for longer stays',
    ],
    payment: 'Payment in cash on arrival or departure. If you would like to pay another way, contact us in advance.',
    longStay: 'For longer stays and regular customers we offer extra discounts and special benefits.',
    currency: 'All prices are in convertible marks (KM, currency code BAM).',
  },

  lot: {
    title: 'Your car is never left unwatched',
    facts: {
      fenced: { title: 'Fenced area', text: 'Only customers and staff have access.' },
      cctv: { title: '24/7 video surveillance', text: 'The parking is under video surveillance around the clock.' },
      staff: {
        title: 'Staff on site',
        text: 'Physical security, clear entry and exit rules and a log of movements.',
      },
      keys: {
        title: 'The keys stay with you',
        text: 'Your car stays locked. You can keep the keys or leave them with us for safekeeping.',
      },
    },
    link: 'See the facility',
    entranceCaption: 'The entrance is to the right of the sign.',
    poleCaption: 'Camera and floodlight on a pole.',
  },

  reviews: {
    title: 'What travellers say',
    lead: 'Experiences from travellers who left their car with us.',
    google: '5.0 rating on Google Maps',
    googleLink: 'All reviews on Google Maps',
    items: {
      nedim: {
        title: 'Best experience so far',
        quote:
          'When you come back from a trip and someone is waiting for you at the airport exit, that is priceless. Full praise to the Sky Parking and Fly team.',
        name: 'Nedim K.',
      },
      lejla: {
        title: 'A great relief for travellers',
        quote:
          'You do not have to think about taxis or waiting. You leave the car and they take care of everything else.',
        name: 'Lejla B.',
      },
      jasmin: {
        title: 'I am coming back!',
        quote:
          'This is already my third time using Sky Parking and Fly and I am very satisfied every time. Highly recommended!',
        name: 'Jasmin H.',
      },
      ajla: {
        title: 'Reliable and fast',
        quote:
          'Short wait, clear communication and friendly staff. I cannot imagine a better solution when flying from Sarajevo.',
        name: 'Ajla S.',
      },
      haris: {
        title: 'Easy booking',
        quote:
          'The reservation took 1 minute, everything was clear and precise. I got the confirmation by e-mail right away.',
        name: 'Haris V.',
      },
      mirela: {
        title: 'Great for families with children',
        quote:
          'We were travelling with a small child and the transfer to the airport was quick and comfortable. The people are really accommodating.',
        name: 'Mirela D.',
      },
    },
  },

  faq: {
    title: 'Frequently asked questions',
    lead: 'Here you will find answers to the most frequently asked questions about our private parking services near Sarajevo Airport.',
    all: 'All questions',
    more: 'See more',
    items: [
      {
        q: 'Is Sky Parking and Fly safe for long-term parking?',
        a: 'Yes, our parking area is fenced, under video surveillance, and secured 24/7. Your vehicle is safe with us, whether it stays for one day or several weeks.',
      },
      {
        q: 'How can I book my parking spot online?',
        a: 'You can make a reservation through our website by entering basic information and dates. You will receive a confirmation immediately via email or message.',
      },
      {
        q: 'What payment options are available?',
        a: 'Payment is made in cash upon arrival or departure, depending on what suits you best. If you prefer to pay using another method, feel free to contact us in advance so we can arrange it and reserve your spot.',
      },
      {
        q: 'How much does parking cost per day and per week?',
        a: 'The parking price depends on the length of stay:',
        list: [
          { label: '1-10 days', value: '8 KM per day' },
          { label: '11-20 days', value: '7 KM per day' },
          { label: '21+ days', value: '6 KM per day' },
        ],
        after:
          'For longer stays, SKY Parking and Fly offers additional discounts and special benefits for regular clients.',
      },
      {
        q: 'Where exactly is Sky Parking and Fly located in relation to the airport?',
        a: 'Our parking is located just 800 meters, or a one-minute drive, from the main entrance of Sarajevo International Airport. You will receive the location automatically when you make a reservation.',
      },
      {
        q: 'Do you offer free transfer to and from the airport?',
        a: 'Yes, we provide a free and fast transfer to the terminal and back, immediately after you park your vehicle.',
      },
      {
        q: 'Can I leave my car keys with you?',
        a: 'If you wish, yes. You can keep them with yourself or leave them with us for safekeeping. The keys are locked and stored securely.',
      },
      {
        q: 'Is the parking open 24/7?',
        a: 'Yes, we operate 24/7. You can contact us and park your vehicle at any time of day or night, including holidays.',
      },
      {
        q: 'What happens if my flight is delayed or I return later than planned?',
        a: 'No worries, we monitor your flights and are flexible with the pickup time. Your vehicle will be waiting for you without extra charges for a minor delay.',
      },
      {
        q: 'How can I contact support if I have additional questions?',
        a: 'Simply call us, send a message, or contact us via WhatsApp. We are here to make your journey easier.',
      },
    ],
  },

  facilities: {
    title: 'Fenced. Lit. Watched.',
    lead: 'Private parking near Sarajevo airport. Your vehicle stays in a fenced area, under constant control and with staff on site.',
    features: {
      fenced: { title: 'Fenced area', text: 'Only customers and staff have access.' },
      lit: { title: 'Lit area', text: 'Floodlights on poles light up the parking.' },
      cctv: { title: '24/7 video surveillance', text: 'Cameras on poles watch the parking around the clock.' },
      staff: {
        title: 'Physical security',
        text: 'Staff are on site. We have clear entry and exit rules and a log of movements.',
      },
      keys: {
        title: 'Keys',
        text: 'Your car stays locked and you can keep the keys. If you leave them with us, we lock them away and store them securely.',
      },
      check: {
        title: 'Check at pickup',
        text: 'If you like, we do a short visual check of the car together when you collect it.',
      },
    },
    find: {
      title: 'How to recognise us',
      text: 'Look for the blue sign that says ULAZ (entrance). The entrance is to the right of the sign.',
      address: 'Dr Atifa Purivatre 38, Sarajevo',
      cta: 'Get directions',
    },
  },

  shuttle: {
    title: 'Free transfer to the terminal',
    lead: 'We drive you to the terminal entrance in about a minute. Both ways, included in the parking price.',
    howTitle: 'How it works',
    steps: [
      { title: 'You park', text: 'You arrive and park, or hand over the key, whichever is easier for you.' },
      { title: 'We help with luggage', text: 'Suitcases, strollers, child seats: we help with everything.' },
      { title: 'We drive you to the terminal', text: 'The ride to the terminal entrance takes about a minute.' },
      { title: 'Message us when you land', text: 'As soon as you have your luggage, send a message or call us.' },
      { title: 'We take you back to your car', text: 'Our driver comes to get you and drives you back to your car.' },
    ],
    closing:
      'Everything is included in the parking price. No taxis, no calling a friend at 4 a.m. and no circling roundabouts.',
    delay: {
      title: 'If your flight is late',
      text: 'We monitor flights and are flexible with the pickup time. We do not charge extra for minor delays.',
    },
    checklist: {
      title: 'Before you go',
      items: [
        'Locks and windows: check once more, peace of mind in 30 seconds.',
        'Valuables: move bags, cables and phone holders out of sight.',
        'A photo of the car: one snapshot with your phone saves nerves.',
        'Tyres and fluids (for longer stays): make sure you can drive straight away when you return.',
        'Timing: arrive 15-20 minutes early, the rest goes fast because the driver is there.',
      ],
    },
  },

  contact: {
    title: 'Call us. We are open non-stop.',
    lead: 'You can park at any time of day or night, including holidays.',
    channels: {
      phone: { label: 'Phone', hint: 'Every day, 24 hours' },
      whatsapp: { label: 'WhatsApp', hint: 'Message or call' },
      viber: { label: 'Viber', hint: 'Message or call' },
      email: { label: 'E-mail', hint: 'For enquiries and bookings' },
    },
    whatsappGeneric: 'Hello, I would like to book parking.',
    addressTitle: 'Address',
    hoursTitle: 'Opening hours',
    hours: 'Non-stop, every day, including holidays',
    map: {
      title: 'Location',
      show: 'Show map',
      note: 'The map only loads when you ask for it.',
      embedTitle: 'Map of the Sky Parking & Fly location',
      google: 'Google Maps',
      apple: 'Apple Maps',
    },
  },

  reservation: {
    title: 'Reservation',
    lead: 'Pick your dates, see the estimated price and send your request. You get a confirmation by message or e-mail.',
    stayTitle: 'Dates',
    guestTitle: 'Your details',
    fields: {
      name: { label: 'Full name', placeholder: 'Amar Hodžić' },
      phone: { label: 'Phone', placeholder: '061 123 456' },
      plate: { label: 'Licence plate', placeholder: 'A12-K-345' },
      flight: { label: 'Flight number', placeholder: 'FR 1234' },
      note: { label: 'Note', placeholder: 'E.g. a van, a child seat, arriving at 4 a.m.' },
    },
    errors: {
      name: { required: 'Enter your name.', invalid: 'The name must contain letters.' },
      phone: { invalid: 'The phone number is not valid (e.g. 061 123 456).' },
      plate: { invalid: 'The plate is not valid (e.g. A12-K-345).' },
      flight: { invalid: 'The flight number is not valid (e.g. FR 1234).' },
    },
    summary: {
      title: 'Your request',
      stay: 'Stay',
      rate: 'Price per day',
      total: 'Estimated total',
    },
    send: {
      title: 'Send your request',
      hint: 'The message is sent from your own device, and we confirm the dates.',
      whatsapp: 'Send on WhatsApp',
      viber: 'Viber',
      email: 'E-mail',
      call: 'Call',
      viberCopied: 'The text is copied. Paste it into the Viber chat.',
      fixErrors: 'Check the highlighted fields.',
      previewTitle: 'Message text',
    },
    message: {
      subject: 'Parking reservation',
      greeting: 'Hello, I would like to book parking.',
      arrival: (when: string) => `Arrival: ${when}`,
      departure: (when: string) => `Departure: ${when}`,
      stay: (days: string, total: string) => `Stay: ${days}, about ${total}`,
      name: (value: string) => `Name: ${value}`,
      phone: (value: string) => `Phone: ${value}`,
      plate: (value: string) => `Vehicle: ${value}`,
      flight: (value: string) => `Flight: ${value}`,
      note: (value: string) => `Note: ${value}`,
    },
  },

  footer: {
    ctaTitle: 'Leave your car with us',
    ctaText: 'Book online or call us, 24 hours a day.',
    contact: 'Contact',
    pages: 'Pages',
    legal: 'Legal',
    language: 'Language',
    navAria: 'Footer navigation',
    hours: 'Open 24/7, including holidays',
    rights: (year: number) => `© ${year} Sky Parking and Fly. All rights reserved.`,
    toTop: 'Back to top',
  },

  legal: {
    updated: (date: string) => `Updated ${date}`,
    docs: {
      terms: {
        title: 'Terms of use',
        updated: 'October 13, 2026',
        sections: [
          {
            heading: 'Service',
            body: 'Sky Parking and Fly offers vehicle parking on a fenced, lit and video-monitored lot near Sarajevo airport, with a free transfer to the terminal and back.',
          },
          {
            heading: 'Reservation',
            body: 'You can send a reservation through this site (WhatsApp, Viber or e-mail) or by phone. You receive a confirmation of the dates by message or e-mail.',
          },
          {
            heading: 'Price',
            body: 'The price is per day: 8 KM for a stay of 1 to 10 days, 7 KM for 11 to 20 days and 6 KM for 21 days or more. The amount shown on the site is an estimate, and we confirm the dates and price when you reserve.',
          },
          {
            heading: 'Payment',
            body: 'Payment is made in cash on arrival or departure. For another payment method, contact us in advance.',
          },
          {
            heading: 'Keys and flight delays',
            body: 'You can keep your keys or leave them with us for safekeeping. We monitor flights and are flexible with the pickup time, and we do not charge extra for minor delays.',
          },
          {
            heading: 'Valuables',
            body: 'Please do not leave valuables, bags or cables in sight in the vehicle.',
          },
        ],
      },
      privacy: {
        title: 'Privacy policy',
        updated: 'October 13, 2026',
        sections: [
          {
            heading: 'Who we are',
            body: 'Sky Parking and Fly, Dr Atifa Purivatre 38, Sarajevo. For any question about data, write to info@parkingandfly.ba.',
          },
          {
            heading: 'What happens to the form data',
            body: 'The reservation form on this site does not send data to our server. What you enter is used only to compose the message that you yourself send through WhatsApp, Viber or e-mail. Those services are run by third parties under their own rules.',
          },
          {
            heading: 'Data we receive',
            body: 'When you send us a request, we receive the details you put in the message, usually your name, dates, phone number and licence plate. We use them only to confirm your dates and to communicate with you.',
          },
          {
            heading: 'Video surveillance',
            body: 'The parking is under video surveillance to protect vehicles and property.',
          },
          {
            heading: 'Your rights',
            body: 'To access, correct or delete the data we hold about you, contact us at info@parkingandfly.ba.',
          },
        ],
      },
      cookies: {
        title: 'Cookie policy',
        updated: 'October 13, 2026',
        sections: [
          {
            heading: 'What we use',
            body: 'This site uses no tracking or advertising cookies. Your browser stores only your chosen theme (light or dark).',
          },
          {
            heading: 'Map',
            body: 'The map on the Contact page loads only after you ask for it. It then loads OpenStreetMap, which applies its own rules.',
          },
          {
            heading: 'How to delete data',
            body: 'You can delete local data at any time in your browser settings.',
          },
        ],
      },
    },
  },

  notFound: {
    code: '404',
    title: 'Page not found',
    text: 'The page you are looking for does not exist or has moved.',
    home: 'Back to home',
  },
};
