"use client";

import { ToastAction } from "../ui/toast";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

export const FullDataToaster = ({
  iracingId,
  year,
  season,
  category,
  isFetching,
  isFetched,
}) => {
  const { toast } = useToast();
  const router = useRouter();

  console.log({ isFetched, isFetching });

  useEffect(() => {
    if (isFetching) {
    }
    if (isFetched) {
      toast({
        title: "Your full season data is ready!",
        description:
          "You can now see more precise data if you click the button!",
        action: (
          <ToastAction
            altText="Go to full stats"
            onClick={() =>
              router.push(
                `/driver/${iracingId}/full?year=${year}&season=${season}&category=${category}`
              )
            }
          >
            Go to full stats
          </ToastAction>
        ),
      });
    }
  }, [isFetching, isFetched]);

  return <></>;
};
