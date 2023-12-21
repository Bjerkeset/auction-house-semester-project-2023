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
  sellers: string[];
  accessToken?: string | null;
};

export default function FilterByAuthor({sellers, accessToken}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  // Extract the seller from the URL pathname
  const pathSegments = pathname.split("/");
  let profilePart = pathSegments[pathSegments.length - 1];
  const profileSegments = profilePart.split("&");
  const sellerFromUrl = profileSegments.length > 1 ? profileSegments[1] : "All";

  const [selectedSeller, setSelectedSeller] = React.useState(sellerFromUrl);

  React.useEffect(() => {
    setSelectedSeller(sellerFromUrl);
  }, [sellerFromUrl]);

  // Filter out undefined values and map to create seller options
  const sellerOptions = [
    {value: "All", label: "All"},
    ...sellers
      .filter((seller): seller is string => !!seller) // Filter out undefined values
      .map((seller) => ({
        value: seller,
        label: seller.charAt(0).toUpperCase() + seller.slice(1),
      })),
  ];

  const handleSelect = (value: string) => {
    setSelectedSeller(value);
    setOpen(false);
    const newPath = value === "All" ? "/listings/all" : `/listings/&${value}`;
    router.push(newPath);
  };

  if (!accessToken) {
    // Api: Get listings by username needs accessToken for some reason...
    return <div className="w-[200px]" />;
  }

  return (
    <div>
      <p>Filter By Author</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selectedSeller || "Select author..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search author..." />
            <CommandEmpty>No author found.</CommandEmpty>
            <ScrollArea className="h-[400px] border-none">
              <CommandGroup>
                {sellerOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${
                        selectedSeller === option.value
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
    </div>
  );
}
