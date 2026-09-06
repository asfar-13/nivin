'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/utils';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  blur?: boolean;
  start?: string;
  once?: boolean;
  as?: 'div' | 'span' | 'section' | 'li' | 'article';
};

export function ScrollReveal({
  children,
  className,
  y = 60,
  x = 0,
  opacity = 0,
  duration = 1,
  delay = 0,
  stagger,
  blur = false,
  start = 'top 88%',
  once = true,
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0, x: 0, filter: 'blur(0px)' });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const targets =
      typeof stagger === 'number'
        ? Array.from(el.children) as HTMLElement[]
        : [el];

    gsap.set(targets, {
      y,
      x,
      opacity,
      filter: blur ? 'blur(10px)' : 'blur(0px)',
    });

    const st = ScrollTrigger.create({
      trigger: el,
      start,
      once,
      onEnter: () => {
        gsap.to(targets, {
          y: 0,
          x: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration,
          delay,
          stagger: typeof stagger === 'number' ? stagger : 0,
          ease: 'power3.out',
        });
      },
    });

    return () => st.kill();
  }, [reduced, y, x, opacity, duration, delay, stagger, blur, start, once]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={cn(className)}>
      {children}
    </Tag>
  );
}
