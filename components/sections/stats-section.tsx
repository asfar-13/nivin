'use client';

import { stats } from '@/lib/data/stats';
import { Counter } from '@/components/motion/counter';
import { ScrollReveal } from '@/components/motion/scroll-reveal';

export function StatsSection() {
  return (
    <section className="relative w-full border-y border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <ScrollReveal
          stagger={0.12}
          className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-24 lg:gap-x-32"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-2 border-l border-border pl-5 md:pl-8"
            >
              <Counter
                value={s.value}
                decimals={s.decimals ?? 0}
                prefix={s.prefix}
                suffix={s.suffix}
                className="font-display text-5xl font-semibold leading-none tracking-tight md:text-6xl lg:text-7xl"
              />

              <span className="mt-2 text-sm font-medium text-foreground">
                {s.label}
              </span>

              <span className="text-xs text-muted-foreground">
                {s.sublabel}
              </span>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}