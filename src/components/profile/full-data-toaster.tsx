"use client";

import { updateToast, useToast } from "../ui/use-toast";
import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { ToastAction } from "../ui/toast";
import { useDataWebSocket } from "@/hooks/use-data-web-socket";
import { useRouter } from "next/navigation";

interface FullDataToasterProps {
  iracingId: number;
  year: number;
  season: number;
  category: string;
  wsUrl: string;
}

export const FullDataToaster = ({
  iracingId,
  year,
  season,
  category,
  wsUrl,
}: FullDataToasterProps) => {
  const URL = `/driver/${iracingId}/full?year=${year}&season=${season}&category=${category}`;

  const { toast } = useToast();
  const router = useRouter();
  const [toastId, setToastId] = useState<string | undefined>(undefined);

  const { status, message } = useDataWebSocket({
    iracingId,
    year,
    season,
    category,
    wsUrl,
  });

  useEffect(() => {
    if (status === "PROGRESS") {
      const oldRaces = message?.races - message?.newRaces;
      const fetchedRaces = oldRaces + message?.fetched;
      const percentage = Math.ceil((fetchedRaces / message?.races) * 100);
      const description = `Prepared ${fetchedRaces} of ${message?.races} races. ${percentage}% done.`;

      if (toastId) {
        updateToast({ id: toastId, description });
      } else {
        const { id } = toast({
          duration: Infinity,
          title: "Your full season data is being prepared!",
          description,
        });
        setToastId(id);
      }
    }
    if (status === "DONE") {
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
  }, [
    status,
    message?.newRaces,
    message?.fetched,
    message?.races,
    toast,
    toastId,
    router,
    URL,
  ]);

  if (status === "DONE") {
    return (
      <Button onClick={() => router.push(URL)}>
        More advanced season stats
      </Button>
    );
  }

  return <></>;
};
