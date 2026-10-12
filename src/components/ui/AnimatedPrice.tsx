import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';
import { useI18n } from '@/i18n/context';
import { formatKM } from '@/utils/format';

interface AnimatedPriceProps {
  value: number;
  className?: string;
  /** Round to whole KM while the number is moving, then settle on the exact amount. */
  withCurrency?: boolean;
}

/** Price that glides to its new value. Tabular figures keep the width steady while it counts. */
export function AnimatedPrice({ value, className, withCurrency = true }: AnimatedPriceProps) {
  const { lang } = useI18n();
  const animated = useAnimatedNumber(value);
  return (
    <span className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {formatKM(animated, lang, { withCurrency })}
    </span>
  );
}
