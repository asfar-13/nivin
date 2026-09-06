'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/utils';

type ImageRevealProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  ratio?: 'auto' | 'portrait' | 'landscape' | 'square' | 'wide';
  priority?: boolean;
  dir?: 'left' | 'right' | 'top' | 'bottom';
  parallax?: boolean;
  grayscale?: boolean;
};

const ratioClass: Record<NonNullable<ImageRevealProps['ratio']>, string> = {
  auto: '',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
  wide: 'aspect-[16/9]',
};

export function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  ratio = 'auto',
  priority = false,
  dir = 'left',
  parallax = false,
  grayscale = false,
}: ImageRevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const reduced = usePrefersReducedMotion();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;

    if (reduced) {
      gsap.set(wrap, { clipPath: 'inset(0% 0% 0% 0%)' });
      gsap.set(img, { scale: 1, filter: 'blur(0px)' });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const clipFrom =
      dir === 'left'
        ? 'inset(0% 100% 0% 0%)'
        : dir === 'right'
        ? 'inset(0% 0% 0% 100%)'
        : dir === 'top'
        ? 'inset(100% 0% 0% 0%)'
        : 'inset(0% 0% 100% 0%)';

    gsap.set(wrap, { clipPath: clipFrom });
    gsap.set(img, { scale: 1.25, filter: grayscale ? 'blur(12px) grayscale(100%)' : 'blur(12px)' });

    const st = ScrollTrigger.create({
      trigger: wrap,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(wrap, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.4,
          ease: 'power4.inOut',
        });
        gsap.to(img, {
          scale: 1,
          filter: grayscale ? 'blur(0px) grayscale(0%)' : 'blur(0px)',
          duration: 1.6,
          ease: 'power3.out',
        });
      },
    });

    let parallaxST: ScrollTrigger | undefined;
    if (parallax) {
      parallaxST = ScrollTrigger.create({
        trigger: wrap,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(img, { yPercent: (p - 0.5) * 16 });
        },
      });
    }

    return () => {
      st.kill();
      parallaxST?.kill();
    };
  }, [reduced, dir, grayscale, parallax]);

  return (
    <div
      ref={wrapRef}
      className={cn('relative overflow-hidden bg-muted', ratioClass[ratio], className)}
    >
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 60vw"
        onLoad={() => setLoaded(true)}
        className={cn(
          'object-cover transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0',
          imgClassName
        )}
      />
    </div>
  );
}
