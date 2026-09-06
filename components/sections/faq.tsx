'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { faqs } from '@/lib/data/faqs';
import { SectionHeading } from '@/components/motion/section-heading';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { cn } from '@/lib/utils';

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative w-full bg-muted/40 py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow="(10) — Questions"
            title={'Answers,\nbefore you ask.'}
          />

          <div className="flex flex-col">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <ScrollReveal key={i} y={20}>
                  <div className="border-b border-border">
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      data-cursor="link"
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    >
                      <span
                        className={cn(
                          'font-display text-lg font-medium tracking-tight transition-colors sm:text-xl',
                          isOpen ? 'text-accent' : 'text-foreground'
                        )}
                      >
                        {faq.q}
                      </span>
                      <span
                        className={cn(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
                          isOpen
                            ? 'rotate-[135deg] border-accent bg-accent text-accent-foreground'
                            : 'border-border text-foreground'
                        )}
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                    <div
                      className="grid transition-all duration-500 ease-out"
                      style={{
                        gridTemplateRows: isOpen ? '1fr' : '0fr',
                      }}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-2xl pb-5 text-sm leading-relaxed text-muted-foreground">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
