import type { Messages } from './bs';

/** English plural: 1 day / 2+ days. */
const plural = (count: number, one: string, many: string): string => (Math.abs(count) === 1 ? one : many);

export const en: Messages = {
  meta: {
    siteName: 'Sky Parking & Fly',
    ogLocale: 'en_US',
    pages: {
      home: {
        title: 'Sky Parking & Fly — Secure airport parking and shuttle transfer',
        description:
          'Guarded parking minutes from the terminal, 24/7 video surveillance, a free shuttle and insured vehicles. Get your price and book online in under a minute.',
      },
      pricing: {
        title: 'Prices and parking calculator — Sky Parking & Fly',
        description:
          'Transparent airport parking prices: covered and open-air, discounts for longer stays and a calculator that shows the total including VAT instantly.',
      },
      facilities: {
        title: 'Facilities and security — Sky Parking & Fly',
        description:
          'Live video surveillance, automatic barriers with plate recognition, staff on site 24/7 and real-time parking occupancy in one place.',
      },
      shuttle: {
        title: 'Free shuttle to the terminal — Sky Parking & Fly',
        description:
          'A free shuttle every 15 minutes to Sarajevo airport terminal. See the route, the departure schedule and the time to the next shuttle.',
      },
      reviews: {
        title: 'Traveller reviews — Sky Parking & Fly',
        description: 'What travellers who left their car with us say: ratings, experiences and verified reviews.',
      },
      contact: {
        title: 'Contact — Sky Parking & Fly',
        description:
          'Get in touch via WhatsApp, Viber, phone or e-mail. Opening hours, address and the parking location on the map.',
      },
      terms: {
        title: 'Terms of use — Sky Parking & Fly',
        description: 'Terms of use for the parking and shuttle transfer service.',
      },
      privacy: {
        title: 'Privacy policy — Sky Parking & Fly',
        description: 'How we process and protect your personal data.',
      },
      cookies: {
        title: 'Cookie policy — Sky Parking & Fly',
        description: 'What data this website stores in your browser.',
      },
      notFound: {
        title: 'Page not found — Sky Parking & Fly',
        description: 'The requested page does not exist.',
      },
    },
  },

  common: {
    skipToContent: 'Skip to content',
    close: 'Close',
    optional: 'Optional',
    back: 'Back',
    loading: 'Loading…',
  },

  language: {
    label: 'Language',
    names: { bs: 'Bosanski', en: 'English', de: 'Deutsch' },
    codes: { bs: 'BS', en: 'EN', de: 'DE' },
    switchTo: (name: string) => `Switch language: ${name}`,
  },

  nav: {
    aria: 'Main navigation',
    homeAria: 'Sky Parking & Fly — home',
    pages: {
      home: 'Home',
      pricing: 'Prices',
      facilities: 'Facilities',
      shuttle: 'Shuttle',
      reviews: 'Reviews',
      contact: 'Contact',
      terms: 'Terms of use',
      privacy: 'Privacy policy',
      cookies: 'Cookie policy',
    },
    book: 'Book',
    bookParking: 'Book parking',
    callUs: (phone: string) => `Call us: ${phone}`,
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
    calendarHeader: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
    monthTitle: (month: string, year: number) => `${month} ${year}`,
  },

  units: {
    days: (n: number) => `${n} ${plural(n, 'day', 'days')}`,
    dayWord: (n: number) => plural(n, 'day', 'days'),
    services: (n: number) => `${n} ${plural(n, 'service', 'services')}`,
    perDayShort: '/day',
    perDayLong: 'per day',
    kmPerDay: 'KM / day',
  },

  validation: {
    stay: {
      dropOffMissing: 'Choose a date and time to drop off your vehicle.',
      dropOffPast: 'The drop-off time has already passed.',
      pickUpMissing: 'Choose a date and time to pick up your vehicle.',
      pickUpBeforeDropOff: 'Pick-up must be after drop-off.',
      rangeTooLong: (maxDays: number) =>
        `Online booking is available for up to ${maxDays} ${plural(maxDays, 'day', 'days')}. Please contact us for longer stays.`,
    },
    fullName: { required: 'Enter your full name.', invalid: 'Enter your first and last name (e.g. Amar Hodžić).' },
    email: { required: 'Enter your e-mail address.', invalid: 'The e-mail address is not valid.' },
    phone: { required: 'Enter your phone number.', invalid: 'The phone number is not valid (e.g. 061 000 000).' },
    plate: { required: 'Enter the licence plate.', invalid: 'The licence plate is not valid (e.g. A12-K-345).' },
    make: { required: 'Enter the vehicle make and model.' },
    passengers: {
      required: 'Enter the number of passengers.',
      range: 'The number of passengers must be between 1 and 8.',
    },
    flightNumber: { invalid: 'The flight number is not valid (e.g. JU 123).' },
  },

  pricing: {
    tiers: {
      short: { label: '1–3 days', hint: 'Short trip' },
      week: { label: '4–7 days', hint: 'Week' },
      extended: { label: '8–14 days', hint: 'Extended' },
      long: { label: '15+ days', hint: 'Long stay' },
    },
    vehicles: {
      car: { label: 'Car', shortLabel: 'Car', hint: 'Passenger car' },
      suv: { label: 'SUV', shortLabel: 'SUV', hint: 'Off-road / crossover' },
      van: { label: 'Van', shortLabel: 'Van', hint: 'Up to 3.5 t' },
      moto: { label: 'Motorbike', shortLabel: 'Bike', hint: 'Motorcycle' },
    },
    covers: {
      open: { label: 'Open-air', description: 'Lit and fenced open-air area' },
      covered: { label: 'Covered', description: 'Protection from snow, hail and sun' },
    },
    extras: {
      wash: {
        label: 'Exterior wash',
        shortLabel: 'Exterior wash',
        description: 'Hand wash and dry while you are away.',
      },
      interior: {
        label: 'Interior cleaning',
        shortLabel: 'Interior cleaning',
        description: 'Vacuuming, windows and dashboard cleaning.',
      },
      ev: {
        label: 'Electric vehicle charging',
        shortLabel: 'EV charging',
        description: 'A full battery waiting for your return.',
      },
      valet: {
        label: 'VIP pick-up at the terminal',
        shortLabel: 'VIP pick-up',
        description: 'We bring your car to the arrivals exit.',
      },
      insurance: {
        label: 'Extended vehicle protection',
        shortLabel: 'Extended protection',
        description: 'Comprehensive cover up to 50,000 KM.',
      },
    },
  },

  hero: {
    badge: 'Sarajevo Airport · open 24/7',
    titleLine1: 'Park without worry.',
    titleLine2: 'Fly without stress.',
    lead: (minutes: number) =>
      `Guarded, video-monitored parking ${minutes} minutes from the terminal. A free shuttle, an insured vehicle and a price you see upfront.`,
    cta: 'Book parking',
    ctaSecondary: 'See prices',
    ratingSuffix: (count: string) => `on Google · ${count} reviews`,
    valueProps: {
      secure: { title: 'Guarded parking', text: 'Fenced area with staff 24/7' },
      cctv: { title: '24/7 video surveillance', text: '48 cameras, footage kept 30 days' },
      shuttle: { title: 'Free shuttle', text: '5 minutes to the terminal' },
      insured: { title: 'Insured vehicles', text: 'Liability insurance included' },
    },
  },

  widget: {
    title: 'Quick booking',
    noDeposit: 'No deposit',
    estimate: 'Price estimate',
    rateLine: (rate: string) => `${rate} / day · VAT included`,
    saving: (amount: string) => `You save ${amount}`,
    continue: 'Continue to booking',
    footnote: 'Pay on pick-up · Free cancellation up to 24h before arrival',
  },

  stayForm: {
    coverLabel: 'Parking type',
    dropOffTime: 'Drop-off time',
    pickUpTime: 'Pick-up time',
    vehicleLabel: 'Vehicle type',
    extrasLabel: 'Extra services',
  },

  dateRange: {
    dropOff: 'Drop-off',
    pickUp: 'Pick-up',
    choose: 'Choose',
    dialog: 'Date picker',
    prevMonth: 'Previous month',
    nextMonth: 'Next month',
    today: 'today',
    hintDropOff: 'Choose your drop-off day',
    hintPickUp: 'Now choose your pick-up day',
    hintPickUpHover: (date: string) => `Pick-up: ${date}`,
  },

  how: {
    eyebrow: 'How it works',
    title: 'From booking to take-off — four steps.',
    description: 'No paperwork, no waiting at the barrier and no running to the terminal with your suitcases.',
    steps: {
      book: {
        title: 'Book online',
        text: 'Choose your dates and services — you see the price right away and the confirmation arrives in seconds.',
      },
      arrive: {
        title: 'Arrive without waiting',
        text: 'A camera recognises your licence plate and opens the barrier. Our staff guide you to your reserved space.',
      },
      shuttle: {
        title: 'Shuttle to the terminal',
        text: 'A free ride with your luggage — just five minutes to check-in.',
      },
      return: {
        title: 'Return stress-free',
        text: 'Call us after landing. The shuttle is waiting and your car is exactly where you left it.',
      },
    },
  },

  home: {
    exploreEyebrow: 'Explore',
    exploreTitle: 'Everything you need to know before you fly.',
    exploreDescription: 'Prices, security, the shuttle and traveller experiences — each on its own page.',
    pricing: {
      eyebrow: 'Prices',
      headline: (price: string) => `from ${price} / day`,
      text: 'A transparent price list, a real-time calculator and a discount for longer stays.',
      link: 'Calculate your price',
    },
    facilities: {
      eyebrow: 'Facilities',
      headline: '48 cameras',
      badge: 'Monitored 24/7',
      text: 'Video surveillance, an automatic barrier and staff on site — and you can follow occupancy live.',
      link: 'See the facilities',
    },
    shuttle: {
      eyebrow: 'Shuttle',
      next: 'Next departure',
      text: 'A free ride to the terminal every 15 minutes, and every 30 minutes at night.',
      link: 'Departure schedule',
    },
    reviews: {
      eyebrow: 'Reviews',
      headline: (score: string) => `${score} / 5`,
      text: (count: string) => `${count} Google reviews and thousands of happy travellers.`,
      link: 'Read the experiences',
    },
  },

  calculator: {
    eyebrow: 'Prices and services',
    title: 'The price you see upfront. No surprises.',
    description:
      'The longer you stay, the cheaper each day gets. Set the duration, parking type and services — the total updates instantly.',
    coveredAria: 'Covered parking',
    standard: 'Standard',
    yourChoice: 'Your choice',
    noteCar: (vat: string) =>
      `Prices for a passenger car · VAT (${vat}) included · every started day (24h) counts as a full day`,
    noteOther: (vat: string) =>
      `Prices for the selected vehicle · VAT (${vat}) included · every started day (24h) counts as a full day`,
    duration: 'Length of stay',
    dayLess: 'One day less',
    dayMore: 'One day more',
    vehicleTitle: 'Vehicle type',
    extrasTitle: 'Extra services',
    summaryTitle: 'Your estimate',
    parking: 'Parking',
    savings: 'Long-stay saving',
    vatIncluded: 'VAT included',
    coveredLower: 'covered',
    openLower: 'open-air',
    reserveFor: (total: string) => `Book for ${total}`,
    included: [
      'Free shuttle every 15 minutes',
      '24/7 video surveillance and staff on site',
      'Vehicle liability insurance',
      'Help: jump-starts and tyre inflation',
    ],
  },

  facilities: {
    eyebrow: 'Facilities and security',
    title: 'Your vehicle is watched 24 hours a day.',
    description:
      'See what the car park looks like right now — video surveillance, occupancy and the automatic barrier in one place.',
    features: {
      cctv: {
        title: '24/7 video surveillance',
        text: '48 HD cameras cover every metre of the car park. Footage is archived for 30 days.',
      },
      anpr: {
        title: 'Automatic barriers and ANPR',
        text: 'Plate recognition opens the barrier within seconds — no paperwork and no queue.',
      },
      staff: {
        title: 'Staff on site',
        text: 'Security and an attendant on every shift, including nights, holidays and weekends.',
      },
      lighting: {
        title: 'Lighting and fencing',
        text: 'LED lighting across the whole area and a 2.4 m fence with motion sensors.',
      },
      insurance: {
        title: 'Vehicle insurance',
        text: 'Liability insurance is included, and you can add comprehensive cover up to 50,000 KM.',
      },
      help: {
        title: 'Help on site',
        text: 'Jump-starts and tyre inflation — free of charge, whenever you need them.',
      },
    },
    camera: {
      title: 'Live video surveillance',
      sectionAria: 'Live video surveillance',
      tabsAria: 'Cameras',
      connecting: 'Connecting to camera…',
      offline: 'This camera is currently unavailable',
      retry: 'Try again',
      note: 'This view is a demonstration. Cameras connect through a NextFrame interface and footage is archived for 30 days.',
      imageAlt: (label: string) => `Camera: ${label}`,
      cameras: {
        entrance: { label: 'Entrance and barrier', zone: 'Main entrance' },
        'covered-a': { label: 'Sector A', zone: 'Covered parking' },
        'open-b': { label: 'Sector B', zone: 'Open-air parking' },
        shuttle: { label: 'Shuttle stop', zone: 'Departure point' },
      },
    },
    occupancy: {
      title: 'Parking occupancy',
      live: 'Live',
      free: 'free',
      status: { full: 'Almost full', filling: 'Filling up', plenty: 'Plenty of space' },
      sectors: { covered: 'Covered sector A', open: 'Open-air sector B' },
    },
    barrier: {
      title: 'Automatic barrier',
      closed: { title: 'Barrier closed', text: 'Waiting for a vehicle' },
      scanning: { title: 'Reading plate…', text: 'ANPR camera active' },
      open: { title: 'Barrier open', text: 'Booking found' },
    },
  },

  shuttle: {
    eyebrow: 'Free shuttle',
    title: 'Five minutes to the terminal. Every fifteen.',
    description:
      'The ride with your luggage is free and included in every booking. See the route and the time of the next departure.',
    panelTitle: 'Free shuttle',
    subtitle: (distance: string, minutes: number) => `${distance} to the terminal · ${minutes} minute ride`,
    frequency: 'Every 15 min · every 30 min at night',
    mapAria: (minutes: number) => `Route map: the shuttle runs from the car park to the terminal in ${minutes} minutes`,
    parkingLabel: 'Sky Parking',
    terminalLabel: 'Terminal · SJJ',
    minutesChip: (minutes: number) => `${minutes} min`,
    fromParking: 'Departures from the car park',
    fromTerminal: 'Departures from the terminal',
    next: 'Next',
    landed: 'Just landed? Call us and the shuttle will be waiting outside the exit.',
    call: 'Call',
    countdown: {
      now: 'now',
      minutes: (n: number) => `in ${n} min`,
      hours: (hours: number, minutes: string) => `in ${hours} h ${minutes} min`,
    },
    facts: {
      free: {
        title: 'Completely free',
        text: 'The ride and your luggage are included in the parking price — no extra charge.',
      },
      frequent: {
        title: 'Frequent and reliable',
        text: 'Every 15 minutes during the day and every 30 minutes at night, every day of the year.',
      },
      onCall: {
        title: 'Waiting after your flight',
        text: 'Call us after landing and the shuttle meets you outside the terminal exit.',
      },
    },
  },

  reviews: {
    eyebrow: 'Reviews',
    title: 'Travellers trust us with their vehicles.',
    description:
      'Thousands of travellers from all over Bosnia and Herzegovina and the diaspora leave their car with us — here is what they say.',
    googleCount: (count: string) => `${count} Google reviews`,
    verified: 'Verified traveller',
    ratingLabel: (rating: number) => `Rated ${rating} out of 5`,
    flightTo: (destination: string) => `flight to ${destination}`,
    disclaimer: 'Ratings and reviews are illustrative and will be replaced with real ones before launch.',
    stats: {
      travellers: 'travellers seen off',
      rating: 'average rating',
      minutes: 'to the terminal',
      recommend: 'would recommend us',
    },
    items: {
      t1: {
        city: 'Sarajevo',
        date: 'September 2026',
        trip: 'Istanbul',
        quote:
          'It was our first time leaving the car for ten days and we never once thought about it. The shuttle arrived in three minutes and the car was waiting for us, clean and in the same spot.',
      },
      t2: {
        city: 'Zenica',
        date: 'August 2026',
        trip: 'Frankfurt',
        quote:
          'Booking took under a minute. The barrier recognised me by my plate, no paperwork at all. This is how it should work everywhere.',
      },
      t3: {
        city: 'Tuzla',
        date: 'January 2026',
        trip: 'Vienna',
        quote:
          'The covered sector is a lifesaver in winter. After a week in Vienna the car was free of snow and ice, and paying on pick-up went without any surprises.',
      },
      t4: {
        city: 'Mostar',
        date: 'July 2026',
        trip: 'Dubrovnik',
        quote:
          'Great service and friendly staff. In the morning rush the shuttle took a couple of minutes, but it loaded us with our suitcases and we got there on time.',
      },
      t5: {
        city: 'Travnik',
        date: 'June 2026',
        trip: 'Munich',
        quote:
          'We travel twice a year and this has become our regular choice. We call as soon as we land and the shuttle is already waiting outside the terminal.',
      },
      t6: {
        city: 'Bihać',
        date: 'October 2026',
        trip: 'Zurich',
        quote:
          'I drive a van, so finding a safe spot was hard. Here the price is fair, VAT is included and there are no hidden costs. Recommended.',
      },
    },
  },

  contact: {
    eyebrow: 'Contact',
    title: 'We are here — 24/7, every day.',
    description:
      'A question about your booking, a delayed flight or picking up your vehicle? Reach us on the channel that suits you best.',
    channels: {
      whatsapp: { label: 'WhatsApp', hint: 'We reply within minutes' },
      viber: { label: 'Viber', hint: 'Message or call' },
      phone: { label: 'Phone', hint: 'Non-stop, 24/7' },
      email: { label: 'E-mail', hint: 'Reply within an hour' },
    },
    channelAria: (label: string, value: string) => `${label}: ${value}`,
    whatsappDates: (from: string, to: string) => `Hello! I am interested in airport parking from ${from} to ${to}.`,
    whatsappGeneric: 'Hello! I am interested in airport parking.',
    hours: {
      title: 'Opening hours',
      openNow: 'Open now',
      parking: { label: 'Parking and shuttle', value: 'Non-stop, 24/7' },
      reception: { label: 'Reception', value: 'Non-stop, 24/7' },
      admin: { label: 'Administration', value: 'Mon–Fri, 08–18h' },
    },
    map: {
      aria: 'Location map',
      terminalTitle: 'Sarajevo airport terminal',
      distance: (distance: string) => `${distance} from the car park`,
      shuttleLine: (minutes: number) => `Shuttle ${minutes} min, free`,
      google: 'Google Maps',
      apple: 'Apple Maps',
    },
  },

  footer: {
    ctaTitle: 'Book your space in under a minute.',
    ctaText: 'No deposit and no registration. You pay only when you collect your vehicle.',
    about: (minutes: number) =>
      `Secure parking and a free shuttle to Sarajevo airport terminal — ${minutes} minutes from the gate to check-in.`,
    country: 'Bosnia and Herzegovina',
    navAria: 'Footer navigation',
    pages: 'Pages',
    services: 'Services',
    legal: 'Legal',
    language: 'Language',
    rights: (year: number, company: string) => `© ${year} ${company}. All rights reserved.`,
    priceNote: 'All prices are in KM and include VAT.',
    toTop: 'Back to top',
  },

  legal: {
    updated: (date: string) => `Updated ${date}`,
    backHome: 'Back to home',
    docs: {
      terms: {
        title: 'Terms of use',
        updated: '1 October 2026',
        sections: [
          {
            heading: '1. Subject of the service',
            body: '{{legalName}} provides vehicle storage in a fenced, video-monitored car park and a free shuttle to and from the airport terminal, in line with the booked time slot.',
          },
          {
            heading: '2. Booking and price',
            body: 'A booking is confirmed the moment you receive a reference code. All prices are in convertible marks (KM) and include VAT. Charges are calculated for every started 24-hour period, counted from the time the vehicle is dropped off.',
          },
          {
            heading: '3. Payment',
            body: 'Payment is made when the vehicle is collected, in cash or by card. We do not charge any deposit for online bookings.',
          },
          {
            heading: '4. Cancellation and changes',
            body: 'You can cancel or change a booking free of charge up to 24 hours before the planned arrival, by phone, e-mail or message. If the vehicle is collected later than booked, the additional days are charged according to the current price list.',
          },
          {
            heading: '5. Liability',
            body: "The vehicle is covered by the operator's liability insurance. Please do not leave documents, cash or valuables in the vehicle. The operator is not liable for damage caused by force majeure or for pre-existing damage. When collecting, please inspect the vehicle and report any damage before leaving the car park.",
          },
        ],
      },
      privacy: {
        title: 'Privacy policy',
        updated: '1 October 2026',
        sections: [
          {
            heading: 'Who processes your data',
            body: 'The data controller is {{legalName}}, {{street}}, {{city}}. For any questions you can contact us at {{email}}.',
          },
          {
            heading: 'What data we collect',
            body: 'For a booking we process your name, e-mail address, phone number, licence plate and vehicle details, and your flight number if you provide it. Video surveillance and the plate-recognition system record vehicles at the entrance and exit.',
          },
          {
            heading: 'Purpose and retention',
            body: 'We use the data only to carry out your booking, to communicate with you and to protect property. Booking data is kept in line with statutory periods, and video footage for 30 days.',
          },
          {
            heading: 'Your rights',
            body: 'Under the Law on the Protection of Personal Data in Bosnia and Herzegovina you have the right to access, correct and delete your data. Send us your request by e-mail and we will reply within the statutory period.',
          },
        ],
      },
      cookies: {
        title: 'Cookie policy',
        updated: '1 October 2026',
        sections: [
          {
            heading: 'What we use',
            body: "This website does not use third-party marketing or analytics cookies. We only store your chosen theme (light or dark) and, if you make a booking, a record of the booking in your browser's local storage.",
          },
          {
            heading: 'How to delete it',
            body: "You can delete local data at any time in your browser settings. Deleting it restores the website's default settings.",
          },
        ],
      },
    },
  },

  notFound: {
    code: '404',
    title: 'Page not found',
    text: 'The page you are looking for does not exist or has moved. Check the address or return to the home page.',
    home: 'Back to home',
    pricing: 'See prices',
  },

  booking: {
    title: 'Parking booking',
    thanks: 'Thank you!',
    done: 'Done',
    stepEyebrow: (step: number, days: string) => `Step ${step} of 3 · ${days}`,
    stepsAria: 'Booking steps',
    stepLabels: { details: 'Details', vehicle: 'Vehicle', confirm: 'Confirm' },
    stepTitles: { one: 'When and what are you parking?', two: 'Vehicle and contact', three: 'Review and confirm' },
    total: 'Total',
    next: 'Continue',
    back: 'Back',
    confirmButton: 'Confirm booking',
    confirmedHeading: 'Booking confirmed',
    vehicleStep: {
      vehicleLegend: 'Your vehicle',
      plate: 'Licence plate',
      platePlaceholder: 'A12-K-345',
      make: 'Make and model',
      makePlaceholder: 'Volkswagen Golf 7',
      color: 'Colour',
      colorPlaceholder: 'Grey',
      passengers: 'Passengers',
      flight: 'Flight number',
      flightPlaceholder: 'JU 123',
      flightHint: 'We track flight delays and adjust the shuttle.',
      contactLegend: 'Contact details',
      fullName: 'Full name',
      fullNamePlaceholder: 'John Smith',
      email: 'E-mail',
      emailPlaceholder: 'name@example.com',
      phone: 'Phone',
      phonePlaceholder: '+387 61 000 000',
    },
    confirmStep: {
      totalToPay: 'Total to pay',
      vatIncluded: 'VAT included',
      ofWhichVat: (vat: string) => `of which VAT ${vat}`,
      paymentBefore: 'You pay ',
      paymentStrong: 'when you collect your vehicle',
      paymentAfter: ' — in cash or by card. We do not charge a deposit.',
      termsSummary: 'Summary of terms',
      show: 'Show',
      hide: 'Hide',
      terms: [
        'Free cancellation or changes up to 24 hours before arrival.',
        'Every started 24-hour period is charged as a full day.',
        "The vehicle is covered by the operator's liability insurance.",
        'Please do not leave documents or valuables in the vehicle.',
      ],
      consent:
        'I have read the terms of use and the privacy policy and I agree to my data being processed for the purpose of the booking.',
      consentError: 'Please confirm that you have read the terms.',
    },
    summary: {
      dropOff: 'Drop-off',
      pickUp: 'Pick-up',
      at: (time: string) => `at ${time}`,
      duration: 'Duration',
      parking: 'Parking',
      vehicle: 'Vehicle',
      passengers: 'Passengers',
      flight: (flight: string) => `Flight ${flight}`,
      contact: 'Contact',
      parkingPrice: 'Parking price',
    },
    success: {
      heldBefore: 'Your space is reserved. The barrier will recognise plate ',
      heldAfter: ' on arrival.',
      referenceCode: 'Reference code',
      codeAria: (code: string) => `Code: ${code}`,
      copyCode: 'Copy code',
      codeCopied: 'Code copied',
      arrival: 'Arrival',
      returning: 'Return',
      duration: 'Duration',
      payOnPickup: 'Pay on pick-up',
      addToCalendar: 'Add to calendar',
      share: 'Share',
      changesBefore: 'Changes or cancellation: at least 24h before arrival on ',
      changesOr: ' or ',
      changesAfter: '.',
      whatsappGreeting: (reference: string) => `Hello, I am writing about booking ${reference}.`,
      shareText: (reference: string, company: string, dropOff: string, pickUp: string, plate: string) =>
        `Booking ${reference} — ${company}\nDrop-off: ${dropOff}\nPick-up: ${pickUp}\nVehicle: ${plate}`,
    },
    errors: {
      network: 'Could not reach the server. Check your internet connection and try again.',
      timeout: 'The connection is too slow. Check your internet connection and try again.',
      server: 'The server cannot process the booking right now. Please try again.',
      aborted: 'Submission was cancelled.',
      unknown: 'Something went wrong. Please try again.',
    },
    ics: {
      dropOff: 'Parking — vehicle drop-off',
      pickUp: 'Parking — vehicle pick-up',
      description: (reference: string, plate: string, phone: string) =>
        `Booking ${reference} · vehicle ${plate} · ${phone}`,
      calendarName: 'Bookings',
    },
  },
};
