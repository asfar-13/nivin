'use client';

import { cn } from '@/lib/utils';
import { AnimatedText } from './animated-text';
import { ScrollReveal } from './scroll-reveal';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  className?: string;
  titleClassName?: string;
  align?: 'left' | 'center';
};

export function SectionHeading({
  eyebrow,
  title,
  className,
  titleClassName,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      <ScrollReveal y={20} duration={0.8}>
        <span className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-ultra text-muted-foreground">
          <span className="h-px w-8 bg-accent" />
          {eyebrow}
        </span>
      </ScrollReveal>
      <AnimatedText
        text={title}
        as="h2"
        splitBy="lines"
        className={cn(
          'font-display text-4xl font-medium leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl',
          titleClassName
        )}
      />
    </div>
  );
}
