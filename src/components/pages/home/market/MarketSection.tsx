import {MarketItem} from "@/constants/types";
import CreateListing from "./sub/CreateListing";
import MarketFeed from "./sub/MarketFeed";

type Props = {
  marketItems: MarketItem[];
};
export default function MarketSection({marketItems}: Props) {
  return (
    <section
      id="MarketSection"
      className="min-h-screen mt-[10vh] flex flex-col justify-center"
    >
      <h2 className="text-4xl font-bold text-center mb-10">
        Active Marketplace
      </h2>
      <CreateListing />
      <MarketFeed marketItems={marketItems} />
    </section>
  );
}
