'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/lib/data/services';
import { SectionHeading } from '@/components/motion/section-heading';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { cn } from '@/lib/utils';

export function ServicesSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="relative w-full bg-background py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="(03) — Capabilities"
          title={'Six services.\nOne control tower.'}
        />

        {/* Desktop: interactive expanding panels */}
        <div className="mt-12 hidden gap-3 lg:flex lg:h-[60vh] lg:min-h-[460px]">
          {services.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.id}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                data-cursor="view"
                data-cursor-label="OPEN"
                aria-label={s.name}
                className={cn(
                  'group relative overflow-hidden rounded-sm border border-border text-left transition-[flex] duration-700',
                  isActive ? 'flex-[3]' : 'flex-[1]'
                )}
                style={isActive ? undefined : { transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
              >
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  sizes="40vw"
                  className={cn(
                    'object-cover transition-all duration-700',
                    isActive ? 'scale-105 opacity-40' : 'scale-100 opacity-20 grayscale group-hover:opacity-30'
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
                <div className="relative flex h-full flex-col justify-between p-5 text-background">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-medium uppercase tracking-ultra text-background/60">
                      {s.index}
                    </span>
                    <s.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3
                      className={cn(
                        'font-display font-semibold leading-tight tracking-tight transition-all duration-500',
                        isActive ? 'text-3xl xl:text-4xl' : 'text-xl'
                      )}
                    >
                      {s.name}
                    </h3>
                    <div
                      className={cn(
                        'overflow-hidden transition-all duration-500',
                        isActive ? 'mt-3 max-h-48 opacity-100' : 'mt-0 max-h-0 opacity-0'
                      )}
                    >
                      <p className="text-sm leading-relaxed text-background/80">
                        {s.description}
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {s.features.map((f) => (
                          <li
                            key={f}
                            className="rounded-full border border-background/20 px-3 py-1 text-[11px] uppercase tracking-widest text-background/70"
                          >
                            {f}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                        {s.tagline}
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                    {!isActive && (
                      <p className="mt-1 hidden text-sm text-background/60 lg:block">
                        {s.tagline}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Mobile: accordion-style cards */}
        <div className="mt-10 flex flex-col gap-3 lg:hidden">
          {services.map((s) => (
            <ScrollReveal key={s.id} y={30}>
              <article className="group relative overflow-hidden rounded-sm border border-border">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    sizes="100vw"
                    className="object-cover opacity-60 grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2 text-background">
                    <span className="text-xs uppercase tracking-ultra text-background/60">
                      {s.index}
                    </span>
                    <s.icon className="h-4 w-4 text-accent" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-2xl font-semibold tracking-tight">
                    {s.name}
                  </h3>
                  <p className="mt-1 text-sm text-accent">{s.tagline}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.features.map((f) => (
                      <li
                        key={f}
                        className="rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
