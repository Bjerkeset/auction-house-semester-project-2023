import Filter from "@/components/pages/listings/feed/sub/FilterByTag";
import ListingsFeedSection from "@/components/pages/listings/feed/ListingsFeedSection";
import FramerMotionProvider from "@/components/providers/FramerMotionProvider";
import MotionListingCard from "@/components/providers/MotionListingsCard";

type SearchParams = {
  url: string;
};

type Props = {
  params: SearchParams;
};

export default function Page({params}: Props) {
  // Get the url filter prams
  const {url} = params;

  return (
    <FramerMotionProvider>
      <main className="flex max-w-7xl flex-col items-center w-full mt-[10vh]">
        <ListingsFeedSection SearchParamsUrl={url} />
      </main>
    </FramerMotionProvider>
  );
}
