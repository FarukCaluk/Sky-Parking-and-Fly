import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useI18n } from '@/i18n/context';
import { cn } from '@/utils/cn';

export function ThemeToggle({ className, onPhoto = false }: { className?: string; onPhoto?: boolean }) {
  const { t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const Icon = theme === 'dark' ? Sun : Moon;
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? t.nav.switchToLight : t.nav.switchToDark}
      className={cn(
        'grid size-10 place-items-center rounded-[6px] transition-[background-color,color,transform] duration-200 active:scale-90',
        onPhoto
          ? 'text-white/80 hover:bg-white/10 hover:text-white'
          : 'text-ink-muted hover:bg-ink/[0.07] hover:text-ink',
        className,
      )}
    >
      <Icon className="size-[1.2rem]" strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}
