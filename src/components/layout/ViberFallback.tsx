import { Check, Copy, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { SITE, whatsappLink } from '@/data/site';
import { useDismiss } from '@/hooks/useDismiss';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useI18n } from '@/i18n/context';

/** How long the browser gets to hand a `viber:` link to the app before we assume that no app answered. */
const LAUNCH_WAIT_MS = 1600;
const VIBER_DOWNLOAD = 'https://www.viber.com/download/';

/**
 * Viber has no web version, so `viber:` links only work where the app is installed. Where it is not (most computers),
 * the browser does nothing at all: Chrome only logs "scheme does not have a registered handler". This watches every
 * click on a `viber:` link; when the page was not left (no prompt, no app switch, no change of focus), it offers what
 * does work instead. One listener covers the hero, the contact page, the menu and the reservation panel.
 */
export function ViberFallback() {
  const { t } = useI18n();
  const [shown, setShown] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const textId = useId();

  const close = () => setShown(false);
  useDismiss(ref, shown, close);
  useFocusTrap(ref, shown);

  useEffect(() => {
    let cancel: (() => void) | undefined;

    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest('a[href^="viber:"]') : null;
      // A handler that stopped the link (the reservation form does when it has errors) is not a launch
      if (!link || event.defaultPrevented) return;

      cancel?.();
      let left = false;
      const leave = () => {
        left = true;
      };
      window.addEventListener('blur', leave);
      document.addEventListener('visibilitychange', leave);
      const timer = window.setTimeout(() => {
        cancel?.();
        if (!left) {
          setCopied(false);
          setShown(true);
        }
      }, LAUNCH_WAIT_MS);
      cancel = () => {
        window.clearTimeout(timer);
        window.removeEventListener('blur', leave);
        document.removeEventListener('visibilitychange', leave);
        cancel = undefined;
      };
    };

    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
      cancel?.();
    };
  }, []);

  if (!shown) return null;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-labelledby={titleId}
      aria-describedby={textId}
      tabIndex={-1}
      className="fixed inset-x-4 bottom-4 z-[75] animate-pop-in rounded-[10px] border border-line-strong bg-surface p-5 text-ink shadow-[0_30px_80px_-24px_rgb(4_9_22/0.7)] outline-none sm:inset-x-auto sm:bottom-auto sm:right-6 sm:top-24 sm:w-[26rem]"
    >
      <button
        type="button"
        onClick={close}
        aria-label={t.viber.close}
        className="absolute right-2 top-2 grid size-9 place-items-center rounded-[6px] text-ink-muted transition-colors hover:bg-ink/[0.07] hover:text-ink"
      >
        <X className="size-5" aria-hidden="true" />
      </button>
      <p id={titleId} className="display pr-8 text-[1.375rem] leading-none">
        {t.viber.title}
      </p>
      <p id={textId} className="mt-2 text-ink-muted">
        {t.viber.text(SITE.phone.display)}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          size="sm"
          onClick={() => void navigator.clipboard?.writeText(SITE.phone.e164).then(() => setCopied(true))}
          leftIcon={
            copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />
          }
        >
          {copied ? t.viber.copied : t.viber.copy}
        </Button>
        <Button
          size="sm"
          variant="secondary"
          href={whatsappLink(t.contact.whatsappGeneric)}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </Button>
        <Button size="sm" variant="secondary" href={VIBER_DOWNLOAD} target="_blank" rel="noopener noreferrer">
          {t.viber.download}
        </Button>
      </div>
    </div>
  );
}
