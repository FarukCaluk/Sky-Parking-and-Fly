/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Where reservations from the form are delivered (see `RESERVATION_INBOX`). */
  readonly VITE_RESERVATION_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
