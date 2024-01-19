"use client";

import { Button } from "@/components/ui/button";
import posthog from "posthog-js";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    posthog.capture("error", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-4xl font-bold">Something went wrong!</h1>
      <Button onClick={() => reset()} variant="secondary">
        Try again
      </Button>
    </div>
  );
}
