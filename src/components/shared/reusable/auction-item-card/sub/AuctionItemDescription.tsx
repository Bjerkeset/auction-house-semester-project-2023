import {Button} from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type Props = {
  description: string;
};

export default function AuctionItemDescription({description}: Props) {
  return (
    <Collapsible>
      <CollapsibleTrigger>
        <Button variant="link">Read More...</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p className="text-muted-foreground  h-full">{description}</p>
      </CollapsibleContent>
    </Collapsible>
  );
}
