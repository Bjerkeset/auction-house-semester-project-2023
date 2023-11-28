import CreateListing from "./sub/CreateListing";
import {CreateListingForm} from "./sub/CreateListingForm";
import MarketFeed from "./sub/MarketFeed";
import {DateTimePicker} from "./sub/DateTimePicker";
import {CarouselDefault} from "@/components/shared/reusable/auction-item-card/sub/CarouselDefault";
import Gallery from "@/components/shared/reusable/auction-item-card/sub/Gallery";

export default function MarketSection() {
  return (
    <section className="min-h-screen mt-[10vh] flex flex-col justify-center">
      {/* <CarouselDefault /> */}
      {/* <Gallery /> */}
      <CreateListing />
      <MarketFeed />
    </section>
  );
}
