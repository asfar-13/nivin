'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navLinks, socialLinks, hubLocations } from '@/lib/data/site';
import { cn } from '@/lib/utils';
import { MagneticButton } from '@/components/motion/magnetic-button';
import { useIsTouch } from '@/lib/hooks/use-is-touch';
import logo from '@/assets/textlogo.png';
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const isTouch = useIsTouch();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (menuOpen) return;
      if (y > 200 && y > lastY.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[150] transition-all duration-500',
          hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0',
          scrolled || menuOpen
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/60'
            : 'bg-transparent'
        )}
      >
        <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 sm:px-8 md:h-20">
          <a
  href="#top"
  data-cursor="link"
  className="group flex items-center"
  aria-label="EL-DORADO SHIPPING home"
>
  <img
    src={logo.src}
    alt="EL-DORADO SHIPPING"
    className="h-14 w-auto"
  />
</a>
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor="link"
                className="group relative text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <MagneticButton
              as="a"
              href="#contact"
              strength={0.3}
              className="hidden h-10 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-accent hover:text-accent-foreground md:inline-flex"
            >
              Talk to an Expert
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <button
              onClick={() => setMenuOpen(true)}
              data-cursor="link"
              aria-label="Open menu"
              className="flex h-10 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium transition-colors hover:border-foreground/40"
            >
              <Menu className="h-4 w-4" />
              <span className="hidden sm:inline">Menu</span>
            </button>
          </div>
        </nav>
      </header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} isTouch={isTouch} />
    </>
  );
}

function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M3 20V8l6 5V8l6 5V8l6 5v7H3z"
        className="fill-foreground"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <path d="M3 14h18" className="stroke-accent" strokeWidth="1.5" />
    </svg>
  );
}

function MenuOverlay({
  open,
  onClose,
  isTouch,
}: {
  open: boolean;
  onClose: () => void;
  isTouch: boolean;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current) return;
    const tl = gsap.timeline();

    if (open) {
      tl.set(overlayRef.current, { display: 'flex' });
      tl.fromTo(
        overlayRef.current,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'power4.inOut' }
      );
      tl.fromTo(
        bgRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' },
        '<'
      );
      if (linksRef.current) {
        const items = linksRef.current.querySelectorAll('li');
        tl.fromTo(
          items,
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.07, ease: 'power4.out' },
          '-=0.3'
        );
      }
      if (metaRef.current) {
        tl.fromTo(
          metaRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
          '-=0.4'
        );
      }
    } else {
      tl.to(overlayRef.current, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.5,
        ease: 'power4.inOut',
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = 'none';
        },
      });
    }
  }, [open]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[180] hidden flex-col bg-foreground text-background"
      style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
    >
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 opacity-0"
        aria-hidden
      >
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="menuGlow" cx="70%" cy="40%" r="60%">
              <stop offset="0%" stopColor="hsl(24 95% 56%)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <rect width="1200" height="800" fill="url(#menuGlow)" />
          {Array.from({ length: 40 }).map((_, i) => (
            <circle
              key={i}
              cx={(i * 137) % 1200}
              cy={(i * 211) % 800}
              r={1}
              fill="white"
              opacity={0.3}
            />
          ))}
          <path
            d="M0 200 Q300 100 600 250 T1200 200"
            stroke="hsl(24 95% 56%)"
            strokeWidth="1"
            fill="none"
            opacity="0.25"
          />
          <path
            d="M0 500 Q400 600 800 450 T1200 520"
            stroke="white"
            strokeWidth="0.5"
            fill="none"
            opacity="0.15"
          />
        </svg>
      </div>

      <div className="relative flex items-center justify-between px-5 pt-5 sm:px-8">
        <div className="flex items-center gap-2">
          <img
    src={logo.src}
    alt="EL-DORADO SHIPPING"
    className="h-14 w-auto"
  />
          
          <span className="font-display text-lg font-semibold"></span>
        </div>
        <button
          onClick={onClose}
          data-cursor="link"
          aria-label="Close menu"
          className="flex h-10 items-center gap-2 rounded-full border border-background/30 px-4 text-sm font-medium transition-colors hover:bg-background hover:text-foreground"
        >
          Close
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="relative flex flex-1 flex-col justify-center gap-12 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <ul ref={linksRef} className="flex flex-col gap-1 overflow-hidden">
          {navLinks.map((link, i) => (
            <li key={link.href} className="overflow-hidden">
              <a
                href={link.href}
                onClick={onClose}
                data-cursor="link"
                className="group flex items-baseline gap-4 font-display text-5xl font-medium leading-[1.05] tracking-tight transition-colors hover:text-accent sm:text-6xl lg:text-7xl"
              >
                <span className="text-sm font-normal text-background/40">
                  0{i + 1}
                </span>
                {link.label}
                <ArrowUpRight className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </li>
          ))}
        </ul>

        <div
          ref={metaRef}
          className="flex max-w-xs flex-col gap-8 text-sm text-background/70 lg:pt-24"
        >
          
          <div>
            <p className="mb-3 text-xs uppercase tracking-ultra text-background/40">
              Contact
            </p>
            <a href="nivin@eldorado-shipping.com" data-cursor="link" className="block hover:text-accent">
              nivin@eldorado-shipping.com
            </a>
            <a href="tel:+7(909)422-56-62" data-cursor="link" className="block hover:text-accent">
              +7(909)422-56-62
            </a>
          </div>
          
        </div>
      </div>

      <div className="relative flex flex-wrap gap-x-8 gap-y-2 border-t border-background/10 px-5 py-5 text-xs uppercase tracking-widest text-background/40 sm:px-8">
        {hubLocations.map((h) => (
          <span key={h.city}>
            {h.city}, {h.country}
          </span>
        ))}
      </div>
    </div>
  );
}
