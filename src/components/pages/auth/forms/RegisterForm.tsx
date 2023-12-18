"use client";

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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import Image from "next/image";
import {useForm} from "react-hook-form";
import {registerSchema} from "@/lib/validation/auth";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import React from "react";
import {cn} from "@/lib/utils";
import {ArrowRight} from "lucide-react";
import {motion} from "framer-motion";
// import {Textarea} from "../ui/textarea";
import {useToast} from "@/components/ui/use-toast";
import {loginUser, registerUser} from "@/lib/api";
import {useRouter} from "next/navigation";

// import {signUpUser} from "@/lib/db";

type Input = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const {toast} = useToast();
  const [formStep, setFormStep] = React.useState(0);

  const form = useForm<Input>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      comfirmPassword: "",
    },
  });

  async function onSubmit(data: Input) {
    if (data.comfirmPassword !== data.password) {
      toast({
        title: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    let firstTwoCharsOfName = data.name.substring(0, 2);

    try {
      // Register the user
      await registerUser({
        email: data.email,
        name: data.name,
        password: data.password,
        avatar: `https://ui-avatars.com/api/?name=${firstTwoCharsOfName}`, // Optional
      });

      // After successful registration, log the user in
      await loginUser({
        email: data.email,
        password: data.password,
      });

      // Show success message and redirect after login
      toast({
        title: "Success",
        description: "Registration and login successful.",
      });

      setTimeout(() => {
        router.push("/", {scroll: false});
      }, 1000);
    } catch (error: any) {
      const errorMessage = error.message || "An error occurred";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }

  async function handleNextStepClick() {
    const isValid = await form.trigger(["email", "name"]);
    if (isValid) {
      setFormStep(1);
    }
  }

  return (
    <Card className="w-[300px]  md:w-[500px] max-w-screen-md">
      <CardHeader className="">
        <CardTitle>Register</CardTitle>
        <CardDescription className="">
          Fill out the form below to Register
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 relative overflow-x-hidden p-2 h-[300px]"
          >
            <motion.div
              className={cn("space-y-3 block", {
                hidden: formStep !== 0,
              })}
              // formStep == 0 => translateX == 0
              // formStep == 1 => translateX == -100%
              animate={{
                translateX: `-${formStep * 100}%`,
              }}
              transition={{
                ease: "easeInOut",
              }}
            >
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>Enter your email address.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="name" {...field} />
                    </FormControl>
                    <FormDescription>Enter your name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            <motion.div
              className={cn("space-y-3 p-2 block", {
                hidden: formStep !== 1, // This will apply 'hidden' class if formStep is not 1
              })}
              animate={{
                // formStep == 0 => translateX == 100%
                // formStep == 1 => translateX == 0
                translateX: `${100 - formStep * 100}%`,
              }}
              // defult style prevents the animation from running on page load.
              style={{
                translateX: `${100 - formStep * 100}%`,
              }}
              transition={{
                ease: "easeInOut",
              }}
            >
              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormDescription>
                      Write a detailed description of the contract.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Comfirm Password */}
              <FormField
                control={form.control}
                name="comfirmPassword"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Comfirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the price of the contract.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            <div className="absolute bottom-0 right-0 ">
              <Button
                type="submit"
                className={cn({
                  hidden: formStep === 0,
                })}
              >
                Submit
              </Button>
              <Button
                type="button"
                className={cn({
                  hidden: formStep === 1,
                })}
                variant={"outline"}
                onClick={handleNextStepClick}
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setFormStep(0);
                }}
                className={cn("ml-2", {
                  hidden: formStep === 0,
                })}
                variant={"outline"}
              >
                Go Back
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
