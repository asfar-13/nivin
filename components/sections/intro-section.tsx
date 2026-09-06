'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion';

export function IntroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('[data-intro-word]');
      gsap.fromTo(
        words,
        { opacity: 0.12, filter: 'blur(6px)', y: 30 },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          ease: 'none',
          stagger: 1.2,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: 1.2,
          },
        }
      );

      // parallax image
      gsap.to('[data-intro-img]', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  const line1 = ['We', 'move', 'freight.'];
  const line2 = ['We', 'own', 'the', 'outcome.'];

  return (
    <section
      ref={ref}
      id="about"
      className="relative w-full bg-background py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="flex flex-col gap-3 text-foreground/40">
          <span className="text-xs uppercase tracking-ultra">
            (01) — The Premise
          </span>
        </div>

        <h2 className="mt-8 font-display text-[10vw] font-semibold leading-[0.88] tracking-tighter sm:text-[8vw] lg:text-[6.5vw]">
          <span className="flex flex-wrap gap-x-[0.25em]">
            {line1.map((w, i) => (
              <span key={i} data-intro-word className="inline-block">
                {w}
              </span>
            ))}
          </span>
          <span className="flex flex-wrap gap-x-[0.25em]">
            {line2.map((w, i) => (
              <span
                key={i}
                data-intro-word
                className={i === 1 ? 'inline-block text-accent' : 'inline-block'}
              >
                {w}
              </span>
            ))}
          </span>
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-10 border-t border-border pt-10 md:grid-cols-[1.4fr_1fr]">
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Most forwarders move boxes and hope. We engineer the full lane — capacity, compliance, visibility and recovery — then stand behind the outcome. One control tower. One accountable team. Freight that behaves like a product, not a prayer.
          </p>
          <div className="flex items-end justify-start md:justify-end">
            <div
              data-intro-img
              className="h-32 w-full max-w-xs overflow-hidden rounded-sm bg-muted md:h-44"
            >
              <div
                className="h-full w-full"
                style={{
                  background:
                    'linear-gradient(135deg, hsl(220 20% 12%), hsl(24 95% 56% / 0.3))',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
