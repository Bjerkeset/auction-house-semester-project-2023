import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

type ProfileAvatarProps = {
  profileImage: string;
  username: string;
  credits: number;
};

export default function ProfileAvatar({
  profileImage,
  username,
  credits,
}: ProfileAvatarProps) {
  return (
    <div className="flex items-center gap-2 ">
      <Avatar>
        <AvatarImage src={profileImage} />
        <AvatarFallback></AvatarFallback>
      </Avatar>
      <p className="font-bold text-base"> {username} </p>
    </div>
  );
}
