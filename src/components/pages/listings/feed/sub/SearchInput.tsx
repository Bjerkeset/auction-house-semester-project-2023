"use client";
import {Button} from "@/components/ui/button";
import React from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {MarketItem} from "@/constants/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import MaximizedAuctionCard from "@/components/shared/reusable/auction-item-card/MaximizedAuctionCard";
import {getUsernameAndAccessToken} from "@/lib/api";
import {useRouter} from "next/navigation";

type Props = {
  titles: string[];
  items: MarketItem[];
};
export default function SearchInput({titles, items}: Props) {
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<MarketItem | null>(
    null
  );
  const router = useRouter();

  const {username} = getUsernameAndAccessToken();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleButtonClick = () => {
    setOpen(true);
  };

  const handleClick = (item: MarketItem): void => {
    // Update the URL with the selected title in a path segment format
    // Assuming the title is used as a filter in the URL
    const titleSegment = encodeURIComponent(item.title.replace(/\s+/g, "-"));
    const newUrl = `/listings/&&${titleSegment}`;
    router.push(newUrl);
  };

  return (
    <div className="flex flex-col items-center">
      <p>Search By Title</p>
      <Button
        onClick={handleButtonClick}
        variant="default"
        className="w-[230px] mt-auto"
      >
        <kbd>⌘</kbd>+<kbd>K</kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          {items.length > 0 ? (
            <CommandGroup heading="Titles">
              {items.map((item, index) => (
                <span key={index} onClick={() => handleClick(item)}>
                  <CommandItem>{item.title}</CommandItem>
                </span>
              ))}
            </CommandGroup>
          ) : (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
        </CommandList>
      </CommandDialog>
    </div>
  );
}
