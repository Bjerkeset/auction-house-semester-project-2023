import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {bidOnListing} from "@/lib/api";
import {revalidatePath} from "next/cache";

type Props = {
  currentPrice: number;
  listingId: string;
};

export default function BidSubmit({currentPrice, listingId}: Props) {
  const defaultPrice = Math.round(currentPrice + currentPrice * 0.05);

  async function submitForm(formData: FormData) {
    "use server";
    const bid = formData.get("bid");
    const bidAmount = bid ? Number(bid) : defaultPrice;
    bidOnListing(listingId, bidAmount);
    revalidatePath("/");

    console.log("id:", listingId);
    console.log("formData:", formData);
  }
  return (
    <form action={submitForm} className=" flex w-full border ">
      <div className=" flex w-1/2 ">
        <Input
          type="number"
          name="bid"
          className="text-center bg-primary/10 border-0 border-r"
          defaultValue={defaultPrice}
        />
        <Button variant="ghost">+5%</Button>
        <Button variant="ghost">+10%</Button>
      </div>
      <Button className="w-1/2" type="submit">
        Submit Bid
      </Button>
    </form>
  );
}
