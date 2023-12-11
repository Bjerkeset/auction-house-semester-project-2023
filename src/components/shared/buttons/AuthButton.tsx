import {getUserProfile} from "@/lib/api";
import {cookies} from "next/headers";
import UserDropdownMenu from "../navigation/sub/UserDropdownMenu";
import SigninButton from "./sub/SigninButton";

export default async function AuthButton() {
  const tokenCookieObject = cookies().get("accessToken");
  const usernameCookieObject = cookies().get("username");

  const accessToken = tokenCookieObject ? tokenCookieObject.value : null;
  const username = usernameCookieObject ? usernameCookieObject.value : null;

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
      // You can decide to return the SigninButton or an error message here
      return <SigninButton />;
    }
  } else {
    return <SigninButton />;
  }
}
