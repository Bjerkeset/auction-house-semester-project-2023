import ListingsFeedSection from "@/components/pages/listings/feed/ListingsFeedSection";

type Props = {};

export default function page({}: Props) {
  return (
    <main className="flex max-w-7xl flex-col items-center w-full mt-[10vh]">
      <ListingsFeedSection />
    </main>
  );
}
