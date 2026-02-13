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
    <main className="min-h-screen flex flex-col space-y-56 bg-background text-foreground selection:bg-foreground selection:text-background">
      <h1 className="text-9xl font-extrabold italic font-serif text-muted-foreground opacity-20 w-full overflow-hidden">LAYOUTGRAPHICCONSTRUCTION</h1>
      <MainNav />
      <BoutiqueProcess {...{start: "center 80%", end: "bottom 80%", markers: false, scrub: 0.5}} />
      <Footer />
    </main>
  );
}
