import React from "react";
import {Skeleton} from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex  flex-col  items-center w-screen h-screen mt-[25vh] max-w-7xl">
      <section className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 min-w-full min-h-full ">
        {Array.from({length: 10}).map((_, index) => (
          <Skeleton
            key={index}
            className="min-w-full w-full min-h-[500px] max-h-[550px]"
          />
        ))}
      </section>
    </main>
  );
}
