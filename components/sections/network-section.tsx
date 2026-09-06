'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion';
import { networkNodes, networkRoutes } from '@/lib/data/network';
import { SectionHeading } from '@/components/motion/section-heading';
import { ScrollReveal } from '@/components/motion/scroll-reveal';

export function NetworkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Animate route dashes
      gsap.utils.toArray<SVGPathElement>('[data-route]').forEach((path, i) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: 'power2.out',
          delay: i * 0.06,
          scrollTrigger: { trigger: svgRef.current, start: 'top 75%', once: true },
        });
      });

      // Pulse the moving dots along routes
      gsap.utils.toArray<SVGCircleElement>('[data-route-dot]').forEach((dot, i) => {
        const pathId = dot.dataset.path;
        const path = svgRef.current?.querySelector<SVGPathElement>(`#${pathId}`);
        if (!path) return;
        const len = path.getTotalLength();
        const obj = { p: 0 };
        gsap.to(obj, {
          p: 1,
          duration: 4 + (i % 3),
          ease: 'none',
          repeat: -1,
          delay: i * 0.3,
          onUpdate: () => {
            const pt = path.getPointAtLength(obj.p * len);
            dot.setAttribute('cx', String(pt.x));
            dot.setAttribute('cy', String(pt.y));
          },
        });
      });

      // Node scale-in
      gsap.fromTo(
        '[data-node]',
        { scale: 0, opacity: 0, transformOrigin: 'center' },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.04,
          ease: 'back.out(2)',
          scrollTrigger: { trigger: svgRef.current, start: 'top 75%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  const nodeMap = Object.fromEntries(networkNodes.map((n) => [n.id, n]));
  const activeRoutes = hovered
    ? networkRoutes.filter((r) => r.from === hovered || r.to === hovered)
    : null;

  return (
    <section
      ref={sectionRef}
      id="network"
      className="relative w-full bg-foreground py-24 text-background md:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="(05) — The Network"
            title={'One network.\nA hundred countries.'}
            titleClassName="text-background"
          />
          <ScrollReveal y={16} className="max-w-sm">
            <p className="text-sm leading-relaxed text-background/60">
              A live map of El-DoradoShipping. Hover any hub to trace the routes that pass through it.
            </p>
          </ScrollReveal>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-sm border border-background/10 bg-background/[0.02]">
          <svg
            ref={svgRef}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            className="h-[50vh] w-full md:h-[64vh]"
            role="img"
            aria-label="Global logistics network map"
          >
            {/* Dotted world-map backdrop (stylized continents) */}
            <g opacity="0.12" fill="white">
              <WorldDots />
            </g>

            {/* Routes */}
            <g fill="none" strokeWidth="0.25">
              {networkRoutes.map((r) => {
                const from = nodeMap[r.from];
                const to = nodeMap[r.to];
                if (!from || !to) return null;
                const midX = (from.x + to.x) / 2;
                const midY = (from.y + to.y) / 2 - 8;
                const d = `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;
                const dimmed = activeRoutes && !activeRoutes.some((ar) => ar.id === r.id);
                const color =
                  r.mode === 'air' ? 'hsl(24 95% 56%)' : r.mode === 'ocean' ? 'hsl(200 80% 60%)' : 'hsl(160 60% 55%)';
                return (
                  <g key={r.id}>
                    <path
                      id={`route-${r.id}`}
                      data-route
                      d={d}
                      stroke={color}
                      opacity={dimmed ? 0.08 : 0.45}
                      style={{ transition: 'opacity 0.3s' }}
                    />
                    <circle
                      data-route-dot
                      data-path={`route-${r.id}`}
                      r="0.5"
                      fill={color}
                      opacity={dimmed ? 0 : 0.9}
                    />
                  </g>
                );
              })}
            </g>

            {/* Nodes */}
            <g>
              {networkNodes.map((n) => {
                const isActive = hovered === n.id;
                const connected = activeRoutes?.some(
                  (r) => r.from === n.id || r.to === n.id
                );
                return (
                  <g
                    key={n.id}
                    data-node
                    transform={`translate(${n.x} ${n.y})`}
                    onMouseEnter={() => setHovered(n.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    {n.hub && (
                      <circle
                        r="1.6"
                        fill="none"
                        stroke="hsl(24 95% 56%)"
                        strokeWidth="0.2"
                        opacity={isActive ? 1 : 0.5}
                        className="origin-center"
                        style={{ animation: 'pulse-ring 2.4s ease-out infinite' }}
                      />
                    )}
                    <circle
                      r={n.hub ? 0.9 : 0.55}
                      fill={isActive ? 'hsl(24 95% 56%)' : connected ? 'white' : 'hsl(0 0% 80%)'}
                      stroke="white"
                      strokeWidth="0.15"
                    />
                    {(n.hub || isActive) && (
                      <text
                        x="1.4"
                        y="0.5"
                        fontSize="1.6"
                        fill="white"
                        opacity={isActive ? 1 : 0.7}
                        style={{ fontWeight: 500 }}
                      >
                        {n.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-5 border-t border-background/10 px-5 py-3 text-xs text-background/60 sm:px-8">
            <LegendItem color="hsl(24 95% 56%)" label="Air" />
            <LegendItem color="hsl(200 80% 60%)" label="Ocean" />
            <LegendItem color="hsl(160 60% 55%)" label="Land" />
            <span className="ml-auto hidden sm:inline">
              {hovered ? nodeMap[hovered]?.name : 'Hover a hub to trace routes'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

/** Stylized dotted continents using small circles positioned to evoke a world map */
function WorldDots() {
  const dots: { x: number; y: number }[] = [];
  const continents = [
    { x: [10, 28], y: [25, 55] }, // N America
    { x: [16, 32], y: [55, 75] }, // S America
    { x: [45, 58], y: [28, 58] }, // Europe + Africa upper
    { x: [48, 58], y: [58, 78] }, // Africa lower
    { x: [62, 88], y: [32, 52] }, // Asia
    { x: [78, 92], y: [70, 82] }, // Oceania
  ];
  continents.forEach((c, continentIndex) => {
    let pointIndex = 0;
    for (let x = c.x[0]; x <= c.x[1]; x += 1.6) {
      for (let y = c.y[0]; y <= c.y[1]; y += 1.6) {
        // Deterministic pattern: never use Math.random() during render.
        // This keeps the server and browser HTML identical during hydration.
        const keep = (pointIndex * 17 + continentIndex * 11) % 20 >= 7;
        if (keep) dots.push({ x, y });
        pointIndex++;
      }
    }
  });
  return (
    <>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="0.22" />
      ))}
    </>
  );
}
