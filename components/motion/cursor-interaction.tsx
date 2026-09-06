'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useIsTouch } from '@/lib/hooks/use-is-touch';
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion';

export function CursorInteraction() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string>('');
  const [variant, setVariant] = useState<'default' | 'link' | 'view' | 'drag'>('default');
  const isTouch = useIsTouch();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (isTouch || reduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add('cursor-none-desktop');

    const xTo = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3.out' });
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3.out' });
    const rxTo = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' });
    const ryTo = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' });

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      rxTo(e.clientX);
      ryTo(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor]');
      if (!t) {
        setVariant('default');
        setLabel('');
        return;
      }
      const c = t.dataset.cursor;
      const l = t.dataset.cursorLabel || '';
      if (c === 'view') {
        setVariant('view');
        setLabel(l || 'VIEW');
      } else if (c === 'drag') {
        setVariant('drag');
        setLabel(l || 'DRAG');
      } else {
        setVariant('link');
        setLabel('');
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      document.body.classList.remove('cursor-none-desktop');
    };
  }, [isTouch, reduced]);

  if (isTouch || reduced) return null;

  const ringSize =
    variant === 'view' || variant === 'drag' ? 88 : variant === 'link' ? 56 : 36;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-accent"
        style={{ translate: '-50% -50%' }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full border border-foreground/60 transition-[width,height,background-color] duration-300"
        style={{
          translate: '-50% -50%',
          width: ringSize,
          height: ringSize,
          backgroundColor:
            variant === 'view' || variant === 'drag' ? 'hsl(var(--accent))' : 'transparent',
          borderColor:
            variant === 'view' || variant === 'drag' ? 'hsl(var(--accent))' : 'hsl(var(--foreground) / 0.6)',
          mixBlendMode: variant === 'default' ? 'difference' : 'normal',
        }}
      >
        {label && (
          <span className="text-[10px] font-semibold uppercase tracking-ultra text-accent-foreground">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
