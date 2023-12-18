import {UserProfileResponse} from "@/constants/types";
import ProfileCard from "./profileCard/ProfileCard";

export default function Overview({user}: {user: UserProfileResponse}) {
  return (
    <div>
      <ProfileCard user={user} />
    </div>
  );
}
