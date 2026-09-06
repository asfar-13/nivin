'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plane, Ship, Truck, CheckCircle2 } from 'lucide-react';
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion';
import { SectionHeading } from '@/components/motion/section-heading';
import { ScrollReveal } from '@/components/motion/scroll-reveal';

const milestones = [
  { id: 'booked', label: 'Booked', icon: CheckCircle2 },
  { id: 'picked', label: 'Picked Up', icon: Truck },
  { id: 'departed', label: 'Departed', icon: Ship },
  { id: 'transit', label: 'In Transit', icon: Plane },
  { id: 'customs', label: 'Customs', icon: CheckCircle2 },
  { id: 'delivered', label: 'Delivered', icon: CheckCircle2 },
];

export function TrackingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0.62);
  const [currentStep, setCurrentStep] = useState(3);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setProgress(0.62);
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const obj = { p: 0 };
      gsap.to(obj, {
        p: 0.62,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 60%',
          scrub: 1.5,
          onUpdate: () => {
            setProgress(obj.p);
            const step = Math.min(
              milestones.length - 1,
              Math.floor(obj.p * milestones.length)
            );
            setCurrentStep(step);
            if (fillRef.current) {
              fillRef.current.style.width = `${obj.p * 100}%`;
            }
            if (markerRef.current) {
              markerRef.current.style.left = `${obj.p * 100}%`;
            }
          },
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="(06) — Visibility"
          title={'Every shipment.\nNo blind spots.'}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
          {/* Tracking panel */}
          <ScrollReveal y={40} className="relative overflow-hidden rounded-sm border border-border bg-card p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
              <div>
                <p className="text-xs uppercase tracking-ultra text-muted-foreground">
                  Shipment
                </p>
                <p className="mt-1 font-display text-2xl font-semibold tracking-tight">
                  MRDN-48291
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                <span className="text-xs font-medium text-accent">In Transit</span>
              </div>
            </div>

            {/* Origin / destination */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs uppercase tracking-ultra text-muted-foreground">Origin</p>
                <p className="mt-1 text-lg font-medium">Shanghai</p>
                <p className="text-xs text-muted-foreground">China · 2026-08-12</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-ultra text-muted-foreground">Destination</p>
                <p className="mt-1 text-lg font-medium">Frankfurt</p>
                <p className="text-xs text-muted-foreground">Germany · ETA 2026-08-26</p>
              </div>
            </div>

            {/* Route visualization */}
            <div className="relative mt-10 h-40 overflow-hidden rounded-sm bg-muted/40">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 160" preserveAspectRatio="none">
                <path
                  d="M 30 120 Q 200 40 370 120"
                  stroke="hsl(var(--border))"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="4 4"
                />
                <path
                  d="M 30 120 Q 200 40 370 120"
                  stroke="hsl(var(--accent))"
                  strokeWidth="2.5"
                  fill="none"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1 - progress}
                  style={{ transition: 'stroke-dashoffset 0.3s' }}
                />
                <circle cx="30" cy="120" r="5" fill="hsl(var(--foreground))" />
                <circle cx="370" cy="120" r="5" fill="hsl(var(--muted-foreground))" />
                {/* Moving marker */}
                <g
                  ref={(el) => {
                    if (!el) return;
                    const path = el.parentElement?.querySelectorAll('path')[1];
                    if (path) {
                      const len = path.getTotalLength();
                      const pt = path.getPointAtLength(progress * len);
                      el.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
                    }
                  }}
                >
                  <circle r="6" fill="hsl(var(--accent))" />
                  <circle r="10" fill="hsl(var(--accent) / 0.3)" />
                </g>
              </svg>
              <span className="absolute bottom-2 left-3 text-xs text-muted-foreground">SHA</span>
              <span className="absolute bottom-2 right-3 text-xs text-muted-foreground">FRA</span>
            </div>

            {/* Milestone progress */}
            <div className="mt-8">
              <div className="relative h-1 w-full rounded-full bg-muted">
                <div
                  ref={fillRef}
                  className="absolute left-0 top-0 h-full rounded-full bg-accent"
                  style={{ width: `${progress * 100}%` }}
                />
                <div
                  ref={markerRef}
                  className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent ring-4 ring-accent/20"
                  style={{ left: `${progress * 100}%` }}
                />
              </div>
              <ul className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
                {milestones.map((m, i) => {
                  const done = i <= currentStep;
                  const Icon = m.icon;
                  return (
                    <li key={m.id} className="flex flex-col items-center gap-2 text-center">
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                          done
                            ? 'border-accent bg-accent text-accent-foreground'
                            : 'border-border bg-background text-muted-foreground'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span
                        className={`text-[10px] uppercase tracking-widest ${
                          done ? 'text-foreground' : 'text-muted-foreground'
                        }`}
                      >
                        {m.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </ScrollReveal>

          {/* Side details */}
          <ScrollReveal y={40} delay={0.1} className="flex flex-col gap-4">
            <DetailCard label="Service" value="Ocean Freight · FCL" sub="40' HC container" />
            <DetailCard label="Container" value="MRDN 4829 / ULC" sub="Reefer set to 2°C" />
            <DetailCard label="Next milestone" value="Customs clearance" sub="Frankfurt FRA · in ~38h" />
            <div className="rounded-sm border border-border bg-muted/30 p-5">
              <p className="text-xs uppercase tracking-ultra text-muted-foreground">
                Predictive ETA
              </p>
              <p className="mt-2 font-display text-3xl font-semibold tracking-tight">
                Aug 26, 14:20 CET
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Confidence 94% · updated 2 min ago
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function DetailCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-sm border border-border p-5 transition-colors hover:border-foreground/30">
      <div>
        <p className="text-xs uppercase tracking-ultra text-muted-foreground">{label}</p>
        <p className="mt-1 font-medium">{value}</p>
        <p className="text-xs text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
}
