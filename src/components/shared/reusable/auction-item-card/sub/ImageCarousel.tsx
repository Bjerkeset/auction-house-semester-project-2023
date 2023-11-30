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
    <Carousel className="overflow-hidden">
      {images.map((image, index) => (
        <img
          key={index}
          // fill={true}
          // height={{height: "100%"}}
          // width={500}
          style={{objectFit: "cover"}}
          src={image}
          alt={`image ${index + 1}`}
          className="h-full w-auto object-cover"
        />
      ))}
    </Carousel>
  );
}
