import React from "react";
import ProfileAvatar from "../ProfileAvatar";
import {MarketItem} from "@/constants/types";
import DeleteButton from "./sub/DeleteButton";
import AuctionItemDescription from "./sub/AuctionItemDescription";
import CreatedAtDate from "./sub/CreatedAtDate";
import CountdownTimer from "./sub/CountdownTimer";
import ProgressBar from "./sub/ProgressBar";
import AuctionBidsList from "./sub/AuctionBidsList";
import BidSubmitForm from "./sub/BidSubmitForm";
import ImageCarousel from "./sub/ImageCarousel";
import Tags from "./sub/Tags";

type Props = {
  item: MarketItem;
  sessionUsername: string | null;
  highestBid: any;
  sortedAndReversedBids: any;
};

export default function MaximizedAuctionCard({
  item,
  sessionUsername,
  highestBid,
  sortedAndReversedBids,
}: Props) {
  return (
    <article
      className={`flex flex-col-reverse lg:justify-end lg:flex-row-reverse  p-4 gap-4 border lg:w-full lg:h-[600px]`}
    >
      <div className="flex flex-col w-full">
        <div className="flex flex-col ">
          <div className="flex justify-between w-full">
            <h2 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl mr-auto font-bold">
              {item.title.toUpperCase()}
            </h2>
            <ProfileAvatar
              profileImage={item.seller?.avatar}
              username={item.seller?.name}
            />
            <DeleteButton
              listingId={item.id}
              sessionUsername={sessionUsername}
              ownerUsername={item.seller?.name}
            />
          </div>
          <div className="flex flex-col h-full gap-2">
            <AuctionItemDescription description={item.description} />
            <Tags tags={item.tags} />
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
          <BidSubmitForm
            currentPrice={highestBid?.amount || 0}
            listingId={item.id}
            sessionUsername={sessionUsername}
            ownerUsername={item.seller?.name}
          />
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <ImageCarousel item={item} />
      </div>
    </article>
  );
}
