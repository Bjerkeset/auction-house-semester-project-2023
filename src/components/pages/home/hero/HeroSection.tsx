import CarouselHeroSection from "./sub/Carousel";

import Heading from "./sub/Heading";
import ImageSlider from "./sub/ImageSlider";
import Intro from "./sub/Intro";

export default function HeroSection() {
  return (
    <section className="mt-[10vh] min-h-[90vh] flex flex-col  ">
      {/* <CarouselHeroSection /> */}
      <ImageSlider />
      <Heading />
      <Intro />
    </section>
  );
}
