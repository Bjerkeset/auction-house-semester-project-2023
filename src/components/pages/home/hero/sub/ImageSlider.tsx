"use client";
import React, {useState, useEffect, useRef} from "react";
import {CAROUSEL as images} from "@/constants/homepage/carousel";
import Image from "next/image";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import "@/app/(style)/slider.css";

const ImageSlider = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [mouseDownAt, setMouseDownAt] = useState<number>(0);
  const [prevPercentage, setPrevPercentage] = useState<number>(0);

  const handleOnDown = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    const clientX =
      e.type === "mousedown"
        ? (e as React.MouseEvent).clientX
        : (e as React.TouchEvent).touches[0].clientX;
    setMouseDownAt(clientX);
  };

  const handleOnUp = () => {
    setMouseDownAt(0);
    if (trackRef.current) {
      trackRef.current.dataset.prevPercentage =
        trackRef.current.style.transform;
    }
  };

  const handleOnMove = (e: MouseEvent | TouchEvent) => {
    if (mouseDownAt === 0 || !trackRef.current) return;

    const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    const mouseDelta = mouseDownAt - clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    const nextPercentageUnconstrained = prevPercentage + percentage;
    const nextPercentage = Math.max(
      Math.min(nextPercentageUnconstrained, 0),
      -100
    );

    trackRef.current.style.transform = `translate(${nextPercentage}%, -50%)`;

    const images = Array.from(
      trackRef.current.getElementsByClassName("image")
    ) as HTMLElement[];
    images.forEach((image) => {
      image.style.objectPosition = `${100 + nextPercentage}% center`;
    });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (track) {
      window.addEventListener("mousemove", handleOnMove);
      window.addEventListener("touchmove", handleOnMove);
      return () => {
        window.removeEventListener("mousemove", handleOnMove);
        window.removeEventListener("touchmove", handleOnMove);
      };
    }
  }, [mouseDownAt, prevPercentage]);

  return (
    <div className="image-slider-container">
      <div
        ref={trackRef}
        id="image-track"
        className="image-track"
        onMouseDown={handleOnDown}
        onMouseUp={handleOnUp}
        onTouchStart={handleOnDown}
        onTouchEnd={handleOnUp}
      >
        {images.map((image) => (
          <img
            key={image.id}
            src={image.src}
            alt={image.alt}
            className="image"
            draggable="false"
          />
        ))}
      </div>
      {/* Meta links */}
    </div>
  );
};

export default ImageSlider;
