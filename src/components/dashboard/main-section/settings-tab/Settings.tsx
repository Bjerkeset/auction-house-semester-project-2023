import {UserProfileResponse} from "@/constants/types";
import SettingsForm from "./sub/SettingsForm";

export default function settings({user}: {user: UserProfileResponse}) {
  return (
    <>
      <SettingsForm user={user} />
    </>
  );
}
