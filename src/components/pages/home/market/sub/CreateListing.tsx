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
import {getUsernameAndAccessToken} from "@/lib/api";

export default async function CreateListing() {
  const {username, accessToken} = getUsernameAndAccessToken();

  if (!username || !accessToken) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button className=" my-2 w-full">Auction Artwork Now!</Button>
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
