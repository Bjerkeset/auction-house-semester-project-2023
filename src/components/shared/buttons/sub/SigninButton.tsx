"use client";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function SigninButton() {
  const pathname = usePathname();

  if (pathname === "/auth") {
    return null;
  }

  return (
    <Link className="ml-auto" href="./auth">
      <Button>Sign-in</Button>
    </Link>
  );
}
