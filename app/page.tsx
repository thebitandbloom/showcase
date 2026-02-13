'use client';

import HeroShowcase from '@/components/sections/hero-showcase';
import AboutPhilosophy from '@/components/sections/about-philosophy';
import BoutiqueProcess from '@/components/sections/boutique-process';
import FeaturesGrid from '@/components/sections/features-grid';
import WorkGallery from '@/components/sections/work-gallery';
import MarqueeScrollerAternative from '@/components/sections/marquee-scroller-alternative';
import ConciergeInquiry from '@/components/sections/concierge-inquiry';
import MainNav from '@/components/layout/main-nav';
import Footer from '@/components/layout/footer';
import { useEffect } from 'react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {

  useEffect(() => {
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  }, []);

  return (
    <main className="min-h-screen flex flex-col space-y-56 bg-background text-foreground selection:bg-foreground selection:text-background">
      <MainNav />
      <HeroShowcase />
      <AboutPhilosophy />
      <BoutiqueProcess {...{start: "center 80%", end: "bottom center", markers: false, scrub: 2 }} />
      <FeaturesGrid />
      <WorkGallery />
      <MarqueeScrollerAternative />
      <ConciergeInquiry />
      <Footer />
    </main>
  );
}
