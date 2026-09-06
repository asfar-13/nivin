'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion';
import { MagneticButton } from '@/components/motion/magnetic-button';

export function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-cta-line]',
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true },
        }
      );
      gsap.to('[data-cta-img]', {
        yPercent: -12,
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

  return (
    <section
      ref={ref}
      id="contact"
      className="relative w-full overflow-hidden bg-foreground py-24 text-background md:py-40"
    >
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <Image
          src="https://images.pexels.com/photos/33587048/pexels-photo-33587048.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          data-cta-img
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/80 to-foreground" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 text-center sm:px-8">
        <span className="text-xs uppercase tracking-ultra text-background/40">
          Let&apos;s build your lane
        </span>
        <h2 className="mt-6 font-display text-[14vw] font-semibold leading-[0.85] tracking-tighter sm:text-[10vw] lg:text-[8vw]">
          <span className="block overflow-hidden">
            <span data-cta-line className="block">
              Ship any 
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-cta-line className="block">
              <span className="text-accent">Dimension today</span>
            </span>
          </span>
        </h2>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <MagneticButton
            as="a"
            href="mailto:nivin@eldorado-shipping.com"
            data-cursor="link"
            className="group h-14 gap-2 rounded-full bg-accent px-8 text-base font-semibold text-accent-foreground"
          >
            Let&apos;s Talk
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>
          <MagneticButton
            as="a"
            href="tel:+31105550142"
            data-cursor="link"
            className="h-14 gap-2 rounded-full border border-background/30 px-8 text-base font-semibold text-background transition-colors hover:bg-background hover:text-foreground"
          >
            +7 (909)442-56-62
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
