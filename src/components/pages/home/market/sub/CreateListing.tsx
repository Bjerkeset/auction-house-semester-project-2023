import {createListing} from "@/lib/api";
import {cookies} from "next/headers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {CreateListingForm} from "./CreateListingForm";
import {Button} from "@/components/ui/button";

export default async function CreateListing() {
  const mockData = {
    title: "Vintage Lamp",
    description: "A beautiful vintage lamp in excellent condition.",
    tags: ["vintage", "lamp", "home decor"],
    media: ["https://placehold.co/400"],
    endsAt: new Date().toISOString(), // This sets a current date, you might want to adjust it
  };

  const tokenCookieObject = cookies().get("accessToken");
  const accessToken = tokenCookieObject ? tokenCookieObject.value : null;

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Auction Artwork Now!</Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-screen-md overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle className="flex flex-col pb-8 gap-1 ">
            <h2 className="text-2xl">List your artwork for auction.</h2>
            <p className="text-base text-muted-foreground">
              Set for auction and collectors will bid on your artwork.
            </p>
          </DialogTitle>
          <DialogDescription>
            <CreateListingForm accessToken={accessToken} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
