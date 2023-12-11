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
    <div className="flex justify-end">
      <HoverCard>
        <HoverCardTrigger
          asChild
          className=" flex items-center justify-center text-center"
        >
          <Button className="text-secondary-foreground" variant="link">
            <p className="text-muted-foreground">
              {createdAt
                ? "Created: " + getTimeDifference(createdAt) + " ago"
                : "N/A"}
            </p>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-full">
          <p> Created At: {readableDate} </p>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
