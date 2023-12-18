import AuctionItemCard from "@/components/shared/reusable/auction-item-card/AuctionItemCard";
import {MarketItem} from "@/constants/types";

type Props = {
  marketItems: MarketItem[];
};
export default function MarketFeed({marketItems}: Props) {
  return (
    <section className="flex flex-col gap-4">
      {marketItems.map((item) => (
        <AuctionItemCard key={item.id} item={item} isMinimized={false} />
      ))}
    </section>
  );
}
