import Image from "next/image";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {CAROUSEL as images} from "@/constants/homepage/carousel";

export default function Carousel() {
  return (
    <div className="flex gap-4">
      {/* {images.map((image) => (
        <div key={image.id} className=" w-[200px]">
          <AspectRatio ratio={2 / 3}>
            <Image
              src={image.src}
              alt={image.alt}
              className="rounded-md object-cover"
              fill
            />
          </AspectRatio>
        </div>
      ))} */}
    </div>
  );
}
