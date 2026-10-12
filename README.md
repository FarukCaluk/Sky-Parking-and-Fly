# Sky Parking & Fly

Airport parking and shuttle-transfer website for Sarajevo, rebuilt with an Apple-style design language:
glass surfaces, spring-physics motion, dark mode and a mobile-first layout that scales from 320 px phones
to 4K displays. All copy is in Bosnian.

**Live site:** https://sky-parking-and-fly.vercel.app

## Highlights

- **Hero booking widget** — dates (custom range calendar), vehicle type, extras and an instant price estimate.
- **Interactive pricing calculator** — days slider, covered / open toggle, duration tiers, extras; a live,
  itemised summary. Hero, calculator and booking wizard share one state, so they never disagree.
- **Three-step booking wizard** — details → vehicle & contact → instant confirmation, with inline validation
  (ring states), a printable-style ticket, `.ics` calendar export and a pluggable submission gateway.
- **Live facilities** — camera viewer (NextFrame-ready), occupancy rings, ANPR barrier cycle, shuttle map and a
  live departure board that computes the next departures from the real clock.
- **Trust** — Google rating badge, animated statistics, verified-traveller reviews.
- **Contact hub** — WhatsApp / Viber / phone / e-mail with a pre-filled message from the chosen dates, opening
  hours, an interactive location map and legal notices.

## Tech stack

React 19 · Vite · strict TypeScript · Tailwind CSS v4 · Framer Motion (`LazyMotion`, `m` components) ·
Lucide icons · Vitest · ESLint (flat config, React Compiler rules) · Prettier.

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

## Project structure

```
src/
  components/
    ui/          Button, Card, GlassContainer, Input, Select, Modal, Toggle, SegmentedControl,
                 Checkbox, DateRangePicker, Stepper, Reveal, Skeleton …
    layout/      Navbar, Footer, Logo, LegalModal, LazySection
    sections/    Hero, BookingWidget, HowItWorks, PricingCalculator, Facilities, Testimonials, Contact
    booking/     StayForm, VehiclePicker, ExtrasChips, BookingModal (wizard) and its steps
    facilities/  CameraPanel, FeedScene, OccupancyCard, BarrierCard, ShuttlePanel
  context/       BookingProvider — single source of truth for the stay draft, quote and dialog state
  hooks/         useBookingWizard, useCameraFeed, useLiveOccupancy, useTheme, useFocusTrap, …
  services/      bookingGateway — HTTP or local submission
  utils/         pricing engine, date maths, validation, formatting, ICS export, shuttle schedule
  data/          pricing tables, site details, Bosnian copy, facilities, legal texts
  types/         shared domain types
```

## Configuration

Copy `.env.example` to `.env.local`. Every variable is optional.

| Variable                     | Purpose                                                                                                                                                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `VITE_BOOKING_ENDPOINT`      | When set, reservations are `POST`ed as JSON to this URL. Expected response: `200 { "reference": "SPF-XXXXXX" }`. When empty, reservations are stored in the visitor's browser (demo mode).             |
| `VITE_NEXTFRAME_URL`         | Snapshot URL template for live cameras, e.g. `https://cams.example.com/frames/{camera}/latest.jpg` (`{camera}` ∈ `entrance`, `covered-a`, `open-b`, `shuttle`). When empty, a simulated feed is shown. |
| `VITE_NEXTFRAME_INTERVAL_MS` | Frame interval for the NextFrame loop (default `1500`, minimum `250`).                                                                                                                                 |

### NextFrame camera integration

`src/hooks/useCameraFeed.ts` runs a next-frame loop: it fetches the next frame into an off-screen `Image`, swaps it
in only once decoded (no flicker), pauses while the tab is hidden, backs off exponentially on errors and marks the
feed offline after three consecutive failures. Swap the transport (WebSocket, MJPEG, HLS) by implementing the same
`CameraFeedState` shape.

### Business data

Contact details, address, coordinates, opening hours and company identifiers live in `src/data/site.ts`; prices,
tiers, vehicle multipliers and extras in `src/data/pricing.ts`. **The values shipped here are sample data** —
phone numbers, e-mail, company IDs, reviews, ratings and statistics must be replaced with the operator's real
details before launch.

## Pricing model

Daily rate = tier rate (cover type) × vehicle multiplier, rounded to the nearest 0.50 KM. Every started 24 h block
counts as a day; day counting uses calendar arithmetic so a DST change never adds a phantom day. Prices include
17 % VAT. See `src/utils/pricing.ts` and its tests.

## Quality

- Lighthouse (production build, mobile, throttled): Performance 93 · Accessibility 100 · Best Practices 100 ·
  SEO 100 · CLS 0. Desktop performance 100.
- axe-core: no violations in light or dark theme, including the open booking dialog.
- Unit tests cover pricing, billing days, DST boundaries, validation, ICS output and the shuttle schedule.
- Respects `prefers-reduced-motion`; keyboard-operable dialogs, calendar, radio groups and tabs.

## Deployment

Deployed on Vercel as the `sky-parking-and-fly` project — https://sky-parking-and-fly.vercel.app. The repo includes a
`vercel.json` (static Vite build, immutable asset caching, security headers) and pins Node 22 via `engines`.
To deploy elsewhere, import the repository in Vercel or run `npx vercel --prod`.
