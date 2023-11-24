import AuctionItemCard from "@/components/shared/reusable/auction-item-card/AuctionItemCard";
import {createListing, getMarketItems} from "@/lib/api";

export default async function MarketFeed() {
  const marketItems = await getMarketItems();

  return (
    <section className="flex flex-col gap-4">
      {marketItems.map((item) => (
        <AuctionItemCard key={item.id} item={item} />
      ))}
    </section>
  );
}
