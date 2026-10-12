import { ExternalLink, MapPin, Navigation, Plane } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { MAPS_LINKS, SITE } from '@/data/site';
import { cn } from '@/utils/cn';

type PinId = 'parking' | 'terminal';

const PINS: Record<PinId, { x: number; y: number; title: string; lines: string[]; icon: typeof MapPin }> = {
  parking: {
    x: 128,
    y: 214,
    title: SITE.name,
    lines: [SITE.address.street, SITE.address.city],
    icon: MapPin,
  },
  terminal: {
    x: 396,
    y: 92,
    title: 'Terminal aerodroma Sarajevo',
    lines: [`${SITE.terminalDistance} od parkinga`, `Shuttle ${SITE.shuttleMinutes} min, besplatno`],
    icon: Plane,
  },
};

const ROUTE = 'M128 214 C 190 214, 214 140, 270 132 S 360 100, 396 92';

/** Interactive, dependency-free map preview. Pins are keyboard-focusable and reveal their details below. */
export function LocationMap() {
  const [selected, setSelected] = useState<PinId>('parking');
  const pin = PINS[selected];

  const pinHandlers = (id: PinId) => ({
    onClick: () => setSelected(id),
    onKeyDown: (event: KeyboardEvent<SVGGElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setSelected(id);
      }
    },
  });

  return (
    <div className="flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-surface-2 sm:aspect-[16/10] lg:aspect-auto lg:min-h-[18rem] lg:flex-1">
        <svg
          viewBox="0 0 520 340"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 size-full"
          role="group"
          aria-label="Karta lokacije"
        >
          <path
            d="M-10 290 C 90 262, 140 322, 250 310 S 440 280, 530 316 L 530 350 L -10 350 Z"
            className="fill-emerald-500/10"
          />
          <path d="M330 -10 C 350 54, 420 44, 450 78 S 510 46, 530 68 L 530 -10 Z" className="fill-sky-500/10" />
          <rect x="60" y="160" width="46" height="30" rx="6" className="fill-ink/[0.04]" />
          <rect x="190" y="210" width="60" height="36" rx="6" className="fill-ink/[0.04]" />
          <rect x="300" y="190" width="70" height="40" rx="6" className="fill-ink/[0.04]" />
          <rect x="420" y="150" width="56" height="44" rx="6" className="fill-ink/[0.04]" />

          <g fill="none" strokeLinecap="round" style={{ stroke: 'var(--line-strong)' }}>
            <path d="M-10 200 C 90 188, 150 214, 250 194 S 430 170, 530 178" strokeWidth="11" />
            <path d="M160 -10 C 170 90, 140 180, 162 350" strokeWidth="8" />
            <path d="M350 -10 C 360 100, 340 220, 372 350" strokeWidth="8" />
            <path d="M-10 100 C 110 110, 240 76, 324 104" strokeWidth="6" />
          </g>

          <path d={ROUTE} fill="none" strokeWidth="12" strokeLinecap="round" className="stroke-brand-600/20" />
          <path
            d={ROUTE}
            fill="none"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="1 9"
            className="stroke-brand-600"
          />

          {(Object.keys(PINS) as PinId[]).map((id) => {
            const p = PINS[id];
            const active = id === selected;
            const Icon = p.icon;
            return (
              <g
                key={id}
                transform={`translate(${p.x} ${p.y})`}
                role="button"
                tabIndex={0}
                aria-label={p.title}
                aria-pressed={active}
                className="cursor-pointer outline-none [&:focus-visible>circle:last-of-type]:stroke-brand-500 [&:focus-visible>circle:last-of-type]:stroke-[3]"
                {...pinHandlers(id)}
              >
                {active && <circle r="30" className="animate-pulse-ring fill-brand-600/30" />}
                <circle r="26" className="fill-transparent" />
                <circle
                  r="17"
                  className={cn('transition-colors duration-300', id === 'parking' ? 'fill-brand-600' : 'fill-ink')}
                />
                <foreignObject x="-9" y="-9" width="18" height="18" className="pointer-events-none">
                  <div className="grid size-[18px] place-items-center">
                    <Icon
                      className={cn('size-[18px]', id === 'parking' ? 'text-white' : 'text-canvas')}
                      strokeWidth={2.2}
                      aria-hidden="true"
                    />
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 rounded-2xl bg-ink/[0.045] p-4" aria-live="polite">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <Navigation className="size-4 text-accent" aria-hidden="true" />
          {pin.title}
        </p>
        {pin.lines.map((line) => (
          <p key={line} className="mt-0.5 pl-6 text-sm text-ink-muted">
            {line}
          </p>
        ))}
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <Button
          variant="secondary"
          href={MAPS_LINKS.google}
          target="_blank"
          rel="noopener noreferrer"
          rightIcon={<ExternalLink className="size-4" aria-hidden="true" />}
        >
          Google Maps
        </Button>
        <Button
          variant="secondary"
          href={MAPS_LINKS.apple}
          target="_blank"
          rel="noopener noreferrer"
          rightIcon={<ExternalLink className="size-4" aria-hidden="true" />}
        >
          Apple Maps
        </Button>
      </div>
    </div>
  );
}
