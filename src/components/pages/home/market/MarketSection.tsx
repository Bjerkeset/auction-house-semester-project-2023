import CreateListing from "./sub/CreateListing";
import {CreateListingForm} from "./sub/CreateListingForm";
import MarketFeed from "./sub/MarketFeed";
import {DateTimePicker} from "./sub/DateTimePicker";

export default function MarketSection() {
  return (
    <section className="min-h-screen mt-[10vh] flex flex-col justify-center">
      <CreateListing />
      <MarketFeed />
    </section>
  );
}
