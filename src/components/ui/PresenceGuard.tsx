import { useIsPresent } from 'framer-motion';
import type { ComponentPropsWithRef } from 'react';

/**
 * Wrapper for the direct child of an `<AnimatePresence>`. While the child is playing its exit
 * animation it is marked `inert`, so a fading overlay can no longer take focus, clicks or keystrokes.
 */
export function PresenceGuard(props: ComponentPropsWithRef<'div'>) {
  const isPresent = useIsPresent();
  return <div {...props} inert={!isPresent} />;
}
