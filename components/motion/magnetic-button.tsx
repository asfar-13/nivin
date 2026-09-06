'use client';

import { useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion';
import { useIsTouch } from '@/lib/hooks/use-is-touch';
import { cn } from '@/lib/utils';

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: 'button' | 'a';
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
} & Record<`data-${string}`, string | undefined>;

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  as = 'button',
  href,
  onClick,
  ariaLabel,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const reduced = usePrefersReducedMotion();
  const isTouch = useIsTouch();

  const handleMove = (e: React.MouseEvent) => {
    if (reduced || isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(ref.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.6,
      ease: 'power3.out',
    });
  };

  const handleLeave = () => {
    if (reduced || isTouch || !ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  const Tag = as === 'a' ? 'a' : 'button';

  return (
    <Tag
      // @ts-expect-error polymorphic ref
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      aria-label={ariaLabel}
      className={cn('inline-flex items-center justify-center', className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
