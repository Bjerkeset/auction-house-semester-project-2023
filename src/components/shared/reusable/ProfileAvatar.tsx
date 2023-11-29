import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

type ProfileAvatarProps = {
  profileImage: string | undefined;
  username: string | undefined;
  // credits: number;
};

export default function ProfileAvatar({
  profileImage,
  username,
}: // credits,
ProfileAvatarProps) {
  return (
    <div className="flex items-center gap-1 ">
      <Avatar className="h-8 w-8">
        <AvatarImage className="" src={profileImage} />
        <AvatarFallback></AvatarFallback>
      </Avatar>
      <p className="md:flex hidden text-muted-foreground text-base">
        {username}
      </p>
    </div>
  );
}
