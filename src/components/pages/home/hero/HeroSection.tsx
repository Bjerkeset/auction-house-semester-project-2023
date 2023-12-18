import {MarketItem} from "@/constants/types";
import Carousel from "./sub/Carousel";
import Heading from "./sub/Heading";
import Intro from "./sub/Intro";

type Props = {
  marketItems: MarketItem[];
};
type CarouselImage = {
  title: string;
  url: string;
};

export default function HeroSection({marketItems}: Props) {
  // Extract media URLs and titles for Carousel
  const carouselImages = marketItems
    .map((item) =>
      item.media[0] ? {title: item.title, url: item.media[0]} : null
    )
    .filter((image): image is CarouselImage => image !== null)
    .slice(0, 10);

  // Transform the marketItems to match the expected structure for Intro
  const introBids = marketItems.flatMap(
    (item) =>
      item.bids?.map((bid) => ({
        title: item.title,
        price: bid.amount,
      })) || []
  );

  // Sort and select the top 4 bids
  const topIntroBids = introBids.sort((a, b) => b.price - a.price).slice(0, 4);

  return (
    <section className="flex flex-col justify-between mt-[10vh] min-h-[90vh]">
      <Carousel images={carouselImages} />
      <Heading />
      <Intro bids={topIntroBids} />
    </section>
  );
}
