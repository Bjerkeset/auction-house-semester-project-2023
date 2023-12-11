import React from "react";
import {DataTable} from "./sub/DataTable";
import {getAllListingsByProfile} from "@/lib/api";
import {columns} from "./sub/columns";
import {BidInfo} from "@/constants/types";

type Props = {};

export default async function History({}: Props) {
  let data = await getAllListingsByProfile();

  data = data.map((item) => ({
    ...item,
    isActive: new Date(item.endsAt) > new Date(),
    // ... other modifications (like highestBidAmount) if needed
  }));

  // Adding highestBidAmount property to each MarketItem
  data = data.map((item) => ({
    ...item,
    highestBidAmount:
      item.bids && item.bids.length > 0
        ? Math.max(...item.bids.map((bid: BidInfo) => bid.amount))
        : 0,
  }));

  console.log("BiIIIIIIIIIIIIIIDs", data[2].bids);

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
