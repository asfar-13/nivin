'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { articles, articleCategories } from '@/lib/data/articles';
import { SectionHeading } from '@/components/motion/section-heading';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { ImageReveal } from '@/components/motion/image-reveal';
import { cn } from '@/lib/utils';

export function Insights() {
  const [filter, setFilter] = useState<string>('All');
  const filtered =
    filter === 'All' ? articles : articles.filter((a) => a.category === filter);
  const featured = filtered.find((a) => a.featured) ?? filtered[0];
  const rest = filtered.filter((a) => a.id !== featured?.id);

  return (
    <section id="insights" className="relative w-full bg-background py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="(09) — Insights"
            title={'RUSSIA\nTRADE LANE.'}
          />
          {/* Filters */}
          <ScrollReveal y={16} className="flex flex-wrap gap-2">
            {articleCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                data-cursor="link"
                className={cn(
                  'rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-widest transition-colors',
                  filter === cat
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border text-muted-foreground hover:border-foreground/40'
                )}
              >
                {cat}
              </button>
            ))}
          </ScrollReveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Featured */}
          {featured && (
            <article
              data-cursor="view"
              data-cursor-label="READ"
              className="group cursor-pointer"
            >
              <ImageReveal
                src={featured.image}
                alt={featured.title}
                ratio="wide"
                dir="left"
                parallax
                grayscale
                className="rounded-sm"
              />
              <div className="mt-5 flex items-center gap-3 text-xs uppercase tracking-ultra text-muted-foreground">
                <span className="text-accent">{featured.category}</span>
                <span>·</span>
                <span>{featured.readTime} read</span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-medium leading-tight tracking-tight transition-colors group-hover:text-accent md:text-4xl">
                {featured.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {featured.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
                Read article
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </article>
          )}

          {/* List */}
          <div className="flex flex-col gap-px border-t border-border">
            {rest.map((a) => (
              <ScrollReveal key={a.id} y={24}>
                <article
                  data-cursor="view"
                  data-cursor-label="READ"
                  className="group grid cursor-pointer grid-cols-[auto_1fr] items-center gap-5 border-b border-border py-5 transition-colors hover:bg-muted/30"
                >
                  <div className="relative h-16 w-24 overflow-hidden rounded-sm bg-muted">
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      sizes="96px"
                      className="object-cover grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-ultra text-muted-foreground">
                      <span className="text-accent">{a.category}</span>
                      <span>·</span>
                      <span>{a.readTime}</span>
                    </div>
                    <h4 className="mt-1 truncate font-display text-base font-medium tracking-tight transition-colors group-hover:text-accent sm:text-lg">
                      {a.title}
                    </h4>
                    <p className="mt-0.5 hidden truncate text-xs text-muted-foreground sm:block">
                      {a.excerpt}
                    </p>
                  </div>
                  <ArrowUpRight className="hidden h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent sm:block" />
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
