import {MarketItem} from "@/constants/types/index";
import ProfileAvatar from "../ProfileAvatar";
import CountdownTimer from "./sub/CountdownTimer";
import ProgressBar from "./sub/ProgressBar";
import {Noto_Serif_Display} from "next/font/google";
import ImageCarousel from "./sub/ImageCarousel";
import AuctionBidsList from "./sub/AuctionBidsList";
import {getTimeDifference} from "@/lib/utils";
import CreatedAtDate from "./sub/CreatedAtDate";
import BidSubmit from "./sub/BidSubmit";
import AuctionItemDescription from "./sub/AuctionItemDescription";

type AuctionItemCardProps = {
  item: MarketItem;
};

const NotoSerif = Noto_Serif_Display({subsets: ["latin"]});

export default function AuctionItemCard({item}: AuctionItemCardProps) {
  // Sort bids by amount in descending order
  const sortedBids = item.bids
    ? [...item.bids].sort((a, b) => b.amount - a.amount)
    : [];

  // Get the highest bid, if available
  const highestBid = sortedBids.length > 0 ? sortedBids[0] : null;

  // Now reverse the sorted array for display
  const sortedAndReversedBids = [...sortedBids].reverse();
  //${NotoSerif.className}
  return (
    <article
      className={` flex flex-col-reverse justify-end lg:flex-row-reverse p-4 gap-4 border w-[1000px] max-h-[600px]`}
    >
      <div className="flex flex-col w-full">
        <div className="flex flex-col ">
          <div className="flex justify-between w-full">
            <h2 className="text-4xl font-bold">{item.title.toUpperCase()}</h2>
            <ProfileAvatar
              profileImage={item.seller?.avatar}
              username={item.seller?.name}
            />
          </div>
          <div className="flex flex-col h-full gap-2">
            <AuctionItemDescription description={item.description} />
            <CreatedAtDate createdAt={item.created} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-between h-3/4  ">
          <div className="flex w-full flex-col gap-1 items-center pb-3">
            <span className="text-2xl text-green-400">
              {highestBid?.amount || 0} $
            </span>
            <CountdownTimer endsAt={item.endsAt} />
            <ProgressBar endsAt={item.endsAt} created={item.created} />
          </div>
          <AuctionBidsList bids={sortedAndReversedBids} />
          <BidSubmit
            currentPrice={highestBid?.amount || 0}
            listingId={item.id}
          />
        </div>
      </div>
      <div className="bg-slate-950">
        <ImageCarousel item={item} />
      </div>
    </article>
  );
}
