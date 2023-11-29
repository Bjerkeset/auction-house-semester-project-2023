"use client";
import MinimizedProvider from "@/components/providers/MinimizedProvider";
import MaximizedAuctionCard from "@/components/shared/reusable/auction-item-card/MaximizedAuctionCard";
import ImageCarousel from "@/components/shared/reusable/auction-item-card/sub/ImageCarousel";
import Tags from "@/components/shared/reusable/auction-item-card/sub/Tags";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {MarketItem} from "@/constants/types";
import {Maximize} from "lucide-react";
import {useState} from "react";

type Props = {
  item: MarketItem;
  highestBid: any;
  sortedAndReversedBids: any;
  sessionUsername: string | null;
  children: React.ReactNode;
};

export default function MimimizedAuctionCard({
  item,
  highestBid,
  sortedAndReversedBids,
  sessionUsername,
  children,
}: Props) {
  const [isMinimized, setIsMinimized] = useState(false);
  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
    console.log("isMinimized in MinimizedProvider", isMinimized);
  };
  if (!isMinimized)
    return (
      <Card onClick={toggleMinimized}>
        <CardHeader>
          <CardTitle>
            <ImageCarousel item={item} />
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl mr-auto font-bold">
            {item.title.toUpperCase()}
          </h2>
        </CardContent>
        <CardFooter>
          <Tags tags={item.tags} />
          <span className="text-2xl text-green-400">
            {highestBid?.amount || 0} $
          </span>
        </CardFooter>
      </Card>
    );
  else {
    return (
      <span className="col-span-4" onClick={toggleMinimized}>
        {children}
      </span>
    );
  }
}
