import {Button} from "@/components/ui/button";
import {getUserProfile} from "@/lib/api";
import {cookies} from "next/headers";
import Link from "next/link";

export default async function AuthButton() {
  const tokenCookieObject = cookies().get("accessToken");
  const usernameCookieObject = cookies().get("username");

  const accessToken = tokenCookieObject ? tokenCookieObject.value : null;
  const username = usernameCookieObject ? usernameCookieObject.value : null;

  if (typeof accessToken === "string" && typeof username === "string") {
    const response = await getUserProfile({accessToken, username});
    // console.log("Response>>>>", response.name);
    if (response) {
      return (
        <Link href="./auth">
          <div className="ml-auto">{response.name}</div>
        </Link>
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
