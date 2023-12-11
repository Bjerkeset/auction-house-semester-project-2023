import {Badge} from "@/components/ui/badge";

type Props = {
  tags: string[];
};

export default function Tags({tags}: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(
        (tag, index) =>
          index > 0 && (
            <Badge key={index} variant="outline">
              {tag}
            </Badge>
          )
      )}
    </div>
  );
}
