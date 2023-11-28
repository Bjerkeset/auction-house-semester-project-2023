"use client";
import {useEffect, useState} from "react";
import {BidderProfileCard} from "./BidderProfileCard";
import {getTimeDifference} from "@/lib/utils";
import {UserProfileResponse} from "@/constants/types";

type Bid = {
  id: string;
  amount: number;
  bidderName: string;
  created?: string;
};

type Props = {
  bid: Bid;
  userProfile: UserProfileResponse | undefined;
  isNew: boolean;
};

export default function BidItem({bid, userProfile, isNew}: Props) {
  const [showNewStyle, setShowNewStyle] = useState(isNew);

  useEffect(() => {
    if (isNew) {
      const timer = setTimeout(() => setShowNewStyle(false), 2000); // Remove 'new' style after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [isNew]);

  return (
    <div
      className={`flex w-full justify-evenly items-center gap-2 ${
        showNewStyle ? "new-bid bg-green-400" : ""
      }`}
    >
      <BidderProfileCard
        profilename={bid.bidderName}
        avatar={userProfile?.avatar || ""}
        email={userProfile?.email || ""}
        credits={userProfile?.credits || 0}
      />
      <p className="text-green-400"> {bid.amount} $</p>
      <p className="text-sm text-muted-foreground">
        {bid.created ? getTimeDifference(bid.created) + " ago" : "N/A"}
      </p>
    </div>
  );
}
