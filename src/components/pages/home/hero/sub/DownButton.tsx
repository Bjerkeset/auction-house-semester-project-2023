"use client";
import {Button} from "@/components/ui/button";
import {motion} from "framer-motion";
import Link from "next/link";
import {MoveDown} from "lucide-react";

export default function DownButton() {
  return (
    <div className="flex justify-center items-center ">
      <Link href="#MarketSection">
        <motion.button
          whileHover={{scale: 1.2}}
          whileTap={{scale: 0.8}}
          onHoverStart={(e) => {}}
          onHoverEnd={(e) => {}}
          className="flex border border-primary hover:bg-primary transition-opacity items-center justify-center w-20 h-20 rounded-full mx-auto "
        >
          <MoveDown className=" text-primary  hover:text-black h-20 w-10" />
        </motion.button>
      </Link>
    </div>
  );
}
