"use client";
import React from "react";
import {MarketItem} from "@/constants/types";
import {Carousel} from "@material-tailwind/react";
import Image from "next/image";
type Props = {
  item: MarketItem;
};

export default function ImageCarousel({item}: Props) {
  const images: string[] = item.media;
  // Prevents card to expand when clicking the image.
  const stopPropagation = (e: any) => {
    e.stopPropagation();
  };

  // Check if there are images in the array
  return (
    <Carousel
      onClick={stopPropagation}
      className="overflow-hidden cursor-default relative"
    >
      {images.map((image, index) => (
        <Image
          key={index}
          // fill={true}
          // height={{height: "100%"}}
          // width={500}
          // style={{objectFit: "cover"}}
          src={image}
          alt={`image ${index + 1}`}
          fill
          sizes="max-width: 768px 100vw, 768px"
          className="rounded-md object-cover "
          layout="fill"
          objectFit="cover"
        />
      ))}
    </Carousel>
  );
}
