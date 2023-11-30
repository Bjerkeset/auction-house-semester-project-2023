import MinimizedProvider from "@/components/providers/MinimizedProvider";
import AuctionItemCard from "@/components/shared/reusable/auction-item-card/AuctionItemCard";
import {getMarketItems} from "@/lib/api";
import MaximizedAuctionCard from "@/components/shared/reusable/auction-item-card/MaximizedAuctionCard";

type Props = {};

export default async function ListingsFeedSection({}: Props) {
  const marketItems = await getMarketItems();

  return (
    <section className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
      {marketItems.map((item) => (
        <AuctionItemCard key={item.id} item={item} isMinimized={true} />
      ))}
    </section>
  );
}
//
