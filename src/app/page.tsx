import { Button } from "@/components/ui/button";
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col gap-5">
      <h1>HomePage</h1>
      <Button className="w-max">twp Click Me</Button>
      <Button className="w-max" variant="ghost">
        twp Click Me
      </Button>
    </div>
  );
}
