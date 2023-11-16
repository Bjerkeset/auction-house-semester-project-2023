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
import {signinSchema} from "@/lib/validation/auth";
import {loginUser} from "@/lib/api";

export default function SignInForm() {
  const {toast} = useToast();

  //Define The form default values and use zod validation schema.
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Submit handler.
  async function onSubmit(values: z.infer<typeof signinSchema>) {
    try {
      // Call loginUser with the email and password from the form
      const response = await loginUser({
        email: values.email,
        password: values.password,
      });

      // Handle successful login, e.g., storing the access token, redirecting the user, etc.
      console.log("Login successful:", response);
      toast({
        title: "Login Successful",
        description: "You are now logged in.",
      });

      // You might want to redirect the user or perform other actions upon successful login
      // For example: navigate('/dashboard');
    } catch (error: any) {
      // Handle login failure
      console.error("Login failed:", error);
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="w-[300px] md:w-[500px] max-w-screen-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Complete form to sign in</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your email address here.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>Enter your password here.</FormDescription>
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
