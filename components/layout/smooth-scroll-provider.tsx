'use client';

import { type ReactNode } from 'react';
import { useSmoothScroll } from '@/lib/hooks/use-smooth-scroll';

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useSmoothScroll(true);
  return <>{children}</>;
}
