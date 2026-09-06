'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion';
import { services } from '@/lib/data/services';
import { MagneticButton } from '@/components/motion/magnetic-button';
import { ArrowUpRight } from 'lucide-react';

export function HorizontalScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const panels = track.querySelectorAll('[data-panel]');
      const totalWidth = track.scrollWidth;

      const horizontalTween = gsap.to(track, {
        x: () => -(totalWidth - window.innerWidth + 32),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalWidth - window.innerWidth + 32}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel) => {
        gsap.fromTo(
          panel.querySelectorAll('[data-panel-anim]'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontalTween,
              start: 'left 70%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-foreground text-background"
    >
      <div className="flex h-[100svh] items-center">
        {/* Intro panel */}
        <div className="flex h-full w-screen shrink-0 flex-col justify-center px-5 sm:px-8 md:px-16">
          <span className="text-xs uppercase tracking-ultra text-background/40">
            (04) — The Journey
          </span>
          <h2 className="mt-5 max-w-2xl font-display text-5xl font-semibold leading-[0.9] tracking-tight md:text-7xl lg:text-8xl">
            From origin
            <br />
            to outcome.
          </h2>
          <p className="mt-6 max-w-md text-background/60">
            Specialized in project cargo
          </p>
        </div>

        {/* Service panels */}
        <div ref={trackRef} className="flex h-full items-center gap-0 pr-5 sm:pr-8 md:pr-16">
          {services.map((s) => (
            <article
              key={s.id}
              data-panel
              className="relative flex h-[70vh] w-[80vw] shrink-0 items-end overflow-hidden rounded-sm sm:w-[60vw] md:w-[44vw] lg:w-[34vw]"
            >
              <Image
                src={s.image}
                alt={s.name}
                fill
                sizes="50vw"
                className="object-cover opacity-50 grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-transparent" />
              <div className="relative z-10 w-full p-6 md:p-8">
                <span data-panel-anim className="font-display text-7xl font-semibold text-background/30 md:text-8xl">
                  {s.index}
                </span>
                <h3 data-panel-anim className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                  {s.name}
                </h3>
                <p data-panel-anim className="mt-3 max-w-sm text-sm leading-relaxed text-background/70">
                  {s.description}
                </p>
                <MagneticButton
                  data-panel-anim
                  data-cursor="link"
                  as="a"
                  href="#contact"
                  className="mt-5 inline-flex h-11 items-center gap-2 rounded-full border border-background/30 px-5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Explore {s.name}
                  <ArrowUpRight className="h-4 w-4" />
                </MagneticButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
