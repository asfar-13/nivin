'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { testimonials } from '@/lib/data/testimonials';
import { SectionHeading } from '@/components/motion/section-heading';
import { cn } from '@/lib/utils';

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  const go = (dir: number) => {
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative w-full bg-muted/40 py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="(08) — Trusted By"
          title={'What operators\nsay after switch.'}
        />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          {/* Quote */}
          <div className="relative">
            <Quote className="h-10 w-10 text-accent" />
            <blockquote
              key={t.id}
              className="mt-6 font-display text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl md:text-4xl"
              style={{ animation: 'fadeInUp 0.6s ease both' }}
            >
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-full bg-muted">
                <Image src={t.image} alt={t.name} fill sizes="56px" className="object-cover" />
              </div>
              <div>
                <p className="font-medium">{t.name}</p>
                <p className="text-sm text-muted-foreground">
                  {t.role}, {t.company}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-10 flex items-center gap-3">
              <button
                onClick={() => go(-1)}
                data-cursor="link"
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:border-foreground/40"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => go(1)}
                data-cursor="link"
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:border-foreground/40"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
              <div className="ml-4 flex items-center gap-2">
                {testimonials.map((tt, i) => (
                  <button
                    key={tt.id}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={cn(
                      'h-1.5 rounded-full transition-all',
                      i === index ? 'w-8 bg-accent' : 'w-3 bg-foreground/20'
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative hidden aspect-[4/5] overflow-hidden rounded-sm bg-foreground lg:block">
            <Image
              key={t.id}
              src={t.image}
              alt={t.name}
              fill
              sizes="40vw"
              className="object-cover grayscale"
              style={{ animation: 'fadeIn 0.8s ease both' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
            <div className="absolute bottom-5 left-5 text-background">
              <p className="font-display text-lg font-semibold">{t.company}</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </section>
  );
}
