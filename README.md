# Sky Parking & Fly

Airport parking and shuttle-transfer website for Sarajevo, built with an Apple-style design language:
glass surfaces, spring-physics motion, dark mode and a mobile-first layout that scales from 320 px phones
to 4K displays. Every section is its own page, and the whole site is available in **Bosnian, English and German**.

**Live site:** https://sky-parking-and-fly.vercel.app

## Pages

| Page       | Bosnian (default)       | English          | German                    |
| ---------- | ----------------------- | ---------------- | ------------------------- |
| Home       | `/`                     | `/en`            | `/de`                     |
| Pricing    | `/cijene`               | `/en/pricing`    | `/de/preise`              |
| Facilities | `/objekat`              | `/en/facilities` | `/de/einrichtungen`       |
| Shuttle    | `/shuttle`              | `/en/shuttle`    | `/de/shuttle`             |
| Reviews    | `/recenzije`            | `/en/reviews`    | `/de/bewertungen`         |
| Contact    | `/kontakt`              | `/en/contact`    | `/de/kontakt`             |
| Terms      | `/uslovi-koristenja`    | `/en/terms`      | `/de/nutzungsbedingungen` |
| Privacy    | `/politika-privatnosti` | `/en/privacy`    | `/de/datenschutz`         |
| Cookies    | `/kolacici`             | `/en/cookies`    | `/de/cookies`             |

Unknown URLs render a localised 404 page (`noindex`).

## Highlights

- **Hero booking widget** — dates (custom range calendar), vehicle type, extras and an instant price estimate.
- **Interactive pricing calculator** — days slider, covered / open toggle, duration tiers, extras; a live,
  itemised summary. Hero, calculator and booking wizard share one state, so they never disagree — and the state
  survives navigation between pages.
- **Three-step booking wizard** — details → vehicle & contact → instant confirmation, with inline validation
  (ring states), a printable-style ticket, `.ics` calendar export and a pluggable submission gateway.
- **Live facilities** — camera viewer (NextFrame-ready), occupancy rings, ANPR barrier cycle, shuttle map and a
  live departure board that computes the next departures from the real clock.
- **Trust** — Google rating badge, animated statistics, verified-traveller reviews.
- **Contact hub** — WhatsApp / Viber / phone / e-mail with a pre-filled message from the chosen dates, opening
  hours, an interactive location map and legal notices.

## Tech stack

React 19 · Vite · strict TypeScript · Tailwind CSS v4 · Framer Motion (`LazyMotion`, `m` components) ·
Lucide icons · Vitest · ESLint (flat config, React Compiler rules) · Prettier. No router or i18n library — both
are small, typed modules in this repo.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
npm run lint
npm test
```

Requires Node 20.19+ or 22.12+.

## Routing

`src/router` is a small (under 300 lines) History-API router:

- Real URLs, one lazy-loaded chunk per page (the home page is bundled eagerly); links are plain `<a href>`
  elements whose clicks are intercepted, so open-in-new-tab, copy-link and crawlers all work.
- Hover / focus / idle prefetching of page chunks, manual scroll restoration (language switches keep your scroll
  position) and focus moved to `<main>` after navigation, announced through a polite live region.
- The route table (`src/router/routes.ts`) is plain data: ids, per-language slugs, `pathFor`, `matchPath` and
  `switchLangPath`. The Vite config reuses it to generate `sitemap.xml` (with `hreflang` alternates) and
  `robots.txt` at build time, so a new page appears in the sitemap automatically.
- `vercel.json` rewrites every non-asset path to `index.html`, so deep links and refreshes work on Vercel.

## Internationalisation

- `src/i18n/bs.ts` is the source of truth and defines the dictionary shape; `en.ts` and `de.ts` are typed as
  `Messages`, so a missing or extra key is a **compile error**.
- Plurals, dates, durations and prices are produced by dictionary functions and `useFormat()` — English uses
  `12.50 KM`, Bosnian and German `12,50 KM`. Validation and booking errors travel as codes and are translated in
  the UI.
- Each page sets its own `<title>`, description, Open Graph tags, canonical URL and `hreflang` alternates
  (`usePageMeta`), and `<html lang>` is set before first paint from the URL.
- The language switcher lives in the header and footer. It links to the _same page_ in the other language.

**Add a language:** add the code to `LANGS` and a slug per route in `routes.ts`, create `xx.ts` typed as
`Messages` (the compiler lists everything that is missing, including the weekday and month vocabulary used by the
calendar) and register it in `src/i18n/messages.ts`.

## Brand

The logo (`public/logo.svg`, `src/components/layout/Logo.tsx`) is outlined to SVG paths, so it renders identically
without web fonts. `LogoMark` (the script "Sky" on the teal tile) is used for the favicon and header, `LogoFull`
in the footer. To swap in the original artwork, replace `public/logo.svg` / `public/favicon.svg` and the paths in
`src/components/layout/logoPaths.ts`.

## Project structure

```
src/
  pages/         Home, Pricing, Facilities, Shuttle, Reviews, Contact, Legal, NotFound + PageShell
  router/        routes (data), navigation, Link, prefetch
  i18n/          bs / en / de dictionaries, provider, formatting helpers, template filler
  components/
    ui/          Button, Card, GlassContainer, Input, Select, Modal, Toggle, SegmentedControl,
                 Checkbox, DateRangePicker, Stepper, Reveal, Skeleton …
    layout/      Navbar, Footer, Logo, PageHeader, LanguageSwitcher, LanguageLinks, RouteAnnouncer
    sections/    Hero, BookingWidget, HowItWorks, HomeTeasers, PricingCalculator, Facilities,
                 Testimonials, Contact, LocationMap
    booking/     StayForm, VehiclePicker, ExtrasChips, BookingModal (wizard) and its steps
    facilities/  CameraPanel, FeedScene, OccupancyCard, BarrierCard, ShuttlePanel
  context/       BookingProvider — single source of truth for the stay draft, quote and dialog state
  hooks/         useBookingWizard, useCameraFeed, useLiveOccupancy, usePageMeta, useTheme, useFocusTrap, …
  services/      bookingGateway — HTTP or local submission
  utils/         pricing engine, date maths, validation, formatting, ICS export, shuttle schedule
  data/          pricing tables, site details, facilities
  types/         shared domain types
```

## Configuration

Copy `.env.example` to `.env.local`. Every variable is optional.

| Variable                     | Purpose                                                                                                                                                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `VITE_BOOKING_ENDPOINT`      | When set, reservations are `POST`ed as JSON to this URL. Expected response: `200 { "reference": "SPF-XXXXXX" }`. When empty, reservations are stored in the visitor's browser (demo mode).             |
| `VITE_NEXTFRAME_URL`         | Snapshot URL template for live cameras, e.g. `https://cams.example.com/frames/{camera}/latest.jpg` (`{camera}` ∈ `entrance`, `covered-a`, `open-b`, `shuttle`). When empty, a simulated feed is shown. |
| `VITE_NEXTFRAME_INTERVAL_MS` | Frame interval for the NextFrame loop (default `1500`, minimum `250`).                                                                                                                                 |
| `SITE_URL` (build time)      | Public origin written into `sitemap.xml`, canonical URLs and `robots.txt`. Defaults to the Vercel production URL; set it when you attach a custom domain.                                              |

### NextFrame camera integration

`src/hooks/useCameraFeed.ts` runs a next-frame loop: it fetches the next frame into an off-screen `Image`, swaps it
in only once decoded (no flicker), pauses while the tab is hidden, backs off exponentially on errors and marks the
feed offline after three consecutive failures. Swap the transport (WebSocket, MJPEG, HLS) by implementing the same
`CameraFeedState` shape.

### Business data

Contact details, address, coordinates, opening hours and company identifiers live in `src/data/site.ts`; prices,
tiers, vehicle multipliers and extras in `src/data/pricing.ts`; all visible text — including the legal pages — in
the three dictionaries in `src/i18n`. **The values shipped here are sample data** — phone numbers, e-mail, company
IDs, reviews, ratings, statistics and the legal texts must be replaced with the operator's real details (and
reviewed by a lawyer) before launch.

## Pricing model

Daily rate = tier rate (cover type) × vehicle multiplier, rounded to the nearest 0.50 KM. Every started 24 h block
counts as a day; day counting uses calendar arithmetic so a DST change never adds a phantom day. Prices include
17 % VAT. See `src/utils/pricing.ts` and its tests.

## Quality

- Lighthouse (production build, mobile, throttled; home, pricing and facilities in three languages sampled):
  Performance 93–96 · Accessibility 100 · Best Practices 100 · SEO 100 · CLS 0.
- axe-core: no violations on all 27 routes (9 pages × 3 languages) in light mode at desktop width and dark mode at
  390 px, and no horizontal overflow on any route down to 320 px.
- 98 unit tests cover pricing, billing days, DST boundaries, validation, ICS output, the shuttle schedule, the
  route table and the dictionaries (identical shape, no empty strings, matching placeholders, date vocabularies).
- Respects `prefers-reduced-motion`; keyboard-operable dialogs, calendar, radio groups and tabs.

## Deployment

Deployed on Vercel as the `sky-parking-and-fly` project — https://sky-parking-and-fly.vercel.app. The repo includes a
`vercel.json` (static Vite build, SPA rewrites, immutable asset caching, security headers) and pins Node 22 via
`engines`. To deploy elsewhere, import the repository in Vercel or run `npx vercel --prod`.
