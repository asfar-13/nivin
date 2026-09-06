'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion';

export function LoadingScreen() {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }
    const el = ref.current;
    const num = numRef.current;
    const line = lineRef.current;
    if (!el || !num || !line) return;

    const tl = gsap.timeline();
    const obj = { v: 0 };

    tl.to(obj, {
      v: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        num.textContent = String(Math.floor(obj.v)).padStart(3, '0');
      },
    });
    tl.to(line, { scaleX: 1, duration: 1.8, ease: 'power2.inOut' }, '<');
    tl.to(el, {
      clipPath: 'inset(0% 0% 100% 0%)',
      duration: 0.8,
      ease: 'power4.inOut',
      delay: 0.15,
      onComplete: () => setDone(true),
    });
    tl.to(num, { opacity: 0, duration: 0.3 }, '<');

    return () => {
      tl.kill();
    };
  }, [reduced]);

  if (done) return null;

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-foreground text-background"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="flex flex-1 items-end pb-6">
        <span ref={numRef} className="font-display text-[18vw] font-semibold leading-none tracking-tight md:text-[12vw]">
          000
        </span>
      </div>
      <div className="flex w-full items-center gap-4 px-5 pb-6 sm:px-8">
        <span className="text-xs uppercase tracking-ultra text-background/50">
          EL-DORADO SHIPPING
        </span>
        <div className="h-px flex-1 overflow-hidden bg-background/15">
          <div
            ref={lineRef}
            className="h-full w-full origin-left scale-x-0 bg-accent"
          />
        </div>
        <span className="text-xs uppercase tracking-ultra text-background/50">
          Loading
        </span>
      </div>
    </div>
  );
}
