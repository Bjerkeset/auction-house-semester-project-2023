"use client";
import React from "react";
import {MarketItem} from "@/constants/types";
import {Carousel} from "@material-tailwind/react";
import Image from "next/image";
import {AspectRatio} from "@/components/ui/aspect-ratio";

type Props = {
  item: MarketItem;
};

export default function ImageCarousel({item}: Props) {
  const images: string[] = item.media;

  // Check if there are images in the array
  return (
    <Carousel>
      {images.map((image, index) => (
        <img
          key={index}
          // fill={true}
          // height={500}
          // width={500}
          src={image}
          alt={`image ${index + 1}`}
          className="h-full w-full object-cover"
        />
      ))}
    </Carousel>
  );
}
