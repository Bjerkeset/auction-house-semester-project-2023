import React from "react";
import AuctionItemCard from "@/components/shared/reusable/auction-item-card/AuctionItemCard";
import {
  getMarketItems,
  getAllListingsByProfile,
  getUsernameAndAccessToken,
} from "@/lib/api";
import FilterByAuthor from "./sub/FilterByAuthor";
import FilterByTag from "@/components/pages/listings/feed/sub/FilterByTag";
import SearchInput from "./sub/SearchInput";
import {MarketItem} from "@/constants/types";

type Props = {
  SearchParamsUrl: string;
};

export default async function ListingsFeedSection({SearchParamsUrl}: Props) {
  const {accessToken} = getUsernameAndAccessToken();

  // Fetch all market items for filter components
  const allMarketItems = await getMarketItems();
  let displayedMarketItems: MarketItem[] = [];

  // Decode the URL for filter parameters
  const decodedUrl = decodeURIComponent(SearchParamsUrl);
  let titleFilterValue: string | null = null;
  let authorFilterValue: string | null = null;
  let tagFilterValue: string | null = null;
  const titleIndicator = "&&";
  const pathSegments = decodedUrl.split("/");

  console.log("Path Segments:", pathSegments);

  // Extract title, author, and tag from URL if present
  const titleSegment = pathSegments.find((segment) =>
    segment.startsWith(titleIndicator)
  );
  const authorSegment = pathSegments.find((segment) => segment.startsWith("&"));
  if (!titleSegment && !authorSegment) {
    tagFilterValue = pathSegments[1];
  }
  if (titleSegment) {
    titleFilterValue = titleSegment
      .substring(titleIndicator.length)
      .replace(/-/g, " ");
  }
  if (authorSegment) {
    authorFilterValue = authorSegment.substring(1);
  }

  // Determine which filter to apply and fetch market items accordingly
  if (titleFilterValue) {
    displayedMarketItems = allMarketItems.filter(
      (item) => item.title.toLowerCase() === titleFilterValue.toLowerCase()
    );
  } else if (authorFilterValue && authorFilterValue !== "All") {
    displayedMarketItems = allMarketItems.filter(
      (item) => item.seller && item.seller.name === authorFilterValue
    );
  } else if (tagFilterValue) {
    console.log(`Fetching items for tag: ${tagFilterValue}`);
    displayedMarketItems = await getMarketItems(
      `/auction/listings?_tag=${tagFilterValue}`
    );
    console.log("Fetched Market Items:", displayedMarketItems);
  } else {
    displayedMarketItems = [...allMarketItems];
  }

  // Gather unique tags and sellers from all market items
  const allTags = Array.from(
    new Set(allMarketItems.flatMap((item) => item.tags))
  );
  const allSellers = Array.from(
    new Set(
      allMarketItems.map((item) => item.seller?.name).filter((name) => !!name)
    )
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center sm:flex-row sm:justify-between">
        <FilterByTag tags={allTags} />
        <SearchInput titles={allTags} items={allMarketItems} />
        <FilterByAuthor accessToken={accessToken} sellers={allSellers} />
      </div>
      <section className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {displayedMarketItems.map((item) => (
          <AuctionItemCard key={item.id} item={item} isMinimized={true} />
        ))}
      </section>
    </div>
  );
}
