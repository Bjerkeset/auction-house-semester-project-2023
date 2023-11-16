"use client";
import {Button} from "@/components/ui/button";
import {logoutUser} from "@/lib/api";

export default function LogoutButton() {
  const handleLogout = () => {
    logoutUser();
  };

  return (
    <Button className="w-full h-full" onClick={handleLogout}>
      Logout
    </Button>
  );
}
