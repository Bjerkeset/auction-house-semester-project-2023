"use client";
import {Trash2} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {deleteListing} from "@/lib/api";
import {useToast} from "@/components/ui/use-toast";

type Props = {
  listingId: string;
  sessionUsername: string | null;
  ownerUsername: string | undefined;
};

export default function DeleteButton({
  listingId,
  sessionUsername,
  ownerUsername,
}: Props) {
  const {toast} = useToast();

  async function handleClick() {
    try {
      await deleteListing(listingId);
      toast({
        title: "Success",
        description: "Listing deleted successfully",
      });
    } catch (error: any) {
      console.error("Error deleting listing:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  if (sessionUsername === ownerUsername) {
    return (
      <AlertDialog>
        <AlertDialogTrigger className="flex ml-2 my-auto text-muted-foreground ">
          <Trash2 className="h-5 w-5 hover:text-destructive transition duration-200" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              listing and remove all listing data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClick}
              className="hover:bg-destructive hover:text-white transition duration-200"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  } else {
    return null;
  }
}
