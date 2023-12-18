import ProfileAvatar from "@/components/shared/reusable/ProfileAvatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {UserProfileResponse} from "@/constants/types";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export default function ProfileCard({user}: {user: UserProfileResponse}) {
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>", user);

  // Determine the number of wins
  const winsCount = Array.isArray(user.wins) ? user.wins.length : 0;

  return (
    <Card className="">
      <CardHeader className="flex justify-between items-center p-4">
        <Avatar className="h-15 w-15">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>AH</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-4">
          <CardTitle>{user.name}</CardTitle>
          <CardDescription className="mx-auto border px-2 py-1">
            Credits: <span className=" text-green-400">{user.credits}</span> $
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex flex-col items-center">
        <p className="text-lg font-bold">Achievements</p>
        <div className="mt-2 flex md:gap-40">
          <p>Total Listings: {user._count.listings}</p>
          <p>Total Wins: {winsCount}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4"></CardFooter>
    </Card>
  );
}
