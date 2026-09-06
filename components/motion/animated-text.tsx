'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/utils';

type AnimatedTextProps = {
  text: string;
  className?: string;
  splitBy?: 'lines' | 'words' | 'chars';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  delay?: number;
  stagger?: number;
  duration?: number;
  y?: number;
  blur?: boolean;
  trigger?: 'scroll' | 'load';
  start?: string;
};

export function AnimatedText({
  text,
  className,
  splitBy = 'lines',
  as: Tag = 'div',
  delay = 0,
  stagger = 0.08,
  duration = 1,
  y = 120,
  blur = true,
  trigger = 'scroll',
  start = 'top 85%',
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (reduced) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Build split units
    let units: HTMLElement[] = [];
    if (splitBy === 'chars') {
      el.innerHTML = '';
      const chars = text.split('');
      chars.forEach((ch) => {
        const wrap = document.createElement('span');
        wrap.className = 'split-line';
        const inner = document.createElement('span');
        inner.className = 'split-word';
        inner.textContent = ch === ' ' ? '\u00A0' : ch;
        wrap.appendChild(inner);
        el.appendChild(wrap);
        units.push(inner);
      });
    } else if (splitBy === 'words') {
      el.innerHTML = '';
      const words = text.split(' ');
      words.forEach((w, i) => {
        const wrap = document.createElement('span');
        wrap.className = 'split-line';
        const inner = document.createElement('span');
        inner.className = 'split-word';
        inner.textContent = w;
        wrap.appendChild(inner);
        units.push(inner);
        el.appendChild(wrap);
        if (i < words.length - 1) {
          el.appendChild(document.createTextNode('\u00A0'));
        }
      });
    } else {
      // lines: wrap each \n as a line
      const lines = text.split('\n');
      el.innerHTML = '';
      lines.forEach((line) => {
        const wrap = document.createElement('span');
        wrap.className = 'split-line';
        const inner = document.createElement('span');
        inner.className = 'split-word';
        inner.textContent = line;
        wrap.appendChild(inner);
        el.appendChild(wrap);
        units.push(inner);
      });
    }

    gsap.set(units, {
      yPercent: 100,
      opacity: 0,
      filter: blur ? 'blur(8px)' : 'blur(0px)',
    });
    gsap.set(el, { opacity: 1 });

    const animate = () => {
      gsap.to(units, {
        yPercent: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration,
        stagger,
        delay,
        ease: 'power4.out',
      });
    };

    if (trigger === 'load') {
      const t = setTimeout(animate, delay * 1000 + 100);
      return () => clearTimeout(t);
    }

    const st = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: animate,
    });

    return () => {
      st.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, splitBy, reduced]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={containerRef as any} className={cn('reveal-hidden', className)} style={{ opacity: 0 }}>
      {text}
    </Tag>
  );
}
