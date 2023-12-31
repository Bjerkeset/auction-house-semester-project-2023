import {MarketItem} from "@/constants/types/index";
import ProfileAvatar from "../ProfileAvatar";
import CountdownTimer from "./sub/CountdownTimer";
import ProgressBar from "./sub/ProgressBar";
import {Noto_Serif_Display} from "next/font/google";
import ImageCarousel from "./sub/ImageCarousel";
import AuctionBidsList from "./sub/AuctionBidsList";
import CreatedAtDate from "./sub/CreatedAtDate";
import AuctionItemDescription from "./sub/AuctionItemDescription";
import DeleteButton from "./sub/DeleteButton";
import {cookies} from "next/headers";
import Tags from "./sub/Tags";
import BidSubmitForm from "./sub/BidSubmitForm";
import {Minimize} from "lucide-react";
import MimimizedAuctionCard from "@/components/pages/listings/feed/sub/MimimizedAuctionCard";
import MaximizedAuctionCard from "./MaximizedAuctionCard";
import {getUsernameAndAccessToken} from "@/lib/api";

type AuctionItemCardProps = {
  item: MarketItem;
  isMinimized: boolean;
};
const NotoSerif = Noto_Serif_Display({subsets: ["latin"]});

export default function AuctionItemCard({
  item,
  isMinimized,
}: AuctionItemCardProps) {
  const minimizedStyle = isMinimized ? "" : "";

  let {accessToken, username} = getUsernameAndAccessToken();
  const sessionUsername = username;

  // Sort bids by amount in descending order
  const sortedBids = item.bids
    ? [...item.bids].sort((a, b) => b.amount - a.amount)
    : [];
  // Get the highest bid, if available
  const highestBid = sortedBids.length > 0 ? sortedBids[0] : null;
  // Now reverse the sorted array for display
  const sortedAndReversedBids = [...sortedBids].reverse();

  if (isMinimized) {
    return (
      //NOTE:May want to Pass as children to avoid switching MaximizedAuctionCard to client component.
      <MimimizedAuctionCard
        sortedAndReversedBids={sortedAndReversedBids}
        sessionUsername={sessionUsername}
        highestBid={highestBid}
        item={item}
      />
    );
  }

  return (
    <MaximizedAuctionCard
      sortedAndReversedBids={sortedAndReversedBids}
      highestBid={highestBid}
      sessionUsername={sessionUsername}
      item={item}
    />
  );
}
