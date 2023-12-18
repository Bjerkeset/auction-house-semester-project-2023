"use client";
import {Button} from "@/components/ui/button";

type Props = {
  error: Error;
  reset: () => void;
};

export default function error({error, reset}: Props) {
  return (
    <div className="w-screen h-screen flex flex-col items-center gap-6 justify-center">
      <h1 className="md:text-3xl">Something went wrong 🤒</h1>
      <div>
        <pre className="text-xs sm:text-base ">{error.message}</pre>
      </div>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
