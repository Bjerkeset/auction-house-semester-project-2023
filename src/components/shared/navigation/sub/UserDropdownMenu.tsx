import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProfileAvatar from "../../reusable/ProfileAvatar";
import Link from "next/link";
import LogoutButton from "../../buttons/LogoutButton";

type UserDropdownMenuProps = {
  profileImage: string;
  username: string;
  credits?: number;
};
export default function UserDropdownMenu({
  profileImage,
  username,
  credits,
}: UserDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-1">
        <ProfileAvatar profileImage={profileImage} username={username} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuLabel className="flex justify-between items-center text-center">
          Balance: <p className="text-base text-green-500">{credits} $</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link className="md:hidden block" href="/dashboard">
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
        </Link>
        <Link className="md:hidden block" href="/listings/15081995">
          <DropdownMenuItem>Listings</DropdownMenuItem>
        </Link>
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
