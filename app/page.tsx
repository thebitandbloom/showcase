import HeroShowcase from '@/components/sections/hero-showcase';
import { MainNav } from '@/components/layout/main-nav';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <MainNav />
      <HeroShowcase />
    </main>
  );
}
