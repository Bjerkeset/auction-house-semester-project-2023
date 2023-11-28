"use client";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {bidOnListing} from "@/lib/api";
import {revalidatePath} from "next/cache";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type Props = {
  currentPrice: number;
  listingId: string;
};

export default function BidSubmitForm({currentPrice, listingId}: Props) {
  const defaultPrice = Math.round(currentPrice + currentPrice * 0.05);

  const formSchema = z.object({
    bid: z
      .string()
      .min(1, "Bid must not be empty") // Ensure the string is not empty
      .transform((value) => parseFloat(value)) // Transform the string to a number
      .refine((value) => !isNaN(value), "Bid must be a number") // Ensure the value is a number
      .refine(
        (value) => value >= defaultPrice,
        `Bid must be at least 5% higher then the last bid ${defaultPrice}`
      ), // Ensure the bid is higher than defaultPrice
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bid: defaultPrice,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const bid = values.bid;
    const bidAmount = bid ? Number(bid) : defaultPrice;
    try {
      await bidOnListing(listingId, bidAmount);
    } catch (error) {
      console.log(error);
    }
    console.log(values);
  }

  const {setValue} = form; // Destructure the setValue function from useForm

  // Function to update the bid value
  const updateBidValue = (percentageIncrease: number) => {
    const newBid = Math.round(currentPrice + currentPrice * percentageIncrease);
    setValue("bid", newBid.toString() as any);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full justify-center gap-1"
      >
        <div className="flex w-1/2 items-end gap-1 ">
          <FormField
            control={form.control}
            name="bid"
            render={({field}) => (
              <FormItem>
                <FormMessage />
                <FormControl>
                  <Input
                    className="text-lg w-full text-center"
                    type="number"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="button" // Set the button type as 'button'
            variant="outline"
            onClick={() => updateBidValue(0.1)} // +10% button
          >
            +10%
          </Button>
          <Button
            type="button" // Set the button type as 'button'
            variant="outline"
            onClick={() => updateBidValue(0.2)} // +20% button
          >
            +20%
          </Button>
        </div>
        <Button className="self-end w-1/2" variant="default" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

{
  /* <div className=" flex w-1/2 ">
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
</Button> */
}
