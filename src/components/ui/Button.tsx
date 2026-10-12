import { LoaderCircle } from 'lucide-react';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { buttonStyles, type ButtonSize, type ButtonVariant } from './buttonStyles';

interface OwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  /** Shows a spinner, keeps the button width stable and blocks interaction. */
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

type ButtonAsButton = OwnProps & Omit<ComponentPropsWithRef<'button'>, keyof OwnProps> & { href?: undefined };
type ButtonAsLink = OwnProps & Omit<ComponentPropsWithRef<'a'>, keyof OwnProps> & { href: string };
export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant, size, fullWidth, loading = false, leftIcon, rightIcon, className, children, ...rest } = props;
  const classes = buttonStyles({ variant, size, fullWidth, className });

  const content = (
    <>
      <span className={cn('inline-flex items-center justify-center gap-2', loading && 'opacity-0')}>
        {leftIcon}
        {children}
        {rightIcon}
      </span>
      {loading && (
        <span className="absolute inset-0 grid place-items-center" aria-hidden="true">
          <LoaderCircle className="size-5 animate-spin" strokeWidth={2.4} />
        </span>
      )}
    </>
  );

  if ('href' in rest && rest.href !== undefined) {
    const anchorProps = rest as Omit<ComponentPropsWithRef<'a'>, keyof OwnProps>;
    return (
      <a {...anchorProps} className={classes} aria-busy={loading || undefined}>
        {content}
      </a>
    );
  }

  const { type = 'button', disabled, ...buttonProps } = rest as Omit<ComponentPropsWithRef<'button'>, keyof OwnProps>;
  return (
    <button
      {...buttonProps}
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {content}
    </button>
  );
}
