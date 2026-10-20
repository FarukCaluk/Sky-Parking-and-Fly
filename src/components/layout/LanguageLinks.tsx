import { useI18n } from '@/i18n/context';
import { Link } from '@/router/Link';
import { useRoute } from '@/router/navigation';
import { LANGS, switchLangPath } from '@/router/routes';
import { cn } from '@/utils/cn';

interface LanguageLinksProps {
  className?: string;
  /** Link colour set: over the hero photo or on the page background. */
  onPhoto?: boolean;
  onNavigate?: () => void;
  /** Three equal, large buttons in one pill (the menu on phones) instead of the small codes in a row */
  segmented?: boolean;
}

/** One real link per language that points at the *same page* in that language. */
export function LanguageLinks({ className, onPhoto = false, onNavigate, segmented = false }: LanguageLinksProps) {
  const { lang, t } = useI18n();
  const { pathname } = useRoute();

  return (
    <ul
      aria-label={t.language.label}
      className={cn(
        segmented ? 'grid grid-cols-3 gap-1 rounded-[10px] border border-line bg-surface p-1' : 'flex items-center',
        className,
      )}
    >
      {LANGS.map((code) => {
        const active = code === lang;
        return (
          <li key={code}>
            <Link
              path={switchLangPath(pathname, code)}
              keepScroll
              lang={code}
              hrefLang={code}
              aria-current={active ? 'true' : undefined}
              aria-label={t.language.switchTo(t.language.names[code])}
              onClick={onNavigate}
              className={cn(
                segmented
                  ? 'label grid min-h-11 place-items-center rounded-[7px] text-[1.0625rem] transition-colors duration-200'
                  : 'label grid min-h-10 min-w-9 place-items-center px-1.5 text-[0.9375rem] transition-colors duration-200',
                segmented &&
                  (active ? 'bg-accent text-accent-ink' : 'text-ink-muted hover:bg-ink/[0.06] hover:text-ink'),
                !segmented &&
                  (active
                    ? onPhoto
                      ? 'text-white'
                      : 'text-ink'
                    : onPhoto
                      ? 'text-white/60 hover:text-white'
                      : 'text-ink-faint hover:text-ink'),
              )}
            >
              {t.language.codes[code]}
              {active && !segmented && <span aria-hidden="true" className="-mt-1 h-0.5 w-4 rounded-full bg-accent" />}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
