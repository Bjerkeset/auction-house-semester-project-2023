"use client";
import * as React from "react";
import {useRouter} from "next/navigation";
import {Check, ChevronsUpDown} from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import {Popover, PopoverTrigger, PopoverContent} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import {usePathname} from "next/navigation";

type Props = {
  tags: string[];
};

export default function FilterByTag({tags}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  // Extract the tag from the URL pathname, ignoring anything after '&'
  const pathSegments = pathname.split("/");
  let tagFromUrl = pathSegments[pathSegments.length - 1];
  tagFromUrl = tagFromUrl.split("&")[0]; // Get only the part before '&'
  const [selectedValue, setSelectedValue] = React.useState(tagFromUrl || "");

  React.useEffect(() => {
    // Update the selected value when URL changes
    setSelectedValue(tagFromUrl || "");
  }, [tagFromUrl]);

  const tagOptions = tags.map((tag) => ({
    value: tag,
    label:
      tag === "15081995" ? "All" : tag.charAt(0).toUpperCase() + tag.slice(1),
  }));

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setOpen(false);
    router.push(`/listings/${value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedValue === "15081995"
            ? "All"
            : selectedValue || "Select tag..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search tag..." />
          <CommandEmpty>No tag found.</CommandEmpty>
          <ScrollArea className="h-[400px] border-none">
            <CommandGroup>
              {tagOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      selectedValue === option.value
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
