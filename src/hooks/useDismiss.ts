import { useEffect, useRef, type RefObject } from 'react';

interface DismissOptions {
  /** Also dismiss on Escape. Disable when the owner handles Escape itself (e.g. to stop it reaching a parent dialog). */
  escape?: boolean;
}

/** Call `handler` for pointer presses outside `ref` (and optionally the Escape key). */
export function useDismiss(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  handler: () => void,
  { escape = true }: DismissOptions = {},
): void {
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    if (!active) return;
    const onPointerDown = (event: PointerEvent) => {
      if (ref.current && event.target instanceof Node && !ref.current.contains(event.target)) handlerRef.current();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handlerRef.current();
    };
    document.addEventListener('pointerdown', onPointerDown);
    if (escape) document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      if (escape) document.removeEventListener('keydown', onKeyDown);
    };
  }, [ref, active, escape]);
}
