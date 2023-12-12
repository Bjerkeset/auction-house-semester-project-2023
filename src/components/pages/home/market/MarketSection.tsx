import CreateListing from "./sub/CreateListing";
import MarketFeed from "./sub/MarketFeed";

export default function MarketSection() {
  return (
    <section className="min-h-screen mt-[10vh] flex flex-col justify-center">
      <CreateListing />
      <MarketFeed />
    </section>
  );
}
