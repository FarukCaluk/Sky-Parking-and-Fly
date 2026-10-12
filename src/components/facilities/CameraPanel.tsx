import { LoaderCircle, RefreshCw, VideoOff } from 'lucide-react';
import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { CAMERAS } from '@/data/facilities';
import { useCameraFeed } from '@/hooks/useCameraFeed';
import { useNow } from '@/hooks/useNow';
import type { CameraStream } from '@/types';
import { cn } from '@/utils/cn';
import { FeedScene } from './FeedScene';

const pad = (n: number): string => String(n).padStart(2, '0');

function formatStamp(d: Date): string {
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function Corner({ className }: { className: string }) {
  return <span aria-hidden="true" className={cn('absolute size-5 border-white/70', className)} />;
}

interface ViewportProps {
  camera: CameraStream;
  index: number;
  onRetry: () => void;
}

/** One camera connection. Mounted with a key so switching cameras restarts from "connecting". */
function CameraViewport({ camera, index, onRetry }: ViewportProps) {
  const { status, frameSrc, latencyMs, mode } = useCameraFeed(camera);
  const now = useNow(1000);

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-black ring-1 ring-white/10 sm:aspect-video lg:aspect-auto lg:h-full lg:min-h-[20rem]">
      {mode === 'nextframe' && frameSrc ? (
        <img
          src={frameSrc}
          alt={`Kamera: ${camera.label}`}
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
      ) : (
        status !== 'connecting' && mode === 'simulated' && <FeedScene camera={camera.id} />
      )}

      {/* Sensor look: scanline, grain, vignette */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-6 animate-scan bg-gradient-to-b from-transparent via-white/[0.07] to-transparent" />
        <div className="grain absolute inset-0 opacity-[0.12] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgb(0_0_0/0.6)_100%)]" />
        <Corner className="left-3 top-3 border-l-2 border-t-2" />
        <Corner className="right-3 top-3 border-r-2 border-t-2" />
        <Corner className="bottom-3 left-3 border-b-2 border-l-2" />
        <Corner className="bottom-3 right-3 border-b-2 border-r-2" />
      </div>

      {/* HUD */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 font-mono text-[0.6875rem] uppercase tracking-wider text-white/85 sm:p-5 sm:text-xs">
        <p className="flex items-center gap-2">
          <span
            className={cn(
              'size-2 rounded-full',
              status === 'live' ? 'animate-blink bg-red-500' : status === 'offline' ? 'bg-zinc-500' : 'bg-amber-400',
            )}
          />
          {status === 'live' ? 'REC' : status === 'offline' ? 'OFFLINE' : 'LINK'}
          <span className="text-white/55">CAM {pad(index + 1)}</span>
        </p>
        <time className="tabular text-white/70" dateTime={now.toISOString()}>
          {formatStamp(now)}
        </time>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 font-mono text-[0.6875rem] uppercase tracking-wider text-white/70 sm:p-5 sm:text-xs">
        <p className="min-w-0 truncate">{camera.zone}</p>
        <p className="shrink-0 tabular">
          {mode === 'nextframe' ? 'NextFrame' : 'Demo'}
          {latencyMs !== null && status === 'live' && ` · ${latencyMs} ms`}
        </p>
      </div>

      {status === 'connecting' && (
        <div
          role="status"
          className="absolute inset-0 grid place-items-center bg-zinc-950/70 text-white/80 backdrop-blur-sm"
        >
          <p className="flex items-center gap-2.5 text-sm font-medium">
            <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
            Povezivanje s kamerom…
          </p>
        </div>
      )}

      {status === 'offline' && (
        <div
          role="alert"
          className="absolute inset-0 grid place-items-center bg-zinc-950/85 p-6 text-center text-white"
        >
          <div>
            <VideoOff className="mx-auto size-8 text-white/60" aria-hidden="true" />
            <p className="mt-3 text-sm font-semibold">Kamera trenutno nije dostupna</p>
            <button
              type="button"
              onClick={onRetry}
              className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-semibold transition-colors hover:bg-white/20"
            >
              <RefreshCw className="size-4" aria-hidden="true" />
              Pokušaj ponovo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function CameraPanel() {
  const [activeId, setActiveId] = useState(CAMERAS[0]?.id ?? 'entrance');
  const [attempt, setAttempt] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndex = Math.max(
    0,
    CAMERAS.findIndex((c) => c.id === activeId),
  );
  const camera = CAMERAS[activeIndex] ?? CAMERAS[0];
  if (!camera) return null;

  const select = (index: number) => {
    const i = (index + CAMERAS.length) % CAMERAS.length;
    const next = CAMERAS[i];
    if (!next) return;
    setActiveId(next.id);
    tabRefs.current[i]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      select(activeIndex + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      select(activeIndex - 1);
    }
  };

  return (
    <section
      aria-label="Video nadzor uživo"
      className="flex h-full flex-col rounded-[2rem] border border-white/10 bg-zinc-950 p-3 text-white shadow-[0_30px_70px_-30px_rgb(0_0_0/0.7)] sm:p-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 px-2 pb-3 pt-1 sm:px-3">
        <h3 className="text-lg font-bold tracking-[-0.02em]">Video nadzor uživo</h3>
        <div
          role="tablist"
          aria-label="Kamere"
          onKeyDown={onKeyDown}
          className="no-scrollbar -mx-1 flex max-w-full gap-1 overflow-x-auto rounded-full bg-white/[0.07] p-1"
        >
          {CAMERAS.map((cam, i) => {
            const selected = cam.id === camera.id;
            return (
              <button
                key={cam.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`${baseId}-tab-${cam.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(cam.id)}
                className={cn(
                  'min-h-9 shrink-0 rounded-full px-3.5 text-[0.8125rem] font-semibold transition-[background-color,color] duration-300',
                  selected ? 'bg-white text-zinc-900' : 'text-white/65 hover:text-white',
                )}
              >
                {cam.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${camera.id}`}
        className="min-h-0 flex-1"
      >
        <CameraViewport
          key={`${camera.id}-${attempt}`}
          camera={camera}
          index={activeIndex}
          onRetry={() => setAttempt((n) => n + 1)}
        />
      </div>

      <p className="px-2 pb-1 pt-3 text-xs leading-relaxed text-white/65 sm:px-3">
        Prikaz je demonstracija. Kamere se povezuju putem NextFrame sučelja, a snimci se arhiviraju 30 dana.
      </p>
    </section>
  );
}
