import type { Messages } from './bs.ts';

/** English plural: 1 day / 2+ days. */
const plural = (count: number, one: string, many: string): string => (Math.abs(count) === 1 ? one : many);

/** The four latest posts of parkingandfly.ba/novosti, translated. */
const newsItems: Messages['news']['items'] = {
  checklist: {
    title: 'Pre-trip checklist: 5 small things that make a big difference',
    excerpt:
      'A few quick things before you hop on the transfer: locks and windows, valuables, a photo of the car, tyres and timing.',
    alt: 'A man in a suit noting down the condition of a car next to its wing mirror',
    blocks: [
      { type: 'heading', text: 'Pre-trip checklist: leave your car without a worry' },
      { type: 'p', text: 'A few quick things before you hop on the transfer:' },
      {
        type: 'checks',
        items: [
          '**Locks and windows:** check once more, 30 seconds for peace of mind.',
          '**Valuables:** move them out of sight (bags, cables, phone holders).',
          '**A photo of the car:** one picture with your phone saves a lot of nerves.',
          '**Tyres and fluids** (for longer stays): make sure you can drive straight away when you return.',
          '**Timing:** arrive 15-20 minutes early, the rest goes quickly, the driver is there.',
        ],
      },
      {
        type: 'p',
        text: 'We take you to the entrance and handle the logistics; you get on your plane without rushing.',
      },
    ],
  },
  security: {
    title: 'Safety first: what exactly we do so you can relax about your car',
    excerpt: 'The lot is fenced, lit and under video surveillance. Only customers and staff have access.',
    alt: 'A blue Private parking sign and a pole with a video surveillance camera and a floodlight',
    blocks: [
      { type: 'heading', text: 'Vehicle security: 24/7 surveillance and a fenced area' },
      {
        type: 'p',
        text: 'The lot is fenced, lit and under video surveillance. Only customers and staff have access. We have clear entry and exit rules and a log of movements.',
      },
      {
        type: 'p',
        text: 'We do not leave cars “somewhere nearby” and we do not improvise. If you like, we do a short visual check together when we take over your car, so you set off with peace of mind and come back with even more.',
      },
      {
        type: 'p',
        text: 'In winter we clear the access roads, in summer we keep an eye on the crowds; the goal is for everything to go fast, but never at the expense of safety. The transfer runs when it is busy and at dawn.',
      },
    ],
  },
  transfer: {
    title: 'Airport transfer, step by step',
    excerpt:
      'You arrive and park (or hand over the key), we help with the luggage, and the transfer to the terminal entrance takes about a minute.',
    alt: 'A traveller in a suit with a bag in front of a plane',
    blocks: [
      { type: 'heading', text: 'Free airport transfer: what it looks like' },
      {
        type: 'steps',
        items: [
          'You arrive at the lot and park (or hand over the key, whichever suits you).',
          'We help with luggage: suitcases, strollers, child seats.',
          'The transfer to the terminal entrance takes about one minute.',
          'When you are back, as soon as you have your luggage, send a message or call.',
          'Our driver comes to pick you up and takes you back to your car.',
        ],
      },
      {
        type: 'p',
        text: 'Everything is included in the parking price. No taxis, no waking up friends at 4 a.m. and no circling roundabouts.',
      },
    ],
  },
  longStay: {
    title: 'Long-term parking without worries: 11-20 and 21+ days',
    excerpt:
      'For longer stays the price drops to 7 KM per day (11-20 days) and 6 KM per day (21-30 days), and every day after the 30th costs 5 KM.',
    alt: 'Cars parked on a gravel lot',
    blocks: [
      {
        type: 'p',
        text: 'For longer stays (business, visiting family, an extended holiday) the price drops to **7 KM/day** (11-20 days) and **6 KM/day** (21-30 days), and every day after the 30th costs **5 KM**.',
      },
      {
        type: 'p',
        text: 'The lot is fenced and lit, with video surveillance and staff on site. Entries and exits are logged: everything orderly and verifiable.',
      },
      {
        type: 'p',
        text: 'Need an **invoice for your company** or a special confirmation? We issue it right away. If your return date changes, we **extend the reservation**. Your car stays where you left it, and the **transfer** is waiting when you arrive.',
      },
    ],
  },
};

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
          'Parking near Sarajevo airport: 9 KM per day (2-4 days), 8 KM (5-10), 7 KM (11-20), 6 KM (21-30), then 5 KM per extra day. Transfer and security included.',
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
      news: {
        title: 'News | Sky Parking & Fly',
        description:
          'Tips and news about parking at Sarajevo airport: a pre-trip checklist, vehicle safety, the transfer and longer stays.',
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
      news: 'News',
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
    title: 'Sky Parking and Fly Sarajevo',
    distance: '800 metres from the airport',
    lead: 'Fenced, lit parking under 24/7 video surveillance, with a free transfer to the terminal and back in just 2 minutes.',
    message: 'Message us on',
  },

  stayBar: {
    aria: 'Stay dates',
    arrival: 'Arrival',
    departure: 'Departure',
    date: 'Date',
    time: 'Time',
    estimate: 'Estimated price',
    line: (days: string, rate: string) => `${days} × ${rate} per day`,
    lineExtra: (days: string, first: string, extra: string) => `${days}: ${first} + ${extra}`,
  },

  stayErrors: {
    dropOffMissing: 'Choose an arrival date and time.',
    dropOffPast: 'The arrival time has already passed.',
    pickUpMissing: 'Choose a departure date and time.',
    pickUpBeforeDropOff: 'Departure must be after arrival.',
    rangeTooShort: (minDays: number) =>
      `The minimum parking time is ${minDays} ${plural(minDays, 'day', 'days')}. For a shorter stay, please contact us.`,
    rangeTooLong: (maxDays: number) =>
      `For stays longer than ${maxDays} days, call us and we will agree a special price.`,
  },

  picker: {
    chooseDate: 'Choose a date',
    chooseTime: 'Choose a time',
    previousMonth: 'Previous month',
    nextMonth: 'Next month',
    today: 'Today',
    hours: 'Hour',
    minutes: 'Minutes',
    done: 'Done',
    close: 'Close',
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
      from2: { label: '2-4 days', hint: 'For shorter trips, weekend breaks and business flights.' },
      from5: { label: '5-10 days', hint: 'Affordable parking for holidays and trips.' },
      from11: { label: '11-20 days', hint: 'A lower daily price for a longer stay.' },
      from21: { label: '21-30 days', hint: 'The best prices for longer journeys.' },
    },
    extra: {
      label: 'After day 30',
      unit: 'KM for each additional day',
      hint: (base: string, rate: string) =>
        `The basic price of ${base} for 30 days goes up by ${rate} for every further day.`,
    },
    minStay: (days: string) => `The minimum parking time is ${days}.`,
    howTitle: 'How is the number of days calculated?',
    how: [
      'The count starts at the exact time you arrive at the parking.',
      'Every started 24-hour period counts as one day.',
      'The daily price depends on the total number of counted days.',
      'You see the exact number of days and the total amount before you send the reservation.',
    ],
    checkTitle: 'Check the price for your dates',
    checkLead:
      'Choose the date and time of arrival and return to see the number of parking days and the total price right away.',
    result: { days: 'Counted days', rate: 'Price per day', extra: 'Additional days', total: 'Total' },
    sameNextStep: 'The price stays the same in the next step of the reservation if you do not change your details.',
    details: {
      link: 'Detailed price list and examples',
      title: 'Calculation examples',
      note: 'The examples apply to exactly the stated number of counted days.',
    },
    supportTitle: 'Support on arrival and return',
    supportText:
      'Our team is at your disposal when you arrive, if your flight changes and when your return transfer is arranged.',
    supportIncluded: 'The transfer between the parking and the airport is included in the price.',
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
    lead: 'Real reviews from travellers who left their car with us.',
    google: '5.0 rating on Google Maps',
    googleLink: 'See all reviews on Google Maps',
    source: 'Google review',
    starsAria: (stars: number) => `Rated ${stars} out of 5`,
    marqueeAria: 'Traveller reviews',
    pause: 'Pause scrolling',
    play: 'Resume scrolling',
  },

  news: {
    title: 'News',
    lead: 'Short tips on parking, the transfer and the safety of your vehicle.',
    latest: 'Latest news',
    all: 'All news',
    more: 'More news',
    readMore: 'Read more',
    back: 'All news',
    items: newsItems,
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
          { label: '2-4 days', value: '9 KM per day' },
          { label: '5-10 days', value: '8 KM per day' },
          { label: '11-20 days', value: '7 KM per day' },
          { label: '21-30 days', value: '6 KM per day' },
          { label: 'After day 30', value: '5 KM for each additional day' },
        ],
        after:
          'The minimum parking time is 2 days. For longer stays, SKY Parking and Fly offers additional discounts and special benefits for regular clients.',
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
    lead: 'Pick your dates, fill in your details and send your reservation. You get a confirmation with your reservation code by e-mail right away.',
    stayTitle: 'Dates',
    guestTitle: 'Your details',
    fields: {
      name: { label: 'Full name', placeholder: 'Amar Hodžić' },
      phone: { label: 'Phone', placeholder: '061 123 456' },
      email: { label: 'E-mail', placeholder: 'name@example.com' },
      make: { label: 'Car make', placeholder: 'E.g. VW Golf 7' },
      flight: { label: 'Flight number', placeholder: 'FR 1234' },
      note: { label: 'Note', placeholder: 'E.g. a van, a child seat, arriving at 4 a.m.' },
    },
    errors: {
      name: { required: 'Enter your name.', invalid: 'The name must contain letters.' },
      phone: {
        required: 'Enter your phone number so we can confirm your dates.',
        invalid: 'The phone number is not valid (e.g. 061 123 456).',
      },
      email: {
        required: 'Enter the e-mail address where we should send the confirmation.',
        invalid: 'The e-mail address is not valid.',
      },
      flight: { invalid: 'The flight number is not valid (e.g. FR 1234).' },
    },
    submit: {
      label: 'Send reservation',
      sending: 'Sending…',
      note: 'Right after sending, you get an e-mail with the confirmation, your reservation code, the dates, the price and the rules.',
    },
    failed: {
      title: 'Sending failed',
      text: 'Check your connection and try again. If it keeps failing, send your request on WhatsApp or call us.',
    },
    summary: {
      title: 'Your request',
      stay: 'Stay',
      rate: 'Price per day',
      extra: 'Days after the 30th',
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
      email: (value: string) => `E-mail: ${value}`,
      make: (value: string) => `Vehicle: ${value}`,
      flight: (value: string) => `Flight: ${value}`,
      note: (value: string) => `Note: ${value}`,
    },
  },

  confirmation: {
    title: 'Reservation successful',
    subject: (code: string) => `Reservation successful ${code} | Sky Parking & Fly Sarajevo`,
    period: (from: string, to: string) => `from ${from} to ${to}`,
    codeLabel: 'Reservation code',
    keepCode: 'Keep this code and quote it when you contact us.',
    greeting: (name: string) => `Hello ${name},`,
    intro:
      'Thank you for reserving parking at Sky Parking and Fly Sarajevo. Your reservation has been received, and these are all the details.',
    detailsTitle: 'Reservation details',
    labels: {
      arrival: 'Arrival',
      departure: 'Departure',
      days: 'Counted days',
      vehicle: 'Vehicle',
      name: 'Full name',
      phone: 'Phone',
      email: 'E-mail',
      flight: 'Flight number',
      note: 'Note',
    },
    priceTitle: 'Price',
    priceTotal: 'Total price',
    pricePayment: 'Payment in cash on arrival or departure.',
    rulesTitle: 'Good to know',
    rules: [
      'Billing starts at the exact time you arrive at the parking. Every started 24-hour period counts as one day.',
      'Flight delays: we monitor flights and are flexible with the pickup time, and we do not charge extra for minor delays.',
      'If your return date changes, let us know as soon as you can and we will extend the reservation. Our team is also there for you when your flight changes.',
      'When you are back and have your luggage, send a message or call. Our driver comes to pick you up and takes you back to your car.',
      'The transfer to the terminal and back is free and included in the parking price. We help with suitcases, strollers and child seats.',
      'You can keep your keys or leave them with us for safekeeping, whichever suits you.',
      'Payment is in cash on arrival or departure. If you would like to pay another way, contact us in advance.',
      'Please do not leave valuables, bags or cables in sight in the vehicle.',
    ],
    rulePrice: (rate: string) =>
      `The daily price depends on the total number of counted days, and every day after the 30th costs ${rate}.`,
    contactTitle: 'Questions or a change of plan?',
    contactText: 'Message or call us. We are open non-stop, including holidays.',
    contactLabels: { phone: 'Phone, WhatsApp and Viber', email: 'E-mail', address: 'Address' },
    mailSent: (email: string) =>
      `We sent a confirmation with these details to ${email}. If you do not see it, check your spam folder.`,
    mailNotSent:
      'The confirmation e-mail could not be sent right now. Keep your reservation code, and we will get back to you by message or e-mail.',
    copyCode: 'Copy code',
    copied: 'Code copied',
    print: 'Print confirmation',
    another: 'New reservation',
    home: 'Back to home',
  },
  viber: {
    title: 'Did Viber not open?',
    text: (number: string) =>
      `Viber may not be installed on this device. Add the number ${number} in Viber or message us on WhatsApp.`,
    copy: 'Copy number',
    copied: 'Number copied',
    download: 'Get Viber',
    close: 'Close',
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
        updated: 'October 16, 2026',
        sections: [
          {
            heading: 'Service',
            body: 'Sky Parking and Fly offers vehicle parking on a fenced, lit and video-monitored lot near Sarajevo airport, with a free transfer to the terminal and back.',
          },
          {
            heading: 'Reservation',
            body: 'You can send a reservation with the form on this site, through WhatsApp, Viber or e-mail, or by phone. You receive a confirmation of the dates by message or e-mail.',
          },
          {
            heading: 'Price',
            body: 'The price is per day: 9 KM for a stay of 2 to 4 days, 8 KM for 5 to 10 days, 7 KM for 11 to 20 days and 6 KM for 21 to 30 days, and every day after the 30th costs 5 KM. The minimum parking time is 2 days, and every started 24-hour period counts as one day. The amount shown on the site is an estimate, and we confirm the dates and price when you reserve.',
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
        updated: 'October 15, 2026',
        sections: [
          {
            heading: 'Who we are',
            body: 'Sky Parking and Fly, Dr Atifa Purivatre 38, Sarajevo. For any question about data, write to info@parkingandfly.ba.',
          },
          {
            heading: 'The reservation form',
            body: 'When you send a reservation with the form, the details you enter (name, phone, e-mail, dates, car make, flight number and note) are e-mailed to us. The transfer is handled by FormSubmit (formsubmit.co), a service that applies its own rules. We use the details only to confirm your dates and to communicate with you.',
          },
          {
            heading: 'WhatsApp, Viber and e-mail',
            body: 'If you write to us on WhatsApp, Viber or by e-mail, you send the message yourself and those services apply their own rules. We receive what you put in the message and use it only to confirm your dates and to communicate with you.',
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
