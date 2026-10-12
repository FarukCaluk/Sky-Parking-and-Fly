import { useEffect, useState } from 'react';
import type { CameraStream, FeedStatus } from '@/types';

export interface CameraFeedState {
  status: FeedStatus;
  /** Latest decoded frame URL when running against a NextFrame endpoint, otherwise `null`. */
  frameSrc: string | null;
  /** Round-trip time of the last frame in ms (simulated feeds report a nominal value). */
  latencyMs: number | null;
  /** `nextframe` when a snapshot endpoint is configured, otherwise `simulated`. */
  mode: CameraStream['source'];
}

const DEFAULT_INTERVAL_MS = 1500;
const MAX_BACKOFF_MS = 10_000;
const OFFLINE_AFTER_FAILURES = 3;

/** Resolve the configured NextFrame URL template for a camera, or `null` when not configured. */
export function nextFrameUrl(cameraId: string): string | null {
  const template = import.meta.env.VITE_NEXTFRAME_URL?.trim();
  return template ? template.replace('{camera}', encodeURIComponent(cameraId)) : null;
}

function frameInterval(): number {
  const parsed = Number(import.meta.env.VITE_NEXTFRAME_INTERVAL_MS);
  return Number.isFinite(parsed) && parsed >= 250 ? parsed : DEFAULT_INTERVAL_MS;
}

/**
 * Provider-agnostic camera hook.
 *
 * - With `VITE_NEXTFRAME_URL` set it runs the *next-frame* loop: fetch a frame into an off-screen
 *   `Image`, swap it in once decoded (no flicker), then schedule the next one. Failures back off
 *   exponentially and flip the feed to `offline` after three misses in a row.
 * - Without it, the feed is simulated so the interface can be reviewed end to end.
 *
 * Mount with `key={camera.id}` so switching cameras restarts the connection from `connecting`.
 */
export function useCameraFeed(camera: CameraStream): CameraFeedState {
  const endpoint = nextFrameUrl(camera.id);
  const mode: CameraStream['source'] = endpoint ? 'nextframe' : 'simulated';
  const [state, setState] = useState<CameraFeedState>({ status: 'connecting', frameSrc: null, latencyMs: null, mode });

  useEffect(() => {
    let cancelled = false;
    let timer = 0;

    if (!endpoint) {
      timer = window.setTimeout(() => {
        if (!cancelled) setState({ status: 'live', frameSrc: null, latencyMs: 180, mode: 'simulated' });
      }, 900);
      return () => {
        cancelled = true;
        window.clearTimeout(timer);
      };
    }

    const interval = frameInterval();
    let failures = 0;

    const loadNext = () => {
      if (cancelled) return;
      if (document.visibilityState === 'hidden') {
        timer = window.setTimeout(loadNext, interval);
        return;
      }
      const startedAt = performance.now();
      const separator = endpoint.includes('?') ? '&' : '?';
      const src = `${endpoint}${separator}t=${Date.now()}`;
      const image = new Image();
      image.decoding = 'async';

      image.onload = () => {
        if (cancelled) return;
        failures = 0;
        setState({ status: 'live', frameSrc: src, latencyMs: Math.round(performance.now() - startedAt), mode });
        timer = window.setTimeout(loadNext, interval);
      };
      image.onerror = () => {
        if (cancelled) return;
        failures += 1;
        if (failures >= OFFLINE_AFTER_FAILURES) setState((prev) => ({ ...prev, status: 'offline' }));
        timer = window.setTimeout(loadNext, Math.min(interval * 2 ** failures, MAX_BACKOFF_MS));
      };
      image.src = src;
    };

    loadNext();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [endpoint, mode]);

  return state;
}
