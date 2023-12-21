import {getUserProfile} from "@/lib/api";
import UserDropdownMenu from "../navigation/sub/UserDropdownMenu";
import SigninButton from "./sub/SigninButton";

type Props = {
  accessToken?: string | null;
  username?: string | null;
};

export default async function AuthButton({accessToken, username}: Props) {
  if (accessToken && username) {
    try {
      const response = await getUserProfile();
      return (
        <UserDropdownMenu
          profileImage={response.avatar}
          username={response.name}
          credits={response.credits}
        />
      );
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return <SigninButton />;
    }
  } else {
    return <SigninButton />;
  }
}
