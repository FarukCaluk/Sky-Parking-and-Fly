# Sky Parking & Fly

Website for Sky Parking and Fly, a private, fenced and video-monitored parking lot 800 m from Sarajevo airport with a free
transfer to the terminal. Bosnian, English and German. All facts (prices, address, hours, FAQ, reviews) come from
[parkingandfly.ba](https://parkingandfly.ba); nothing on the site is invented.

## Pages

| Page        | Bosnian (default)                                          | English                                   | German                                                      |
| ----------- | ---------------------------------------------------------- | ----------------------------------------- | ----------------------------------------------------------- |
| Home        | `/`                                                        | `/en`                                     | `/de`                                                       |
| Pricing     | `/cijene`                                                  | `/en/pricing`                             | `/de/preise`                                                |
| Facility    | `/objekat`                                                 | `/en/facilities`                          | `/de/einrichtungen`                                         |
| Transfer    | `/shuttle`                                                 | `/en/shuttle`                             | `/de/shuttle`                                               |
| Reviews     | `/recenzije`                                               | `/en/reviews`                             | `/de/bewertungen`                                           |
| FAQ         | `/cesta-pitanja`                                           | `/en/faq`                                 | `/de/haeufige-fragen`                                       |
| Contact     | `/kontakt`                                                 | `/en/contact`                             | `/de/kontakt`                                               |
| Reservation | `/rezervacija`                                             | `/en/reservation`                         | `/de/reservierung`                                          |
| Legal       | `/uslovi-koristenja`, `/politika-privatnosti`, `/kolacici` | `/en/terms`, `/en/privacy`, `/en/cookies` | `/de/nutzungsbedingungen`, `/de/datenschutz`, `/de/cookies` |

Unknown URLs render a localised 404 (`noindex`). The FAQ keeps the address of the original site (`/cesta-pitanja`) and
publishes `FAQPage` structured data.

## How it works

- **Reservation without a backend.** The hero bar, the price slider and the reservation form share one stay. The form
  builds a plain-text message and the visitor sends it from their own device through WhatsApp, Viber (text is copied) or
  e-mail. Nothing is stored and no confirmation is faked.
- **Prices** are the published list: 8 KM per day for 1-10 days, 7 KM for 11-20, 6 KM for 21+, the rate of the tier
  applying to the whole stay (`src/data/pricing.ts`, `src/utils/pricing.ts`). The site calls the result an estimate.
- **Photographs** of the real lot live in `public/photos` as `<name>-<width>.avif` and `.webp` (plus a phone crop of the
  hero). `src/data/photos.ts` lists them; `Photo` renders `<picture>` with the right crop. To replace a picture, export the
  same names and widths.
- **Map** is OpenStreetMap, loaded only after a click, so the site sets no third-party requests on load.
- Dark and light themes follow the system and can be toggled; the choice is the only thing stored in the browser.

## Stack

React 19 · Vite · strict TypeScript · Tailwind CSS v4 · Framer Motion (`LazyMotion`) · Lucide icons · Vitest · ESLint ·
Prettier. Type: Barlow Condensed (the face of the sign) and Geist, self-hosted through Fontsource. No router or i18n
library: both are small typed modules in `src/router` and `src/i18n`.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview
npm run lint
npm test
```

Requires Node 22.

## Content

- Contact data, coordinates and links: `src/data/site.ts`.
- All visible text, including the FAQ and the legal pages: the three dictionaries in `src/i18n`. `bs.ts` defines the
  shape, `en.ts` and `de.ts` are typed against it, so a missing key is a compile error. A test also fails on em or en
  dashes in visible copy.
- **Check before launch:** the legal pages are short, factual summaries of what the business states on its own site.
  They are not legal advice. The street number is 38 in the visible address of the original site, while its map link
  points at number 34.

## Configuration

`SITE_URL` (build time, optional) is the public origin written into `sitemap.xml`, canonical URLs and social cards. It
defaults to the Vercel production URL; set it when you attach a custom domain.

## Deployment

Deployed on Vercel as a static Vite build. `vercel.json` rewrites every non-asset path to `index.html`, caches `/assets`
and `/photos` for a year and sets security headers.
