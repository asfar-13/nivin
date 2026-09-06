'use client';

import { cn } from '@/lib/utils';

type MarqueeProps = {
  items: string[];
  className?: string;
  separator?: string;
  duration?: number;
};

export function Marquee({ items, className, separator = '✦', duration = 30 }: MarqueeProps) {
  const row = [...items, ...items];
  return (
    <div className={cn('relative flex w-full overflow-hidden', className)}>
      <div
        className="flex shrink-0 items-center gap-8 whitespace-nowrap pr-8"
        style={{ animation: `marquee ${duration}s linear infinite` }}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-lg font-medium uppercase tracking-widest text-foreground/80">
              {item}
            </span>
            <span className="text-accent">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
