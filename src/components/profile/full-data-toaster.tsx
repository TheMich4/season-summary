"use client";

import { updateToast, useToast } from "../ui/use-toast";
import { useEffect, useMemo, useState } from "react";

import { Button } from "../ui/button";
import { ToastAction } from "../ui/toast";
import { categoryToId } from "@/config/category";
import { useRouter } from "next/navigation";
import useWebSocket from "react-use-websocket";

const useDataWebSocket = (socketUrl: string) => {
  const { lastMessage } = useWebSocket(socketUrl);

  return useMemo(() => {
    if (!lastMessage) return { status: undefined };

    return JSON.parse(lastMessage.data);
  }, [lastMessage]);
};

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
  const SOCKET_URL = `${wsUrl}?iracingId=${iracingId}&year=${year}&season=${season}&categoryId=${categoryToId[category]}`;

  const { toast } = useToast();
  const router = useRouter();
  const [toastId, setToastId] = useState<string | undefined>(undefined);

  const { status, message } = useDataWebSocket(SOCKET_URL);

  useEffect(() => {
    if (status === "PROGRESS") {
      const percentage = Math.ceil((message?.fetched / message?.races) * 100);
      const description = `Prepared ${message?.fetched} of ${message?.races} races. ${percentage}% done.`;

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
  }, [status, message?.fetched, message?.races, toast, toastId, router, URL]);

  if (status === "DONE") {
    return (
      <Button onClick={() => router.push(URL)}>
        More advanced season stats
      </Button>
    );
  }

  return <></>;
};
