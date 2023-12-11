import ProfileAvatar from "@/components/shared/reusable/ProfileAvatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {};

export default function ProfileCard({}: Props) {
  return (
    <div>
      <Card>
        <CardHeader className="flex-row bg-blue-gray-500 items-center">
          <div className="mr-auto">
            <ProfileAvatar profileImage={undefined} username={"username"} />
          </div>
          <div>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
