'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion';
import { ScrollReveal } from '@/components/motion/scroll-reveal';

type ShowcaseItem = {
  label: string;
  caption: string;
  image: string;
  depth: number; // parallax strength
  className: string;
};

const items: ShowcaseItem[] = [
  {
    label: 'Container',
    caption: '40\' HC — the atom of global trade',
    image:
      'https://images.pexels.com/photos/27127363/pexels-photo-27127363.jpeg?auto=compress&cs=tinysrgb&w=900',
    depth: 1.5,
    className: 'col-span-2 row-span-2 md:col-span-2 md:row-span-2',
  },
  {
    label: 'Vessel',
    caption: 'Allocated FCL & reefer capacity',
    image:
      'https://images.pexels.com/photos/3278012/pexels-photo-3278012.jpeg?auto=compress&cs=tinysrgb&w=700',
    depth: 0.8,
    className: 'col-span-1 row-span-1',
  },
  {
    label: 'Forklift',
    caption: 'Bonded warehousing & 3PL',
    image:
      'https://images.pexels.com/photos/1267327/pexels-photo-1267327.jpeg?auto=compress&cs=tinysrgb&w=700',
    depth: 1.2,
    className: 'col-span-1 row-span-1',
  },
  {
    label: 'Airframe',
    caption: 'Next-flight-out & charters',
    image:
      'https://images.pexels.com/photos/11146455/pexels-photo-11146455.jpeg?auto=compress&cs=tinysrgb&w=900',
    depth: 1.0,
    className: 'col-span-2 row-span-1',
  },
  {
    label: 'Truck',
    caption: 'First mile to final mile',
    image:
      'https://images.pexels.com/photos/28264496/pexels-photo-28264496.jpeg?auto=compress&cs=tinysrgb&w=900',
    depth: 1.3,
    className: 'col-span-2 row-span-1',
  },
];

export function FreightShowcase() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-showcase-item]').forEach((item) => {
        const depth = Number(item.dataset.depth || 1);
        const img = item.querySelector('img');
        if (!img) return;
        gsap.fromTo(
          item,
          { y: 40 * depth, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 88%', once: true },
          }
        );
        gsap.fromTo(
          img,
          { yPercent: -10 * depth },
          {
            yPercent: 10 * depth,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={ref} className="relative w-full bg-muted/40 py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <ScrollReveal y={16}>
              <span className="text-xs uppercase tracking-ultra text-muted-foreground">
                (02) — The Assets
              </span>
            </ScrollReveal>
            <h2 className="mt-5 max-w-2xl font-display text-4xl font-medium leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
              The physical layer
              <br />
              of your supply chain.
            </h2>
          </div>
          <ScrollReveal y={16} delay={0.1} className="max-w-sm">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Containers, vessels, airframes, trucks and warehouses — orchestrated as one system, visible from a single pane.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:auto-rows-[220px]">
          {items.map((item) => (
            <figure
              key={item.label}
              data-showcase-item
              data-depth={item.depth}
              data-cursor="view"
              data-cursor-label="EXPLORE"
              className={`group relative overflow-hidden rounded-sm bg-foreground ${item.className}`}
            >
              <Image
                src={item.image}
                alt={item.caption}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-80 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <figcaption className="absolute bottom-0 left-0 p-4 text-white">
                <div className="text-xs uppercase tracking-ultra text-accent">
                  {item.label}
                </div>
                <div className="mt-1 max-w-[80%] text-sm text-white/80">
                  {item.caption}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
