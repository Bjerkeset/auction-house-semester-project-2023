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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {MarketItem} from "@/constants/types";
import {Maximize} from "lucide-react";
import {useState} from "react";

type Props = {
  item: MarketItem;
  highestBid: any;
  sortedAndReversedBids: any;
  sessionUsername: string | null;
  // children: React.ReactNode;
};

export default function MimimizedAuctionCard({
  item,
  highestBid,
  sortedAndReversedBids,
  sessionUsername,
}: // children,
Props) {
  // const [isMinimized, setIsMinimized] = useState(false);
  // const toggleMinimized = () => {
  //   setIsMinimized(!isMinimized);
  //   console.log("isMinimized in MinimizedProvider", isMinimized);
  // };
  // if (!isMinimized)
  return (
    <Dialog>
      <DialogTrigger>
        <Card className="flex flex-col justify-between h-full">
          <CardHeader className="">
            <CardTitle>
              <ImageCarousel item={item} />
              <h2 className="text-2xl font-bold">{item.title.toUpperCase()}</h2>
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="text-2xl text-green-400">
              {highestBid?.amount || 0} $
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="">
              <Tags tags={item.tags} />
            </div>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className=" p-0 sm:max-w-2xl lg:max-w-6xl">
        {/* <DialogHeader> */}
        <DialogDescription className="">
          <MaximizedAuctionCard
            sortedAndReversedBids={sortedAndReversedBids}
            highestBid={highestBid}
            sessionUsername={sessionUsername}
            item={item}
          />
        </DialogDescription>
        {/* </DialogHeader> */}
      </DialogContent>
    </Dialog>
  );
  // else {
  //   return (

  //   );
  // }
}

//onClick={toggleMinimized}>
