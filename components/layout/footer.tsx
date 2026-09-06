'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { navLinks, socialLinks, hubLocations } from '@/lib/data/site';
import { services } from '@/lib/data/services';
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion';

// Logo
import logo from '@/assets/logoOnly.png';

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Europe/Amsterdam',
          hour12: false,
        }).format(new Date())
      );

    update();

    const id = setInterval(update, 1000);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-footer-big]',
        { yPercent: 40, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <footer
      ref={ref}
      className="relative w-full overflow-hidden border-t border-border bg-background"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">

        {/* Top grid */}
        <div className="grid grid-cols-2 gap-8 border-b border-border py-14 md:grid-cols-4 md:py-20">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">

            {/* Logo */}
            <a
              href="#top"
              className="group inline-flex items-center"
              aria-label="EL-DORADO SHIPPING home"
            >
              <img
                src={logo.src}
                alt="EL-DORADO SHIPPING"
                className="h-10 w-auto"
              />
            </a>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Shipping, transport and supply-chain solutions built around
              visibility, reliability and control.
            </p>

            <div className="mt-5 text-xs text-muted-foreground">
              Global operations — {time} CET
            </div>
          </div>

          {/* Navigate */}
          <FooterCol
            title="Navigate"
            links={navLinks.map((n) => ({
              label: n.label,
              href: n.href,
            }))}
          />

          {/* Services */}
          <FooterCol
            title="Services"
            links={services.map((s) => ({
              label: s.name,
              href: '#services',
            }))}
          />
        </div>

        {/* Hubs */}
        <div className="grid grid-cols-1 gap-8 border-b border-border py-10 sm:grid-cols-2 md:grid-cols-4">
          {hubLocations.map((h) => (
            <div key={h.city}>
              <p className="text-xs uppercase tracking-ultra text-muted-foreground">
                {h.city}, {h.country}
              </p>

              <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                {h.address}
              </p>

              <a
                href={`tel:${h.phone.replace(/\s/g, '')}`}
                className="mt-1 block text-sm text-foreground/60 hover:text-accent"
              >
                {h.phone}
              </a>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-border py-10 md:flex-row md:items-center">
          <div>
            <p className="font-display text-xl font-medium">
              Stay on the lane
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Monthly field notes on freight, customs and supply-chain strategy.
            </p>
          </div>

          <form
            className="flex w-full max-w-md items-center gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="you@company.com"
              aria-label="Email address"
              className="h-12 flex-1 rounded-full border border-border bg-background px-5 text-sm outline-none transition-colors focus:border-accent"
            />

            <button
              type="submit"
              className="flex h-12 shrink-0 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Subscribe
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Oversized brand */}
        <div className="overflow-hidden py-10 md:py-14">
          <p
            data-footer-big
            className="font-display text-[18vw] font-semibold leading-[0.8] tracking-tighter text-foreground md:text-[14vw]"
          >
            EL-DORADO SHIPPING
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-border py-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <span>
            © {new Date().getFullYear()} El Dorado Shipping. All rights
            reserved.
          </span>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>

            <a href="#" className="hover:text-foreground">
              Terms
            </a>

            <a href="#" className="hover:text-foreground">
              Cookies
            </a>

            <a
              href="#top"
              className="inline-flex items-center gap-1 hover:text-foreground"
              aria-label="Back to top"
            >
              Back to top
              <ArrowUp className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-ultra text-muted-foreground">
        {title}
      </p>

      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="group inline-flex items-center gap-1 text-sm text-foreground/70 transition-colors hover:text-foreground"
            >
              {l.label}

              <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}