import CarouselHeroSection from "./sub/Carousel";
import DownButton from "./sub/DownButton";
import Heading from "./sub/Heading";
import Intro from "./sub/Intro";

export default function HeroSection() {
  return (
    <section className="mt-[5vh] flex flex-col  ">
      <CarouselHeroSection />
      <Heading />
      <Intro />
      <DownButton />
    </section>
  );
}
