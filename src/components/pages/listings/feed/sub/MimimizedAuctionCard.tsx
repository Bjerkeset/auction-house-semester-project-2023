import MaximizedAuctionCard from "@/components/shared/reusable/auction-item-card/MaximizedAuctionCard";
import ImageCarousel from "@/components/shared/reusable/auction-item-card/sub/ImageCarousel";
import Tags from "@/components/shared/reusable/auction-item-card/sub/Tags";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import {MarketItem} from "@/constants/types";

type Props = {
  item: MarketItem;
  highestBid: any;
  sortedAndReversedBids: any;
  sessionUsername: string | null;
};

export default function MimimizedAuctionCard({
  item,
  highestBid,
  sortedAndReversedBids,
  sessionUsername,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger>
        <Card className="flex flex-col justify-between min-h-[550px] h-full">
          <CardHeader className="h-full min-h-[300px]">
            <ImageCarousel item={item} />
          </CardHeader>
          <CardContent className="flex flex-col justify-between h-24">
            <h2 className="text-xl font-bold">{item.title.toUpperCase()}</h2>
            <div className="flex items-center text-center justify-between">
              <span className="w-1/3 text-muted-foreground"></span>
              <span className="w-1/3 text-2xl border text-green-400 ">
                {highestBid?.amount || 0} $
              </span>
              <span className="w-1/3 " />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col h-24">
            <div className="">
              <Tags tags={item.tags} />
            </div>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className=" p-0 sm:max-w-2xl lg:max-w-6xl">
        <DialogDescription className="">
          <MaximizedAuctionCard
            sortedAndReversedBids={sortedAndReversedBids}
            highestBid={highestBid}
            sessionUsername={sessionUsername}
            item={item}
          />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
