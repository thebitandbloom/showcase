import HeroShowcase from '@/components/sections/hero-showcase';
import AboutPhilosophy from '@/components/sections/about-philosophy';
import BoutiqueProcess from '@/components/sections/boutique-process';
import FeaturesGrid from '@/components/sections/features-grid';
import WorkGallery from '@/components/sections/work-gallery';
import ConciergeInquiry from '@/components/sections/concierge-inquiry';
import { MainNav } from '@/components/layout/main-nav';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <MainNav />
      <HeroShowcase />
      <AboutPhilosophy />
      <BoutiqueProcess />
      <FeaturesGrid />
      <WorkGallery />
      <ConciergeInquiry />
    </main>
  );
}
