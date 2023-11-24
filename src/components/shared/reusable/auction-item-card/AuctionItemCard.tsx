import {MarketItem} from "@/constants/types/index";
import ProfileAvatar from "../ProfileAvatar";
import CountdownTimer from "./sub/CountdownTimer";
import ProgressBar from "./sub/ProgressBar";
import {Noto_Serif_Display} from "next/font/google";
import ImageCarousel from "./sub/ImageCarousel";
import AuctionBids from "./sub/AuctionBids";
import {getTimeDifference} from "@/lib/utils";
import CreatedAtDate from "./sub/CreatedAtDate";

type AuctionItemCardProps = {
  item: MarketItem;
};

const NotoSerif = Noto_Serif_Display({subsets: ["latin"]});

export default function AuctionItemCard({item}: AuctionItemCardProps) {
  // console.log("item:", item);
  let latestBid;
  if (item.bids && item.bids.length > 0) {
    latestBid = item.bids[item.bids.length - 1];
  }
  //${NotoSerif.className}
  return (
    <article
      className={` flex flex-col-reverse justify-end lg:flex-row-reverse p-4 gap-4 border w-[1000px]`}
    >
      <div className="flex flex-col w-full">
        <div className="flex flex-col">
          <div className="flex justify-between w-full">
            <h2 className="text-4xl font-bold">{item.title.toUpperCase()}</h2>
            <ProfileAvatar
              profileImage={item.seller?.avatar}
              username={item.seller?.name}
            />
          </div>
          <div className="flex flex-col h-full gap-2">
            <p className="text-muted-foreground  h-full">{item.description}</p>
            <div className="flex justify-end">
              <CreatedAtDate createdAt={item.created} />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 h-3/4 ">
          <CountdownTimer endsAt={item.endsAt} />
          <ProgressBar endsAt={item.endsAt} created={item.created} />
          <p className="text-lg">Current Ask: {latestBid?.amount} $ </p>
          <AuctionBids bids={item.bids || []} />
        </div>
      </div>
      <div className="bg-slate-950">
        <ImageCarousel item={item} />
      </div>
    </article>
  );
}
