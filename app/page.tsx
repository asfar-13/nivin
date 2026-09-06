'use client';

import { LoadingScreen } from '@/components/layout/loading-screen';
import { SmoothScrollProvider } from '@/components/layout/smooth-scroll-provider';
import { ScrollProgress } from '@/components/motion/scroll-progress';
import { CursorInteraction } from '@/components/motion/cursor-interaction';
import { Navbar } from '@/components/layout/navbar';
import { Hero } from '@/components/sections/hero';
import { IntroSection } from '@/components/sections/intro-section';
import { StatsSection } from '@/components/sections/stats-section';
import { FreightShowcase } from '@/components/sections/freight-showcase';
import { ServicesSection } from '@/components/sections/services-section';
import { HorizontalScroll } from '@/components/sections/horizontal-scroll';
import { NetworkSection } from '@/components/sections/network-section';
import { TrackingSection } from '@/components/sections/tracking-section';
import { WhyUsSection } from '@/components/sections/why-us-section';
import { Testimonials } from '@/components/sections/testimonials';
import { Insights } from '@/components/sections/insights';
import { FAQ } from '@/components/sections/faq';
import { CTASection } from '@/components/sections/cta-section';
import { Footer } from '@/components/layout/footer';
import { Marquee } from '@/components/motion/marquee';

export default function Home() {
  return (
    <SmoothScrollProvider>
      <LoadingScreen />
      <CursorInteraction />
      <ScrollProgress />
      <Navbar />
      <main className="relative">
        <Hero />
        <Marquee
          className="border-y border-border bg-background py-4"
          items={[
            'Air Freight',
            'Ocean Freight',
            'Customs Brokerage',
            'Warehousing & 3PL',
            'Project Cargo',
            'Domestic Transport',
          ]}
        />
        <IntroSection />
        <StatsSection />
        <FreightShowcase />
        <ServicesSection />
        <HorizontalScroll />
        
        
        <WhyUsSection />
        
        <Insights />
        
        <CTASection />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
