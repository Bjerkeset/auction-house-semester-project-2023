import {Button} from "@/components/ui/button";
import {getUserProfile} from "@/lib/api";
import {cookies} from "next/headers";
import Link from "next/link";
import UserDropdownMenu from "../navigation/sub/UserDropdownMenu";

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
    return (
      <Link href="./auth">
        <Button className="ml-auto">Sign-in</Button>
      </Link>
    );
  }
}
