import MarketSection from "@/components/pages/home/market/MarketSection";
import HeroSection from "@/components/pages/home/hero/HeroSection";
import FramerMotionProvider from "@/components/providers/FramerMotionProvider";
import {getMarketItems} from "@/lib/api";

export default async function Home() {
  const marketItems = await getMarketItems();
  return (
    <FramerMotionProvider>
      <main className="flex max-w-7xl flex-col items-center">
        <HeroSection marketItems={marketItems} />
        <MarketSection marketItems={marketItems} />
      </main>
    </FramerMotionProvider>
  );
}
