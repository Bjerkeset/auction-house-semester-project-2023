// Import React and useEffect
import React, {useEffect} from "react";

// TechSlideshow.tsx
export default function HeroCarusel() {
  return (
    <div
      className="relative mx-auto overflow-hidden h-50 max-w-8xl"
      style={{transform: "translate3d(0, 0, 0)"}}
    >
      <div
        className="absolute top-0 left-0 h-full w-[2526px]"
        style={{
          transform: "translate3d(0, 0, 0)",
          background:
            "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/collage.jpg)",
        }}
      >
        {/* Movers with custom animations */}
        <div
          className="mover-1 h-full"
          style={{animation: "moveSlideshow 12s linear infinite"}}
        ></div>
        <div
          className="mover-2 h-full opacity-0 transition-opacity ease-out duration-500"
          style={{
            backgroundPosition: "0 -200px",
            animation: "moveSlideshow 15s linear infinite",
          }}
        ></div>
      </div>
    </div>
  );
}
