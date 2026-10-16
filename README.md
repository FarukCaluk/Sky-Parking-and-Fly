# Sky Parking & Fly

Website for Sky Parking and Fly, a private, fenced and video-monitored parking lot 800 m from Sarajevo airport with a free
transfer to the terminal. Bosnian, English and German. Facts (prices, address, hours, FAQ) come from
[parkingandfly.ba](https://parkingandfly.ba); the reviews are real Google Maps reviews. Nothing on the site is invented.

## Pages

| Page        | Bosnian (default)                                          | English                                   | German                                                      |
| ----------- | ---------------------------------------------------------- | ----------------------------------------- | ----------------------------------------------------------- |
| Home        | `/`                                                        | `/en`                                     | `/de`                                                       |
| Pricing     | `/cijene`                                                  | `/en/pricing`                             | `/de/preise`                                                |
| Facility    | `/objekat`                                                 | `/en/facilities`                          | `/de/einrichtungen`                                         |
| Transfer    | `/shuttle`                                                 | `/en/shuttle`                             | `/de/shuttle`                                               |
| Reviews     | `/recenzije`                                               | `/en/reviews`                             | `/de/bewertungen`                                           |
| News        | `/novosti`                                                 | `/en/news`                                | `/de/neuigkeiten`                                           |
| FAQ         | `/cesta-pitanja`                                           | `/en/faq`                                 | `/de/haeufige-fragen`                                       |
| Contact     | `/kontakt`                                                 | `/en/contact`                             | `/de/kontakt`                                               |
| Reservation | `/rezervacija`                                             | `/en/reservation`                         | `/de/reservierung`                                          |
| Legal       | `/uslovi-koristenja`, `/politika-privatnosti`, `/kolacici` | `/en/terms`, `/en/privacy`, `/en/cookies` | `/de/nutzungsbedingungen`, `/de/datenschutz`, `/de/cookies` |

Unknown URLs render a localised 404 (`noindex`). The FAQ keeps the address of the original site (`/cesta-pitanja`) and
publishes `FAQPage` structured data.

## How it works

- **Reservations.** The hero bar, the price calculator and the reservation form share one stay. **Pošalji rezervaciju**
  posts to `/api/reservation` (`api/reservation.ts`, a Vercel function). It works out the days and the price again
  from the dates, makes a reservation code (`SKY-2010-7K3Q`: day and month of arrival plus four random symbols), mails
  the reservation to us (always in Bosnian) and mails the guest a confirmation: "Reservation successful from ... to
  ...", the code, the details, the price and the rules (counting of days, delays, transfer, keys, payment). The mail is
  written in the language the guest used on the site, and the page shows the same confirmation
  (`src/utils/confirmation.ts`, texts in `confirmation` in the dictionaries). Mail goes out over SMTP, see
  _Configuration_. Without SMTP settings the function answers 503 and the form falls back to
  [FormSubmit](https://formsubmit.co), which mails only us; the guest then sees the confirmation on the page, without a
  mail. The side panel is an extra: it builds the same request as text for WhatsApp, Viber (text is copied) or e-mail,
  sent from the visitor's own device. Nothing is stored on the site, and the page says "sent" only when a mail service
  accepted the message.
- **Date and time** are custom pickers (`src/components/ui/DateField.tsx`, `TimeField.tsx`), not the browser's own:
  dates read `dd.mm.yyyy` with a Monday-first calendar, times are 24-hour. They work with the keyboard and open as a
  bottom sheet on phones.
- **Reviews** are in `src/data/reviews.ts`: ten real Google reviews, shown as a looping strip on the home page (it
  pauses on hover, on focus and with the button, and becomes a scrollable row for visitors who prefer reduced motion)
  and as cards on the Reviews page, with a link to all of them on Google Maps.
- **News** are the four latest posts of parkingandfly.ba/novosti (`src/data/news.ts` for dates, photographs and addresses, `news.items` in the dictionaries for the texts, translated). Each post is a page of its own at the address of the original (`/transfer-do-aerodroma-korak-po-korak`), with `BlogPosting` data, and the sitemap lists them. Adding a post means one entry in `news.ts` and its text in the three dictionaries.
- **Prices** (`src/data/pricing.ts`, `src/utils/pricing.ts`): 9 KM per day for 2-4 days, 8 KM for 5-10, 7 KM for 11-20,
  6 KM for 21-30, the rate of the band applying to the whole stay; after 30 days 180 KM plus 5 KM for every further day.
  The minimum stay is 2 days, so shorter stays cannot be reserved online. A day is every started 24-hour period from the
  exact time of arrival. The examples on the price page are calculated by the same function, and a test holds them to
  the client's table (2 days = 18 KM ... 31 days = 185 KM).
- **Photographs** of the real lot live in `public/photos` as `<name>-<width>.avif` and `.webp` (plus a phone crop of the
  hero). `src/data/photos.ts` lists them; `Photo` renders `<picture>` with the right crop. To replace a picture, export the
  same names and widths.
- **Map** is OpenStreetMap, loaded only after a click, so the site sets no third-party requests on load.
- Dark and light themes follow the system and can be toggled; the choice is the only thing stored in the browser.

## Stack

React 19 · Vite · strict TypeScript · Tailwind CSS v4 · Framer Motion (`LazyMotion`) · Lucide icons · Vitest · ESLint ·
Prettier. Type: Barlow Condensed (the face of the sign) for headings and labels, cut down and embedded in the
stylesheet; the phone's own font for everything else. No router or i18n library: both are small typed modules in
`src/router` and `src/i18n`.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/ (every page prerendered, see below)
npm run preview    # http://localhost:4173, serves dist/ the way the host does
npm run lint
npm test
```

Requires Node 22.18 or newer (the build runs a TypeScript file directly).

## Speed

The aim is a first screen that is painted from the very first response, on a phone on a slow network.

- **Every page is prerendered.** `npm run build` builds the browser bundle, builds the same pages for the server
  (`src/entry-server.tsx`) and `scripts/prerender.mjs` writes one finished HTML file per address and language
  (`dist/cijene.html`, `dist/en/pricing.html`, ...), with the right title, description, canonical and `hreflang`
  tags, plus `404.html`. React then attaches to that markup (`hydrateRoot` in `src/main.tsx`) instead of drawing it
  again. Anything that depends on the clock or the window renders the same on both sides first and catches up after
  (`useNow`, `useScrolled`, `src/router/navigation.ts`).
- **Nothing but the page competes for the connection while it is painted.** The stylesheet is inlined into every
  file, the photograph of the first screen is preloaded, and the scripts are not in the `<head>`: a few lines at the
  end of the body fetch them (all at once, with the code of the page itself) right after the first paint.
- **No font to wait for.** Barlow Condensed (700 and 800, `src/assets/fonts`, SIL OFL) is cut down to the characters
  the pages use by `scripts/subset-fonts.py` and embedded in the stylesheet; the first paint waits for the few
  milliseconds it takes to decode it (see `index.html`), so text is never redrawn in another face. Body text uses the
  system font.
- The home page is the only one that keeps its code in the main bundle; every other page is its own chunk, fetched
  with the main script and rendered without a loading state.

The `build` fails if a page would contain parts that React sends out of order, or if `index.html` no longer has
what the prerenderer replaces. Because the dates in the reservation bar start from "now", rebuild now and then (or
let a Vercel deploy hook do it daily) so the prerendered default dates are not stale; the browser corrects them as
soon as the page is live either way.

## Content

- Contact data, coordinates and links: `src/data/site.ts`.
- All visible text, including the FAQ and the legal pages: the three dictionaries in `src/i18n`. `bs.ts` defines the
  shape, `en.ts` and `de.ts` are typed against it, so a missing key is a compile error. A test also fails on em or en
  dashes in visible copy.
- **Check before launch:** the legal pages are short, factual summaries of what the business states on its own site.
  They are not legal advice. The street number is 38 in the visible address of the original site, while its map link
  points at number 34.

## Configuration

Copy `.env.example` to `.env.local` to try things locally; on Vercel set the same names under Settings > Environment
Variables.

**Reservation mail** (read by `api/reservation.ts`): `SMTP_HOST`, `SMTP_PORT` (465 or 587), `SMTP_USER` and `SMTP_PASS` are
the mailbox that sends, for example the mailbox of `info@parkingandfly.ba` from the hosting provider (a Gmail address
with an app password works for testing). `SMTP_FROM` is the sender shown to the guest (defaults to `SMTP_USER`),
`RESERVATION_EMAIL` is where our copy goes. It defaults to a **test address** (`src/data/inbox.ts`), so set it to the
business address when going live. `MAIL_DRY_RUN=1` writes both mails to `.mail-preview/` instead of sending them, which
is the way to look at them without a mailbox. The function only accepts posts from the site's own pages, limits requests
per address, and checks the reservation again before sending anything.

`VITE_RESERVATION_EMAIL` (build time, optional) is the inbox of the fallback form service. FormSubmit asks the inbox
owner to confirm once: after the first reservation it sends an activation mail, and nothing is delivered until its
link is clicked (check the spam folder).

`SITE_URL` (build time, optional) is the public origin written into `sitemap.xml`, canonical URLs and social cards. It
defaults to the Vercel production URL; set it when you attach a custom domain.

## Deployment

Deployed on Vercel: `dist/` as static files plus the `api/` function. `vercel.json` turns on clean URLs (`/cijene`
serves `cijene.html`, unknown addresses get `404.html`), caches `/assets` and `/photos` for a year and sets security
headers.
