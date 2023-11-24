import {getUserProfile} from "@/lib/api";
import {cookies} from "next/headers";
import UserDropdownMenu from "../navigation/sub/UserDropdownMenu";
import SigninButton from "./sub/SigninButton";

export default async function AuthButton() {
  const tokenCookieObject = cookies().get("accessToken");
  const usernameCookieObject = cookies().get("username");

  const accessToken = tokenCookieObject ? tokenCookieObject.value : null;
  const username = usernameCookieObject ? usernameCookieObject.value : null;

  if (
    typeof accessToken === "string" &&
    typeof username === "string" &&
    accessToken &&
    username
  ) {
    const response = await getUserProfile({accessToken, username});
    if (response) {
      return (
        <UserDropdownMenu
          profileImage={response.avatar}
          username={response.name}
          credits={response.credits}
        />
      );
    }
  } else {
    return <SigninButton />;
  }
}
