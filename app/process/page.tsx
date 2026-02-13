import HeroShowcase from '@/components/sections/hero-showcase';
import AboutPhilosophy from '@/components/sections/about-philosophy';
import BoutiqueProcess from '@/components/sections/boutique-process';
import FeaturesGrid from '@/components/sections/features-grid';
import WorkGallery from '@/components/sections/work-gallery';
import ConciergeInquiry from '@/components/sections/concierge-inquiry';
import MainNav from '@/components/layout/main-nav';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      <MainNav />
      <BoutiqueProcess {...{start: "center 80%", end: "bottom 80%", markers: false, scrub: 0.5}} />
      <Footer />
    </main>
  );
}
