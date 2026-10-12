import type { ComponentPropsWithRef, MouseEvent } from 'react';
import { navigate, useRoute } from './navigation';
import { prefetchRoute } from './prefetch';
import { matchPath, pathFor, type Lang, type RouteId } from './routes';

type LinkTarget = { route: RouteId; inLang?: Lang; path?: never } | { path: string; route?: never; inLang?: never };

type LinkProps = LinkTarget &
  Omit<ComponentPropsWithRef<'a'>, 'href'> & {
    /** Keep the scroll position after navigating (language switches). */
    keepScroll?: boolean;
  };

const isPlainLeftClick = (event: MouseEvent<HTMLAnchorElement>): boolean =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

/**
 * Real `<a href>` (works with middle-click, copy link, crawlers) that navigates without a page reload.
 * Pass `route` for a page in the current language (or `inLang`), or `path` for an explicit URL (e.g. a language switch).
 */
export function Link({
  route,
  inLang,
  path,
  keepScroll,
  onClick,
  onPointerEnter,
  onFocus,
  target,
  download,
  ...rest
}: LinkProps) {
  const { lang: currentLang } = useRoute();
  const href = path ?? pathFor(inLang ?? currentLang, route);
  const targetRoute = route ?? matchPath(href).route;

  const warm = () => {
    if (targetRoute) prefetchRoute(targetRoute);
  };

  return (
    <a
      {...rest}
      href={href}
      target={target}
      download={download}
      onPointerEnter={(event) => {
        warm();
        onPointerEnter?.(event);
      }}
      onFocus={(event) => {
        warm();
        onFocus?.(event);
      }}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          !isPlainLeftClick(event) ||
          (target && target !== '_self') ||
          download !== undefined
        ) {
          return;
        }
        event.preventDefault();
        navigate(href, { keepScroll });
      }}
    />
  );
}
