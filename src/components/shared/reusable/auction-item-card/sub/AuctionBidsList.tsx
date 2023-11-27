import React from "react";
import {Button} from "@/components/ui/button";
import ProfileAvatar from "../../ProfileAvatar";
import {getUserProfile} from "@/lib/api";
import {cookies} from "next/headers";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {BidderProfileCard} from "./BidderProfileCard";
import {getTimeDifference} from "@/lib/utils";
import {Input} from "@/components/ui/input";
import {ScrollArea} from "@/components/ui/scroll-area";

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
  const tokenCookieObject = cookies().get("accessToken");
  const accessToken = tokenCookieObject ? tokenCookieObject.value : null;

  if (typeof accessToken === "string" && accessToken) {
    const profiles = await Promise.all(
      // Fetch the profile for each bidder to retrieve their avatar.
      bids.map((bid) => getUserProfile({accessToken, username: bid.bidderName}))
    );

    const reversedBids = bids.slice().reverse();
    return (
      <div className="flex max-h-[230px] flex-col gap-2 w-full ">
        {bids.length >= 1 ? (
          <ScrollArea className="">
            {reversedBids.map((bid) => {
              const userProfile = profiles.find(
                (profile) => profile.name === bid.bidderName
              );
              return (
                <div
                  key={bid.id}
                  className="flex w-full justify-evenly items-center gap-2"
                >
                  <BidderProfileCard
                    profilename={bid.bidderName}
                    avatar={userProfile?.avatar || ""}
                    email={userProfile?.email || ""}
                    credits={userProfile?.credits || 0}
                  />
                  <p className="text-green-400 "> {bid.amount} $</p>
                  <p className="text-sm text-muted-foreground">
                    {bid.created
                      ? getTimeDifference(bid.created) + " ago"
                      : "N/A"}
                  </p>
                </div>
              );
            })}
          </ScrollArea>
        ) : (
          <p className=" self-center text-sm text-muted-foreground">
            No bids yet
          </p>
        )}
      </div>
    );
  }
}
