import {getUserProfile, getUsernameAndAccessToken} from "@/lib/api";
import {ScrollArea} from "@/components/ui/scroll-area";
import BidItem from "./BidItem";

type Bid = {
  id: string;
  amount: number;
  bidderName: string;
  created?: string;
};

type Props = {
  bids: Bid[];
};

export default async function AuctionBidsList({bids}: Props) {
  let {accessToken, username} = getUsernameAndAccessToken();
  const sessionUsername = username;

  if (typeof accessToken === "string" && accessToken) {
    const profiles = await Promise.all(
      // Fetch the profile for each bidder to retrieve their avatar.
      bids.map((bid) => getUserProfile())
    );

    const reversedBids = bids.slice().reverse();
    return (
      <div className="flex max-h-[230px] flex-col gap-2 w-full ">
        {bids.length > 0 ? (
          <ScrollArea>
            {reversedBids.map((bid, index) => {
              const userProfile = profiles.find(
                (profile) => profile.name === bid.bidderName
              );

              return (
                <BidItem
                  key={bid.id}
                  bid={bid}
                  userProfile={userProfile}
                  isNew={index === 0} // True for the last (newest) item
                />
              );
            })}
          </ScrollArea>
        ) : (
          <p className="self-center text-sm text-muted-foreground">
            No bids yet
          </p>
        )}
      </div>
    );
  }
}
