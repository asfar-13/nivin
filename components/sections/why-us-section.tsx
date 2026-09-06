'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion';
import { industries } from '@/lib/data/industries';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { Check } from 'lucide-react';

const benefits = [
  { title: 'One point of contact', desc: 'A dedicated control-tower coordinator owns your shipment from origin to delivered — no handoffs, no bouncing between desks.' },
  { title: 'Full supply-chain visibility', desc: 'Live milestones, predictive ETAs and exception alerts in a single dashboard, with API sync to your ERP.' },
  { title: 'Reliable customs compliance', desc: 'Licensed brokers in 40 markets manage classification, duty optimization and bonded entries so freight never waits at the border.' },
  { title: 'Transparent pricing', desc: 'All-in rate quotes with itemized accessorials. You always see the margin split — no surprise destination charges.' },
  { title: 'Fast issue resolution', desc: 'The control tower is alerted the moment a milestone slips. Average exception resolved in under 90 minutes, with a recovery plan attached.' },
];

export function WhyUsSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-benefit]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          }
        );
      });
      gsap.to('[data-why-img]', {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={ref}
      id="industries"
      className="relative w-full overflow-hidden bg-foreground py-24 text-background md:py-36"
    >
      {/* Background image */}
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <Image
          src="https://images.pexels.com/photos/11825324/pexels-photo-11825324.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          data-why-img
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/70 to-foreground" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8">
        <span className="text-xs uppercase tracking-ultra text-background/40">
          (07) — Why EL-DORADO-SHIPPING
        </span>
        <h2 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[0.92] tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
          Built for businesses
          <br />
          that can&apos;t afford
          <br />
          <span className="text-accent">disruption.</span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-px border-y border-background/10 bg-background/10 md:grid-cols-2">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              data-benefit
              className="group flex gap-5 bg-foreground p-6 transition-colors hover:bg-background/5 md:p-8"
            >
              <span className="font-display text-2xl font-semibold text-background/30">
                0{i + 1}
              </span>
              <div className="flex-1">
                <h3 className="flex items-center gap-2 font-display text-xl font-medium md:text-2xl">
                  <Check className="h-5 w-5 text-accent" />
                  {b.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-background/60">
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Industries strip */}
        <div className="mt-16">
          <ScrollReveal y={16}>
            <p className="text-xs uppercase tracking-ultra text-background/40">
              Industries we move
            </p>
          </ScrollReveal>
          <ScrollReveal stagger={0.06} className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {industries.map((ind) => (
              <div
                key={ind.id}
                data-cursor="link"
                className="group rounded-sm border border-background/10 p-4 transition-colors hover:border-accent/60"
              >
                <h4 className="text-sm font-medium text-background transition-colors group-hover:text-accent">
                  {ind.name}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-background/50">
                  {ind.blurb}
                </p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
