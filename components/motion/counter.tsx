'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/utils';

type CounterProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
};

export function Counter({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
  duration = 2,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      el.textContent = `${prefix}${value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`;
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const obj = { val: 0 };
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: value,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${prefix}${obj.val.toLocaleString('en-US', {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            })}${suffix}`;
          },
        });
      },
    });

    return () => st.kill();
  }, [value, decimals, prefix, suffix, duration, reduced]);

  return (
    <span ref={ref} className={cn(className)}>
      {`${prefix}0${suffix}`}
    </span>
  );
}
