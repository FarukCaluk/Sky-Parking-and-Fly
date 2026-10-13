import type { ComponentPropsWithRef } from 'react';
import { cn } from '@/utils/cn';

export function Container({ className, ...props }: ComponentPropsWithRef<'div'>) {
  return <div {...props} className={cn('mx-auto w-full max-w-[84rem] px-5 sm:px-8 lg:px-12', className)} />;
}
