"use client";

import { Category, categoryToName } from "@/config/category";
import { ReactNode, useEffect, useMemo, useState } from "react";

import { useDataWebSocket } from "@/hooks/use-data-web-socket";
import { ExtendedProfileNoData } from "./extended-profile-no-data";
import { View } from "./extended/view";
import { updateToast, useToast } from "@/components/ui/use-toast";
import { CheckCircle2 } from "lucide-react";

interface Props {
  iracingId: string;
  season: string;
  year: string;
  category: Category;
  wsUrl: string;
  simpleData: any;
}

export const ExtendedProfileManager = ({
  iracingId,
  season,
  year,
  category,
  wsUrl,
  simpleData,
}: Props) => {
  const { toast } = useToast();
  const [toastId, setToastId] = useState<string | undefined>(undefined);

  const { status: wsStatus, message } = useDataWebSocket({
    iracingId: parseInt(iracingId, 10),
    year: parseInt(year, 10),
    season: parseInt(season, 10),
    category,
    wsUrl,
  });

  const description = useMemo(() => {
    if (!message || !message?.count) return "Requesting data...";

    return undefined;
  }, [message]);

  useEffect(() => {
    if (wsStatus === "PROGRESS" && message?.count.fetched > 0) {
      const oldRaces = message?.count.races - message?.count.newRaces;
      const fetchedRaces = oldRaces + message?.count.fetched;
      const percentage = Math.ceil((fetchedRaces / message?.count.races) * 100);
      const description = `Prepared ${fetchedRaces} of ${message?.count.races} races. ${percentage}% done.`;

      if (toastId) {
        updateToast({ id: toastId, description });
      } else {
        const { id } = toast({
          duration: Infinity,
          title: "Your full season data is being prepared!",
          description,
          variant: "default",
        });
        setToastId(id);
      }
    } else if (wsStatus === "DONE" && toastId) {
      updateToast({
        id: toastId,
        title: (
          <span className="flex flex-row items-center gap-2">
            <CheckCircle2 className="size-6 text-green-700" />
            {"Full data is now up to date!"}
          </span>
        ) as any,
        description: "",
        variant: "success",
      });
    }
  }, [message, toast, toastId, wsStatus]);

  if (wsStatus === "DONE" && !message?.data) {
    return (
      <ExtendedProfileNoData
        iracingId={iracingId}
        season={season}
        year={year}
        category={category}
      />
    );
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
      {description && (
        <>
          <p className="font-semibold">
            We are preparing your {categoryToName[category].toLowerCase()} data
            for this season.
          </p>
          <p className="text-muted-foreground">{description}</p>
        </>
      )}

      <View
        data={message?.data}
        iracingId={iracingId}
        season={season}
        year={year}
        category={category}
        simpleData={simpleData}
        isDone={wsStatus === "DONE"}
      />
    </div>
  );
};
