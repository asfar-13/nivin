'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion';
import { useIsTouch } from '@/lib/hooks/use-is-touch';
import { MagneticButton } from '@/components/motion/magnetic-button';

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const reduced = usePrefersReducedMotion();
  const isTouch = useIsTouch();

  // ============================================================
  // INTRO ANIMATION
  // ============================================================
  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        '[data-hero-eyebrow]',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        }
      );

      tl.fromTo(
        '[data-hero-line]',
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: 'power4.out',
        },
        '-=0.4'
      );

      tl.fromTo(
        '[data-hero-sub]',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
        },
        '-=0.6'
      );

      tl.fromTo(
        '[data-hero-cta]',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.5'
      );

      tl.fromTo(
        containerRef.current,
        {
          opacity: 0,
          rotateX: -20,
          y: 60,
        },
        {
          opacity: 1,
          rotateX: 0,
          y: 0,
          duration: 1.4,
          ease: 'power3.out',
        },
        '-=0.9'
      );

      tl.fromTo(
        '[data-hero-meta]',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
        },
        '-=0.6'
      );
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  // ============================================================
  // SCROLL PARALLAX
  // ============================================================
  useEffect(() => {
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to('[data-hero-line]', {
        yPercent: -40,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(sceneRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      /*
       * Keep the slow rotation on scroll.
       * Mouse movement below controls the X tilt and position.
       */
      gsap.to(containerRef.current, {
        rotateY: 25,
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  // ============================================================
  // FLAT RACK MOUSE FOLLOW
  // ============================================================
  useEffect(() => {
    if (reduced || isTouch) return;

    const container = containerRef.current;

    if (!container) return;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();

      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      /*
       * The flat rack follows the mouse.
       *
       * x = left/right movement
       * y = up/down movement
       * rotateX = vertical mouse tilt
       *
       * rotateY is intentionally NOT controlled here because
       * ScrollTrigger already uses rotateY for the scroll effect.
       */
      gsap.to(container, {
        x: x * 28,
        y: y * 20,
        rotateX: -y * 14,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    const onEnter = () => {
      gsap.to(container, {
        scale: 1.04,
        duration: 0.45,
        ease: 'power3.out',
      });
    };

    const onLeave = () => {
      gsap.to(container, {
        x: 0,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
      });
    };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseenter', onEnter);
    container.addEventListener('mouseleave', onLeave);

    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseenter', onEnter);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, [reduced, isTouch]);

  // ============================================================
  // HERO
  // ============================================================
  return (
    <section
      ref={rootRef}
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden bg-foreground text-background"
    >
      {/* ========================================================
          ATMOSPHERIC GRID + GLOW
      ======================================================== */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <div
          className="absolute left-1/2 top-1/3 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
          style={{
            background:
              'radial-gradient(circle, hsl(24 95% 56% / 0.5), transparent 70%)',
          }}
        />
      </div>

      {/* ========================================================
          ANIMATED NETWORK LINES
      ======================================================== */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <NetworkLines />
      </svg>

      {/* ========================================================
          FLOATING PARTICLES
      ======================================================== */}
      <Particles reduced={reduced} />

      {/* ========================================================
          MAIN CONTENT
      ======================================================== */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-between px-5 pb-10 pt-28 sm:px-8 md:pt-32">
        {/* ======================================================
            TOP
        ====================================================== */}
        <div className="flex items-center justify-between">
          <span
            data-hero-eyebrow
            className="inline-flex items-center gap-3 text-xs uppercase tracking-ultra text-background/60"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />

            Global Freight & Supply Chain
          </span>

          <span
            data-hero-meta
            className="hidden text-xs uppercase tracking-ultra text-background/40 md:block"
          >
            Est. 2009 — 100+ countries
          </span>
        </div>

        {/* ======================================================
            CENTER
        ====================================================== */}
        <div className="relative flex flex-1 flex-col justify-center py-10">
          <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            {/* ==================================================
                LEFT: TEXT
            ================================================== */}
            <div className="relative z-20">
              <h1
                ref={headlineRef}
                className="font-display text-[15vw] font-semibold leading-[0.82] tracking-tighter sm:text-[12vw] lg:text-[8.5vw]"
              >
                <span className="block overflow-hidden">
                  <span data-hero-line className="block">
                    One Network.
                  </span>
                </span>

                <span className="block overflow-hidden">
                  <span data-hero-line className="block">
                    Every <span className="text-accent">Move.</span>
                  </span>
                </span>
              </h1>

              <p
                data-hero-sub
                className="mt-7 max-w-md text-base leading-relaxed text-background/70 sm:text-lg"
              >
                Global freight, transport and supply-chain solutions built
                around visibility, reliability and control.
              </p>

              {/* CTA */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <MagneticButton
                  data-hero-cta
                  data-cursor="link"
                  as="a"
                  href="#contact"
                  className="group h-12 gap-2 rounded-full bg-accent px-7 text-sm font-semibold text-accent-foreground"
                >
                  Talk to an Expert

                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </MagneticButton>

                <MagneticButton
                  data-hero-cta
                  data-cursor="link"
                  as="a"
                  href="#services"
                  className="group h-12 gap-2 rounded-full border border-background/30 px-7 text-sm font-semibold text-background transition-colors hover:bg-background hover:text-foreground"
                >
                  Explore Services

                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </MagneticButton>
              </div>
            </div>

            {/* ==================================================
                FLAT RACK CONTAINER
            ================================================== */}
            <div
              ref={sceneRef}
              className="perspective-1000 relative hidden h-[55vh] items-center justify-center lg:flex"
            >
              <div
                ref={containerRef}
                className="preserve-3d relative h-[34vh] w-[52vh] cursor-pointer will-change-transform"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <Container3D />
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================
            BOTTOM STATS
        ====================================================== */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-t border-background/15 pt-5">
            <div className="flex items-center gap-8 overflow-hidden">
              <HeroStat value="98.2%" label="On-time" />

              <HeroStat
                value="100+"
                label="Countries"
                className="hidden sm:flex"
              />
            </div>

            <div className="hidden items-center gap-2 text-xs uppercase tracking-ultra text-background/40 md:flex">
              <span>Scroll</span>

              <span className="flex h-8 w-5 items-start justify-center rounded-full border border-background/30 pt-1.5">
                <span className="h-1.5 w-1 animate-float rounded-full bg-background/60" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ================================================================
// HERO STAT
// ================================================================

function HeroStat({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      data-hero-meta
      className={cn('flex flex-col gap-0.5', className)}
    >
      <span className="font-display text-2xl font-semibold leading-none">
        {value}
      </span>

      <span className="text-[10px] uppercase tracking-ultra text-background/40">
        {label}
      </span>
    </div>
  );
}

// ================================================================
// CLASSNAME HELPER
// ================================================================

function cn(...c: (string | false | undefined)[]) {
  return c.filter(Boolean).join(' ');
}

// ================================================================
// NETWORK LINES
// ================================================================

function NetworkLines() {
  const lines = [
    'M0 220 Q400 120 800 260 T1600 200',
    'M0 520 Q300 420 700 560 T1600 480',
    'M0 700 Q500 620 900 720 T1600 660',
    'M0 360 L1600 360',
  ];

  return (
    <g fill="none" stroke="white" strokeWidth="1">
      {lines.map((d, i) => (
        <g key={i}>
          <path d={d} opacity={0.18} />

          <circle
            r="3"
            fill="hsl(24 95% 56%)"
            opacity={0.9}
          >
            <animateMotion
              dur={`${6 + i * 2}s`}
              repeatCount="indefinite"
              path={d}
              rotate="auto"
            />
          </circle>
        </g>
      ))}
    </g>
  );
}

// ================================================================
// FLOATING PARTICLES
// ================================================================

function Particles({ reduced }: { reduced: boolean }) {
  if (reduced) return null;

  const particles = Array.from({ length: 18 });

  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden
    >
      {particles.map((_, i) => {
        const left = (i * 53) % 100;
        const top = (i * 37) % 100;
        const size = 1 + (i % 3);
        const dur = 5 + (i % 5);

        return (
          <span
            key={i}
            className="absolute rounded-full bg-background/40"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              animation: `float ${dur}s ease-in-out ${
                i * 0.3
              }s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

// ================================================================
// FLAT RACK CONTAINER
// ================================================================

function Container3D() {
  const steel = 'hsl(220 10% 48%)';
  const darkSteel = 'hsl(220 12% 26%)';
  const darkerSteel = 'hsl(220 12% 16%)';
  const accent = 'hsl(24 95% 56%)';

  return (
    <div
      className="relative h-full w-full"
      style={{
        transformStyle: 'preserve-3d',
        transform: 'rotateX(-10deg) rotateY(-25deg)',
      }}
    >
      {/* ========================================================
          FRONT FLAT-RACK FRAME
      ======================================================== */}
      <div
        className="absolute inset-0"
        style={{
          transform: 'translateZ(5rem)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Top horizontal beam */}
        <RackBeam
          className="absolute left-0 top-0 h-4 w-full"
          style={{
            background: `linear-gradient(
              180deg,
              ${steel},
              ${darkSteel}
            )`,
          }}
        />

        {/* Bottom horizontal beam */}
        <RackBeam
          className="absolute bottom-0 left-0 h-4 w-full"
          style={{
            background: `linear-gradient(
              180deg,
              ${darkSteel},
              ${steel}
            )`,
          }}
        />

        {/* Left vertical beam */}
        <RackBeam
          className="absolute left-0 top-0 h-full w-4"
          style={{
            background: `linear-gradient(
              90deg,
              ${darkerSteel},
              ${steel}
            )`,
          }}
        />

        {/* Right vertical beam */}
        <RackBeam
          className="absolute right-0 top-0 h-full w-4"
          style={{
            background: `linear-gradient(
              90deg,
              ${steel},
              ${darkerSteel}
            )`,
          }}
        />

        {/* ======================================================
            CORNER CASTINGS
        ====================================================== */}

        <CornerCasting className="absolute -left-1 -top-1" />

        <CornerCasting className="absolute -right-1 -top-1" />

        <CornerCasting className="absolute -bottom-1 -left-1" />

        <CornerCasting className="absolute -bottom-1 -right-1" />

        {/* ======================================================
            FLOOR / WOODEN DECK
        ====================================================== */}
        <div
          className="absolute bottom-4 left-4 right-4 h-5"
          style={{
            background:
              'repeating-linear-gradient(90deg, hsl(28 18% 22%), hsl(28 18% 22%) 10px, hsl(28 14% 30%) 11px, hsl(28 14% 30%) 12px)',
            transform: 'translateZ(0.4rem)',
          }}
        />

        {/* ======================================================
            CENTER SUPPORT
        ====================================================== */}
        <div
          className="absolute bottom-4 left-1/2 top-4 w-[3px] -translate-x-1/2"
          style={{
            background: accent,
            boxShadow: `0 0 15px ${accent}`,
            transform: 'translateZ(0.5rem)',
          }}
        />

        {/* ======================================================
            EL-DORADO BRANDING
        ====================================================== */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            transform:
              'translateZ(0.5rem) translate(-50%, -50%)',
          }}
        >
          <div className="text-center">
            <div className="text-[12px] font-semibold uppercase tracking-[0.3em] text-white/75">
              EL-DORADO
            </div>

            <div
              className="mx-auto mt-2 h-[2px] w-28"
              style={{
                background: accent,
                boxShadow: `0 0 10px ${accent}`,
              }}
            />

            <div className="mt-2 text-[7px] uppercase tracking-[0.4em] text-white/40">
              SHIPPING
            </div>

            <div className="mt-1 text-[6px] uppercase tracking-[0.3em] text-white/25">
              FLAT RACK
            </div>
          </div>
        </div>

        {/* ======================================================
            CONTAINER ID
        ====================================================== */}
        <div className="absolute bottom-7 left-7 text-[7px] uppercase tracking-[0.25em] text-white/35">
          ELDO 4829
        </div>

        <div className="absolute right-7 top-7 text-[7px] uppercase tracking-[0.25em] text-white/35">
          40&apos; FR
        </div>
      </div>

      {/* ========================================================
          BACK FRAME
      ======================================================== */}
      <div
        className="absolute inset-0"
        style={{
          transform: 'translateZ(-5rem)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Back top */}
        <RackBeam
          className="absolute left-0 top-0 h-4 w-full"
          style={{
            background: darkSteel,
          }}
        />

        {/* Back bottom */}
        <RackBeam
          className="absolute bottom-0 left-0 h-4 w-full"
          style={{
            background: darkSteel,
          }}
        />

        {/* Back left */}
        <RackBeam
          className="absolute left-0 top-0 h-full w-4"
          style={{
            background: darkSteel,
          }}
        />

        {/* Back right */}
        <RackBeam
          className="absolute right-0 top-0 h-full w-4"
          style={{
            background: darkSteel,
          }}
        />
      </div>

      {/* ========================================================
          LEFT SIDE FRAME
      ======================================================== */}
      <div
        className="absolute left-0 top-0 h-full w-20"
        style={{
          transform:
            'translateX(-1rem) rotateY(-90deg)',
          transformOrigin: 'right center',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Outer beam */}
        <div
          className="absolute left-0 top-0 h-full w-3"
          style={{
            background: steel,
          }}
        />

        {/* Inner beam */}
        <div
          className="absolute right-0 top-0 h-full w-3"
          style={{
            background: darkSteel,
          }}
        />

        {/* Side support */}
        <div
          className="absolute left-1/2 top-0 h-full w-[2px]"
          style={{
            background: accent,
            opacity: 0.7,
          }}
        />
      </div>

      {/* ========================================================
          RIGHT SIDE FRAME
      ======================================================== */}
      <div
        className="absolute right-0 top-0 h-full w-20"
        style={{
          transform:
            'translateX(1rem) rotateY(90deg)',
          transformOrigin: 'left center',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Outer beam */}
        <div
          className="absolute right-0 top-0 h-full w-3"
          style={{
            background: steel,
          }}
        />

        {/* Inner beam */}
        <div
          className="absolute left-0 top-0 h-full w-3"
          style={{
            background: darkSteel,
          }}
        />

        {/* Side support */}
        <div
          className="absolute left-1/2 top-0 h-full w-[2px]"
          style={{
            background: accent,
            opacity: 0.7,
          }}
        />
      </div>

      {/* ========================================================
          TOP FRAME / DECK
      ======================================================== */}
      <div
        className="absolute left-0 top-0 h-20 w-full"
        style={{
          transform:
            'translateY(-1rem) rotateX(90deg)',
          transformOrigin: 'bottom center',
          background:
            'repeating-linear-gradient(90deg, hsl(220 12% 20%), hsl(220 12% 20%) 12px, hsl(220 10% 30%) 13px, hsl(220 10% 30%) 14px)',
          opacity: 0.9,
        }}
      />

      {/* ========================================================
          BOTTOM SHADOW / FRAME
      ======================================================== */}
      <div
        className="absolute bottom-0 left-0 h-10 w-full"
        style={{
          transform:
            'translateY(1rem) rotateX(-90deg)',
          transformOrigin: 'top center',
          background: darkerSteel,
          opacity: 0.8,
        }}
      />

      {/* ========================================================
          ORANGE ACCENT LIGHT
      ======================================================== */}
      <div
        className="absolute left-1/2 top-0 h-full w-[2px]"
        style={{
          background: accent,
          transform:
            'translateX(-50%) translateZ(5.25rem)',
          boxShadow: `
            0 0 12px ${accent},
            0 0 25px ${accent}
          `,
        }}
      />

      {/* ========================================================
          FLOOR GLOW
      ======================================================== */}
      <div
        className="absolute left-1/2 top-full h-8 w-[70%] -translate-x-1/2 rounded-full blur-xl"
        style={{
          background:
            'hsl(24 95% 56% / 0.18)',
          transform:
            'translateX(-50%) translateZ(0)',
        }}
      />
    </div>
  );
}

// ================================================================
// RACK BEAM
// ================================================================

function RackBeam({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`rounded-[2px] border border-white/10 shadow-lg ${
        className ?? ''
      }`}
      style={style}
    />
  );
}

// ================================================================
// CORNER CASTING
// ================================================================

function CornerCasting({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative h-5 w-5 rounded-[2px] border border-white/20 bg-zinc-500 shadow-md ${
        className ?? ''
      }`}
    >
      <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/50 bg-zinc-700/70" />
    </div>
  );
}