'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion';

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        gsap.to(el, {
          scaleX: self.progress,
          duration: 0.1,
          ease: 'none',
          overwrite: true,
        });
      },
    });

    return () => st.kill();
  }, [reduced]);

  return (
    <div className="fixed left-0 top-0 z-[200] h-[2px] w-full bg-transparent">
      <div
        ref={ref}
        className="h-full w-full origin-left scale-x-0 bg-accent"
        style={{ transformOrigin: 'left' }}
      />
    </div>
  );
}
