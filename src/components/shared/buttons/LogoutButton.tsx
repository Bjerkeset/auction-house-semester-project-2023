"use client";
import {Button} from "@/components/ui/button";
import {logoutUser} from "@/lib/api";
import {useRouter} from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = () => {
    logoutUser();
    router.push("/");
  };

  return (
    <Button className="w-full h-full" onClick={handleLogout}>
      Logout
    </Button>
  );
}
