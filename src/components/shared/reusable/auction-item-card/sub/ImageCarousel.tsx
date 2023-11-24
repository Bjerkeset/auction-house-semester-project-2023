"use client";
import React, {useState} from "react";
import {MarketItem} from "@/constants/types";
import Image from "next/image";

type Props = {
  item: MarketItem;
};
export default function ImageCarousel({item}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0); // State to keep track of current image index

  // Function to go to the next image
  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      // If the current image is the last one, go back to the first image
      if (prevIndex === item.media.length - 1) {
        return 0;
      }
      // Otherwise, go to the next image
      return prevIndex + 1;
    });
  };

  // Check if there are images in the array
  if (item.media.length > 0) {
    return (
      <div>
        <Image
          src={item.media[currentIndex]} // Use the current index to access the image
          alt={item.title}
          width={700}
          height={700}
          className="h-full w-auto"
        />
        <button onClick={goToNext}>Next</button>{" "}
        {/* Button to go to the next image */}
      </div>
    );
  }

  // Return null or some placeholder if there are no images
  return null;
}
