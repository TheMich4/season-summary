"use client";

import { Button } from "../ui/button";
import { Category } from "@/config/category";
import { ToastAction } from "../ui/toast";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

interface FullDataToasterProps {
  iracingId: number;
  year: number;
  season: number;
  category: string;
  isFetching: boolean;
  isFetched: Category;
}

export const FullDataToaster = ({
  iracingId,
  year,
  season,
  category,
  isFetching,
  isFetched,
}: FullDataToasterProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const URL = `/driver/${iracingId}/full?year=${year}&season=${season}&category=${category}`;

  useEffect(() => {
    if (isFetching || (!isFetching && !isFetched)) {
      toast({
        title: "Your full season data is being prepared!",
        description: "Come back in a few minutes!",
      });
    }
    if (isFetched) {
      toast({
        title: "Your full season data is ready!",
        description:
          "You can now see more precise data if you click the button!",
        action: (
          <ToastAction
            altText="Go to full stats"
            onClick={() => router.push(URL)}
          >
            Go to full stats
          </ToastAction>
        ),
      });
    }
  }, [isFetching, isFetched, toast, router, URL]);

  if (isFetched) {
    return (
      <Button onClick={() => router.push(URL)}>
        More advanced season stats
      </Button>
    );
  }

  return <></>;
};
