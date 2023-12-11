import MarketSection from "@/components/pages/home/market/MarketSection";
import HeroSection from "@/components/pages/home/hero/HeroSection";

export default function Home() {
  return (
    <main className="flex max-w-7xl flex-col items-center">
      <HeroSection />
      <MarketSection />
    </main>
  );
}
