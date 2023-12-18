"use client";
import Image from "next/image";
import {motion, useAnimation} from "framer-motion";
import {useEffect, useRef} from "react";

type CarouselImage = {
  title: string;
  url: string;
};

type CarouselProps = {
  images: CarouselImage[];
};

export default function Carousel({images}: CarouselProps) {
  const controls = useAnimation();
  const carouselRef = useRef<HTMLDivElement>(null);

  // Duplicate the images for a continuous loop
  const duplicatedImages = [...images, ...images];

  useEffect(() => {
    const sequence = async () => {
      const cycle = async () => {
        // Measure the width of the carousel for one set of images
        const carouselWidth = carouselRef.current
          ? carouselRef.current.scrollWidth / 2
          : 0;

        await controls.start({
          x: `-${carouselWidth}px`,
          transition: {duration: 100, ease: "linear"},
        });

        // Reset position instantly for continuous loop
        controls.set({x: 0});
      };

      while (true) {
        await cycle();
      }
    };

    sequence();
  }, [controls, duplicatedImages.length]);

  return (
    <div className="flex 2xl:max-w-4xl lg:max-w-3xl md:max-w-2xl sm:max-w-lg max-w-[300px] mx-auto overflow-x-hidden">
      <motion.div
        ref={carouselRef}
        className="flex gap-4"
        initial={{x: 0}}
        animate={controls}
      >
        {duplicatedImages.map((image, index) => (
          <div key={index} className="flex flex-shrink-0 w-[200px]">
            <div className="relative w-full" style={{height: "300px"}}>
              <Image
                src={image.url}
                alt={image.title}
                fill
                className="rounded-md object-cover"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
