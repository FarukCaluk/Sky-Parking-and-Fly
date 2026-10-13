import { ArrowRight } from 'lucide-react';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { Link } from '@/router/Link';
import type { RouteId } from '@/router/routes';
import { cn } from '@/utils/cn';
import { buttonStyles, type ButtonSize, type ButtonVariant } from './buttonStyles';

interface OwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  /** Trailing arrow that nudges forward on hover. */
  arrow?: boolean;
  rightIcon?: ReactNode;
}

type AsButton = OwnProps & Omit<ComponentPropsWithRef<'button'>, keyof OwnProps> & { href?: undefined; to?: undefined };
type AsAnchor = OwnProps & Omit<ComponentPropsWithRef<'a'>, keyof OwnProps> & { href: string; to?: undefined };
type AsRoute = OwnProps & Omit<ComponentPropsWithRef<'a'>, keyof OwnProps | 'href'> & { to: RouteId; href?: undefined };
export type ButtonProps = AsButton | AsAnchor | AsRoute;

/** Button, external link (`href`) or in-app link (`to`), all sharing one look. */
export function Button(props: ButtonProps) {
  const { variant, size, fullWidth, leftIcon, arrow, rightIcon, className, children, ...rest } = props;
  const classes = buttonStyles({ variant, size, fullWidth, className });

  const content = (
    <>
      {leftIcon}
      {children}
      {arrow ? (
        <ArrowRight
          className="size-[1.1em] transition-transform duration-300 ease-signal group-hover/btn:translate-x-1"
          strokeWidth={2.5}
          aria-hidden="true"
        />
      ) : (
        rightIcon
      )}
    </>
  );

  if ('to' in rest && rest.to !== undefined) {
    const { to, ...linkProps } = rest as Omit<ComponentPropsWithRef<'a'>, keyof OwnProps | 'href'> & { to: RouteId };
    return (
      <Link route={to} {...linkProps} className={classes}>
        {content}
      </Link>
    );
  }

  if ('href' in rest && rest.href !== undefined) {
    const anchorProps = rest as Omit<ComponentPropsWithRef<'a'>, keyof OwnProps>;
    return (
      <a {...anchorProps} className={cn(classes)}>
        {content}
      </a>
    );
  }

  const { type = 'button', ...buttonProps } = rest as Omit<ComponentPropsWithRef<'button'>, keyof OwnProps>;
  return (
    <button {...buttonProps} type={type} className={classes}>
      {content}
    </button>
  );
}
