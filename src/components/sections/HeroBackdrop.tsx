import { Plane } from 'lucide-react';
import { useScroll, useTransform, m } from 'framer-motion';
import { useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

const VIEW_W = 1600;
const VIEW_H = 900;
const VANISH = { x: 800, y: 470 };
const SVG_PROPS = {
  viewBox: `0 0 ${VIEW_W} ${VIEW_H}`,
  preserveAspectRatio: 'xMidYMid slice',
  focusable: false,
} as const;

/** Deterministic pseudo-random so the star field is identical on every render. */
function seeded(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const STARS = (() => {
  const rand = seeded(42);
  return Array.from({ length: 70 }, () => ({
    x: rand() * VIEW_W,
    y: rand() * VIEW_H * 0.55,
    r: 0.5 + rand() * 1.1,
    o: 0.25 + rand() * 0.6,
  }));
})();

const PHASES = 4;

/** Approach-light pairs receding towards the vanishing point, grouped into chase phases. */
const RUNWAY_LIGHTS = (() => {
  const lights: { x: number; y: number; r: number; phase: number }[] = [];
  const count = 16;
  for (let i = 0; i < count; i += 1) {
    const t = Math.pow(i / (count - 1), 1.75);
    const y = VANISH.y + (VIEW_H + 20 - VANISH.y) * t;
    const spread = 18 + 700 * t;
    const r = 1.2 + 5.2 * t;
    const phase = (count - 1 - i) % PHASES;
    lights.push({ x: VANISH.x - spread, y, r, phase }, { x: VANISH.x + spread, y, r, phase });
  }
  return lights;
})();

const CENTER_DASHES = Array.from({ length: 9 }, (_, i) => {
  const t0 = Math.pow(i / 9, 1.9);
  const t1 = Math.pow((i + 0.55) / 9, 1.9);
  const y0 = VANISH.y + (VIEW_H - VANISH.y) * t0;
  const y1 = VANISH.y + (VIEW_H - VANISH.y) * t1;
  return { y0, y1, w: 1 + 7 * t0 };
});

/**
 * Immersive night-runway scene built from gradients and SVG — no image downloads.
 *
 * Built to stay cheap on low-end GPUs: the static scene is rasterised once, blobs are radial
 * gradients (no blur filters), the runway chase animates the *opacity of four layers* (compositor
 * only) instead of dozens of SVG nodes, and there are no blend modes or per-element filters.
 */
export function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const sceneY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '14%']);
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '30%']);

  return (
    <div ref={ref} aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden bg-[#02040a] [contain:paint]">
      {/* Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_-10%,#10265a_0%,#07102a_42%,#02040a_100%)]" />

      <m.div style={{ y: glowY }} className="absolute inset-0">
        <div className="absolute -left-[12%] top-[2%] size-[min(70vw,64rem)] animate-drift-a max-sm:animate-none bg-[radial-gradient(closest-side,rgb(0_113_227/0.42),transparent)] will-change-transform" />
        <div className="absolute -right-[14%] top-[10%] size-[min(64vw,58rem)] animate-drift-b max-sm:animate-none bg-[radial-gradient(closest-side,rgb(79_70_229/0.38),transparent)] will-change-transform" />
        <div className="absolute bottom-[-22%] left-[24%] size-[min(56vw,50rem)] animate-drift-a max-sm:animate-none bg-[radial-gradient(closest-side,rgb(6_182_212/0.26),transparent)] will-change-transform" />
      </m.div>

      <m.div style={{ y: sceneY }} className="absolute inset-0">
        {/* Static scene: stars, horizon glow, runway edges and centre line */}
        <svg className="absolute inset-0 size-full" {...SVG_PROPS}>
          <defs>
            <linearGradient id="runway-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7ab8ff" stopOpacity="0" />
              <stop offset="1" stopColor="#7ab8ff" stopOpacity="0.3" />
            </linearGradient>
            <radialGradient id="horizon" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#4da3ff" stopOpacity="0.55" />
              <stop offset="1" stopColor="#4da3ff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {STARS.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={s.o} />
          ))}

          <ellipse cx={VANISH.x} cy={VANISH.y} rx="520" ry="60" fill="url(#horizon)" />
          <path
            d={`M ${VANISH.x - 18} ${VANISH.y} L -120 ${VIEW_H + 40} M ${VANISH.x + 18} ${VANISH.y} L ${VIEW_W + 120} ${VIEW_H + 40}`}
            stroke="url(#runway-fade)"
            strokeWidth="1.4"
            fill="none"
          />
          {CENTER_DASHES.map((d, i) => (
            <line
              key={i}
              x1={VANISH.x}
              x2={VANISH.x}
              y1={d.y0}
              y2={d.y1}
              stroke="#cfe4ff"
              strokeOpacity="0.38"
              strokeWidth={d.w}
              strokeLinecap="round"
            />
          ))}
        </svg>

        {/* Runway lights — four layers whose opacity chases towards the horizon */}
        {Array.from({ length: PHASES }, (_, phase) => (
          <svg
            key={phase}
            className="absolute inset-0 size-full animate-runway will-change-[opacity]"
            style={{ animationDelay: `${phase * 0.3}s` }}
            {...SVG_PROPS}
          >
            {RUNWAY_LIGHTS.filter((l) => l.phase === phase).map((l, i) => (
              <g key={i}>
                <circle cx={l.x} cy={l.y} r={l.r * 3} fill="#7ab8ff" opacity="0.16" />
                <circle cx={l.x} cy={l.y} r={l.r} fill="#d6ebff" />
              </g>
            ))}
          </svg>
        ))}

        {/* Aircraft with contrail crossing the sky */}
        <div className="absolute left-0 top-[8%] h-0 w-0 animate-plane-pass will-change-transform">
          <div className="relative -rotate-[24deg]">
            <span className="absolute right-full top-1/2 h-px w-[36vw] max-w-[40rem] -translate-y-1/2 bg-gradient-to-l from-white/45 via-white/10 to-transparent" />
            <Plane
              className="relative size-9 text-white/85 sm:size-12"
              strokeWidth={1.6}
              fill="currentColor"
              fillOpacity={0.2}
            />
          </div>
        </div>
      </m.div>

      {/* Film grain, vignette and fade into the page (plain alpha — no blend modes) */}
      <div className="grain absolute inset-0 opacity-[0.045]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_35%,rgb(0_0_0/0.55)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-canvas" />
    </div>
  );
}
