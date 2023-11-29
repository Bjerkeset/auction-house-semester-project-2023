import Link from "next/link";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import AuthButton from "../buttons/AuthButton";

export default function Topbar() {
  ///bg-yellow-400/5 border-yellow-400/20
  return (
    <nav className="flex fixed top-0 w-full z-50 p-2 justify-between items-center backdrop-blur-md border-b ">
      <div className=" w-1/6 min-w-[1/6] ">
        {/* <Image
          src="https://placehold.co/250x250"
          width={25}
          height={25}
          alt="Picture of the author"
        /> */}
      </div>
      <div className="flex gap-2 w-1/6 min-w-[1/6] ">
        <Link href="./" className="text-primary">
          <Button variant="outline" className="border-primary w-24">
            HOME
          </Button>
        </Link>
        <Link href="./listings" className="text-primary">
          <Button variant="outline" className="border-primary w-24">
            AUCTION
          </Button>
        </Link>
      </div>
      <div className="flex w-1/6 min-w-max  ">
        <AuthButton />
      </div>
    </nav>
  );
}
