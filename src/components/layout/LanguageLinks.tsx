import { Check } from 'lucide-react';
import { useI18n } from '@/i18n/context';
import { Link } from '@/router/Link';
import { useRoute } from '@/router/navigation';
import { LANGS, switchLangPath } from '@/router/routes';
import { cn } from '@/utils/cn';

interface LanguageLinksProps {
  /** `inline` is a compact row of codes; `list` shows full language names with a check on the active one. */
  variant?: 'inline' | 'list';
  className?: string;
  onNavigate?: () => void;
}

/** One real link per language that points at the *same page* in that language. */
export function LanguageLinks({ variant = 'inline', className, onNavigate }: LanguageLinksProps) {
  const { lang, t } = useI18n();
  const { pathname } = useRoute();

  return (
    <ul aria-label={t.language.label} className={cn(variant === 'inline' ? 'flex gap-1' : 'grid gap-0.5', className)}>
      {LANGS.map((code) => {
        const active = code === lang;
        return (
          <li key={code} className={variant === 'inline' ? 'flex-1' : undefined}>
            <Link
              path={switchLangPath(pathname, code)}
              keepScroll
              lang={code}
              hrefLang={code}
              aria-current={active ? 'true' : undefined}
              aria-label={t.language.switchTo(t.language.names[code])}
              onClick={onNavigate}
              className={cn(
                'flex min-h-10 items-center rounded-xl text-sm font-semibold transition-colors duration-200',
                variant === 'inline' ? 'justify-center px-3' : 'justify-between px-3.5',
                active ? 'bg-ink/[0.07] text-ink' : 'text-ink-muted hover:bg-ink/[0.05] hover:text-ink',
              )}
            >
              {variant === 'inline' ? t.language.codes[code] : t.language.names[code]}
              {variant === 'list' && active && (
                <Check className="size-4 text-accent" strokeWidth={3} aria-hidden="true" />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
