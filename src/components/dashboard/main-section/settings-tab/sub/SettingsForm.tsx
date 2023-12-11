"use client";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {useForm} from "react-hook-form";
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
import {useToast} from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {updateProfileAvatar} from "@/lib/api";
import {UserProfileResponse} from "@/constants/types";

export default function SettingsForm({user}: {user: UserProfileResponse}) {
  const {toast} = useToast();

  const settingsSchema = z.object({
    avatar: z.string().url({message: "Invalid URL."}),
  });

  //Define The form default values and use zod validation schema.
  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      avatar: user.avatar,
    },
  });

  async function onSubmit(values: z.infer<typeof settingsSchema>) {
    try {
      const response = await updateProfileAvatar(values.avatar);

      console.log("Avatar updated:", response);
      toast({
        title: " Success",
        description: "You have changed the avatar.",
      });
    } catch (error: any) {
      console.error("avatar change failed:", error);
      toast({
        title: "Avatar change failed",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="w-[300px] md:w-[500px] max-w-screen-md">
      <CardHeader>
        <CardTitle>Change Avatar</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="avatar"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your New avatar URL here.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
