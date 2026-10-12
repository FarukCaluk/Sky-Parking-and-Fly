/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BOOKING_ENDPOINT?: string;
  readonly VITE_NEXTFRAME_URL?: string;
  readonly VITE_NEXTFRAME_INTERVAL_MS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
