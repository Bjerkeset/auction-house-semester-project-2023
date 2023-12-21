import React from "react";
import AuctionItemCard from "@/components/shared/reusable/auction-item-card/AuctionItemCard";
import {getMarketItems, getUsernameAndAccessToken} from "@/lib/api";
import FilterByAuthor from "./sub/FilterByAuthor";
import FilterByTag from "@/components/pages/listings/feed/sub/FilterByTag";
import SearchInput from "./sub/SearchInput";
import {MarketItem} from "@/constants/types";

type Props = {
  SearchParamsUrl: string;
};

// This component is used to filter the listings by tag, author, or title.
// It fetches the market items from the API and updates state using the URL.
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

  const authorSegment = pathSegments.find((segment) => segment.startsWith("&"));
  const titleSegment = pathSegments.find((segment) =>
    segment.startsWith(titleIndicator)
  );

  if (!titleSegment && !authorSegment) {
    tagFilterValue = pathSegments[pathSegments.length - 1];
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
  if (titleFilterValue && titleFilterValue !== "all") {
    displayedMarketItems = allMarketItems.filter(
      (item) =>
        titleFilterValue &&
        item.title.toLowerCase() === titleFilterValue.toLowerCase()
    );
  } else if (authorFilterValue && authorFilterValue !== "all") {
    displayedMarketItems = allMarketItems.filter(
      (item) => item.seller && item.seller.name === authorFilterValue
    );
  } else if (tagFilterValue && tagFilterValue !== "all") {
    // Fetch market items for the selected tag
    displayedMarketItems = await getMarketItems(tagFilterValue);
  } else {
    // No filter or "All" filter is applied
    displayedMarketItems = [...allMarketItems];
  }

  // Gather unique tags and sellers from all market items
  const allTags = Array.from(
    new Set(allMarketItems.flatMap((item) => item.tags))
  );

  const allSellers = Array.from(
    new Set(
      allMarketItems
        .map((item) => item.seller?.name)
        .filter((name): name is string => !!name)
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
