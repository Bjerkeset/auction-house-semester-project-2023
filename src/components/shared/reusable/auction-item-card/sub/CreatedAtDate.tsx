import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import {Button} from "@/components/ui/button";
import {getTimeDifference} from "@/lib/utils";

type Props = {
  createdAt: string;
};

export default function CreatedAtDate({createdAt}: Props) {
  const createdAtDate = new Date(createdAt);
  const readableDate = createdAtDate.toLocaleString();
  return (
    <HoverCard>
      <HoverCardTrigger
        asChild
        className=" flex items-center justify-center text-center"
      >
        <Button className="text-secondary-foreground" variant="link">
          <p className="">
            {createdAt
              ? "Created: " + getTimeDifference(createdAt) + " ago"
              : "N/A"}
          </p>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-full">
        <p> {readableDate} </p>
      </HoverCardContent>
    </HoverCard>
  );
}
