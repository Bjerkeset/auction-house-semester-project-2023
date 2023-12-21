import React from "react";
import {DataTable} from "./sub/DataTable";
import {getAllListingsByProfile} from "@/lib/api";
import {columns} from "./sub/columns";
import {BidInfo} from "@/constants/types";

export default async function History() {
  let data = await getAllListingsByProfile();

  data = data.map((item) => ({
    ...item,
    isActive: new Date(item.endsAt) > new Date(),
  }));

  // Adding highestBidAmount property to each MarketItem
  data = data.map((item) => ({
    ...item,
    highestBidAmount:
      item.bids && item.bids.length > 0
        ? Math.max(...item.bids.map((bid: BidInfo) => bid.amount))
        : 0,
  }));

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
