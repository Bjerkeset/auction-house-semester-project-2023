import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

type Props = {
  profilename: string;
  avatar: string;
  email: string;
  credits: number;
};

export function BidderProfileCard({
  profilename,
  avatar,
  email,
  credits,
}: Props) {
  return (
    <HoverCard>
      <HoverCardTrigger
        asChild
        className=" flex items-center justify-center text-center"
      >
        <Button variant="link" className="flex gap-2 items-center">
          <Avatar className="sm:hidden lg:block h-8 w-8">
            <AvatarImage src={avatar} />
            <AvatarFallback>WB</AvatarFallback>
          </Avatar>
          <p className="hidden sm:block">{profilename}</p>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-full">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={avatar} />
            <AvatarFallback>WB</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{profilename}</h4>
            <p className="text-sm">{email}</p>
            <div className="flex items-center pt-2">
              <span className="text-xs text-muted-foreground">
                Balance: {credits} $
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
