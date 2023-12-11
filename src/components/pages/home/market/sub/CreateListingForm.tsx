"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useFieldArray, useForm} from "react-hook-form";
import * as z from "zod";
import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {TagInput} from "@/components/ui/tags";
import React from "react";
import {toast} from "@/components/ui/use-toast";
import {cn} from "@/lib/utils";
import {DateTimePicker} from "./DateTimePicker";
import {createListing} from "@/lib/api";

type Tag = {
  id: string;
  text: string;
};

const actionListingSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3).max(280),
  topics: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ),
  urls: z.array(
    z.object({
      value: z.string().url({message: "Please enter a valid URL."}).optional(),
    })
  ),
  deadline: z.date({
    required_error: "A deadiline date is required.",
  }),
});

export function CreateListingForm({accessToken}: {accessToken: string | null}) {
  const form = useForm<z.infer<typeof actionListingSchema>>({
    resolver: zodResolver(actionListingSchema),
    defaultValues: {
      title: "",
      description: "",
      topics: [],
      urls: [
        {value: "https://source.unsplash.com/random/900%C3%97700/?painting"},
      ],
    },
  });

  // const [date, setDate] = React.useState(new Date(2023, 0, 1, 12, 0));
  const [deadline, setDeadline] = React.useState(new Date());
  const {fields, append, remove} = useFieldArray({
    name: "urls",
    control: form.control,
  });

  const {control, handleSubmit, setValue, getValues, watch} = form;
  const deadlineValue = watch("deadline", deadline);

  React.useEffect(() => {
    if (deadlineValue !== deadline) {
      setDeadline(deadlineValue);
    }
  }, [deadlineValue, deadline]);

  const onSubmit = async (values: z.infer<typeof actionListingSchema>) => {
    console.log(values);
    console.log("deadline type:", typeof values.deadline);

    // const tokenCookieObject = cookies().get("accessToken");
    // const accessToken = tokenCookieObject ? tokenCookieObject.value : null;

    if (typeof accessToken === "string" && accessToken) {
      try {
        // Format the data to match CreateListingData type
        const formattedData = {
          title: values.title,
          description: values.description,
          tags: values.topics.map((topic) => topic.text),
          media: values.urls
            .map((url) => url.value)
            .filter(
              (value) => typeof value === "string" && value.trim() !== ""
            ) as string[], // Type assertion here
          endsAt: values.deadline.toISOString(),
        };

        // Call createListing with formatted data and accessToken
        const response = await createListing(formattedData, accessToken);
        console.log("Listing created:", response);

        // Handle success (e.g., show success message, redirect, etc.)
        toast({
          title: "Listing Created",
          description: "Your listing has been successfully created.",
        });
      } catch (error: any) {
        console.error("Error creating listing:", error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } else {
      // Handle case when accessToken is not available
      console.error("Access token not found");
      toast({
        title: "Error",
        description: "You must be logged in to create a listing.",
      });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Title Field */}
          <FormField
            control={control}
            name="title"
            render={({field}) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Title of artwork</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Description Field */}
          <FormField
            control={control}
            name="description"
            render={({field}) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  Detailed description of the artwork
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* DateTimePicker Field */}
          <FormField
            control={control}
            name="deadline"
            render={({field}) => (
              <FormItem className="flex flex-col">
                <FormLabel>Deadline of auction</FormLabel>
                <DateTimePicker
                  date={deadline}
                  setDate={(newDate) => {
                    setDeadline(newDate);
                    setValue("deadline", newDate);
                  }}
                />
                <FormDescription>
                  The deadline for collectors to bid on your listing.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* URLs Field */}
          <div>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-end gap-2">
                <FormField
                  control={form.control}
                  name={`urls.${index}.value`}
                  render={({field}) => (
                    <FormItem className="w-full">
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Image URLs
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Add image links to to your auction listing.
                      </FormDescription>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({value: ""})}
            >
              Add URL
            </Button>
          </div>

          {/* Topics Field */}
          <FormField
            control={control}
            name="topics"
            render={({field}) => (
              <FormItem>
                <FormLabel className="flex justify-between">
                  <p>Tags</p> <small>"optional"</small>
                </FormLabel>
                <FormControl>
                  <TagInput
                    placeholder="expressionism, abstract, surrealism"
                    tags={field.value || []}
                    className="sm:min-w-[450px]"
                    setTags={(updatedTags) => {
                      // Update the form state
                      const newTags =
                        typeof updatedTags === "function"
                          ? updatedTags(getValues("topics"))
                          : updatedTags;
                      setValue("topics", newTags as Tag[]);
                    }}
                  />
                </FormControl>
                <FormDescription>Enter a tag and press enter</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
