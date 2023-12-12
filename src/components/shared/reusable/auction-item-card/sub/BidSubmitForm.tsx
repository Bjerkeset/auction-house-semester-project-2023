"use client";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {bidOnListing} from "@/lib/api";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

type Props = {
  currentPrice: number;
  listingId: string;
  sessionUsername: string | null;
  ownerUsername: string | undefined;
};

export default function BidSubmitForm({
  currentPrice,
  listingId,
  sessionUsername,
  ownerUsername,
}: Props) {
  const defaultPrice = Math.round(currentPrice + currentPrice * 0.05);

  const formSchema = z
    .object({
      bid: z
        .string()
        .min(1, "Bid must not be empty") // Ensure the string is not empty
        .transform((value) => parseFloat(value)) // Transform the string to a number
        .refine((value) => !isNaN(value), "Bid must be a number") // Ensure the value is a number
        .refine(
          (value) => value >= defaultPrice,
          `Bid must be at least 5% higher than the last bid: ${currentPrice}`
        ), // Ensure the bid is higher than defaultPrice
      sessionUsername: z.string(),
      ownerUsername: z.string(),
    })
    .refine((data) => data.sessionUsername !== data.ownerUsername, {
      message: "You cannot bid on your own listing",
      path: ["bid"], // Associate this validation error with the 'bid' field
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bid: defaultPrice,
      sessionUsername: sessionUsername ?? "",
      ownerUsername: ownerUsername ?? "",
    },
  });

  // If the sessionUsername is the same as the ownerUsername, don't render the form
  // or if user is not logged in, don't render the form
  if (sessionUsername === ownerUsername || !sessionUsername) {
    return <div />;
  }

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
        <div className="flex md:w-1/2 items-end gap-1 ">
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
            type="button"
            variant="outline"
            className="w-8 text-xs sm:text-sm sm:w-auto"
            onClick={() => updateBidValue(0.1)} // +10% button
          >
            +10%
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-8 text-xs sm:text-sm sm:w-auto"
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
