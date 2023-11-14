import Link from "next/link";
import Image from "next/image";
import {Button} from "@/components/ui/button";

export default function Topbar() {
  return (
    <nav className="flex justify-between items-center m-1">
      <div className="w-1/6">
        <Image
          src="https://placehold.co/250x250"
          width={25}
          height={25}
          alt="Picture of the author"
        />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="border-primary">
          <Link href="./" className="text-primary">
            HOME
          </Link>
        </Button>
        <Button variant="outline" className="border-primary">
          <Link href="./" className="text-primary">
            AUCTION
          </Link>
        </Button>
      </div>
      <div className="flex w-1/6">
        <Button className="ml-auto">Sign-in</Button>
      </div>
    </nav>
  );
}
