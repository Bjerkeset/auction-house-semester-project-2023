import AuctionItemCard from "@/components/shared/reusable/auction-item-card/AuctionItemCard";
import {getMarketItems, getAllListingsByProfile} from "@/lib/api";
import FilterByAuthor from "./FilterByAuthor";
import FilterByTag from "@/components/pages/listings/feed/FilterByTag";

type Props = {
  SearchParamsUrl: string;
};

export default async function ListingsFeedSection({SearchParamsUrl}: Props) {
  console.log("SearchParamsUrl", SearchParamsUrl);
  // Decode the URL
  const decodedUrl = decodeURIComponent(SearchParamsUrl);
  console.log("Decoded URL:", decodedUrl);

  let filteredMarketItems;

  // Split the decoded URL directly by '&'
  const params = decodedUrl ? decodedUrl.split("&") : [];
  const tagParam = params[0];
  const profileParam = params.length > 1 ? params[1] : null;
  console.log("Tag Param:", tagParam, "Profile Param:", profileParam);

  if (tagParam && tagParam !== "main") {
    filteredMarketItems = await getMarketItems(tagParam);
  } else {
    filteredMarketItems = await getMarketItems();
  }

  // Check for profile parameter
  if (profileParam) {
    filteredMarketItems = await getAllListingsByProfile(profileParam);
    console.log("Filtered Market Items:", filteredMarketItems);
  }

  const marketItems = filteredMarketItems || (await getMarketItems());

  // Combine all tags into a single array
  const allTags = marketItems.reduce((acc: string[], item) => {
    const uniqueTags = item.tags.filter((tag) => !acc.includes(tag));
    return [...acc, ...uniqueTags];
  }, [] as string[]);

  // Combine all seller names into a single array
  const allSellers = marketItems.reduce((acc: string[], item) => {
    if (item.seller) {
      const sellerName = item.seller.name;
      if (!acc.includes(sellerName)) {
        acc.push(sellerName);
      }
    }
    return acc;
  }, [] as string[]);

  return (
    <div className="flex flex-col gap-4">
      <FilterByTag tags={allTags} />
      <FilterByAuthor sellers={allSellers} />
      <section className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {marketItems.map((item) => (
          <AuctionItemCard key={item.id} item={item} isMinimized={true} />
        ))}
      </section>
    </div>
  );
}
