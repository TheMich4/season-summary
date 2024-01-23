"use client";

import { Category, categoryToName } from "@/config/category";
import { useEffect, useMemo, useState } from "react";

import { useDataWebSocket } from "@/hooks/use-data-web-socket";
import { ExtendedProfileNoData } from "./extended-profile-no-data";
import { View } from "./extended/view";
import { dismissToast, updateToast, useToast } from "@/components/ui/use-toast";
import { CheckCircle2 } from "lucide-react";
import { SeasonSwitch } from "./season-switch";
import { CategoryDropdown } from "./category-dropdown";

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
    if (wsStatus === "DONE-MAINTENANCE") return undefined;

    if (!message || !message?.count) return "Requesting data...";

    return undefined;
  }, [wsStatus]);

  useEffect(() => {
    if (wsStatus === "DONE-MAINTENANCE") {
      toast({
        title: "iRacing is currently under maintenance.",
      });
    } else if (wsStatus === "PROGRESS" && message?.count.fetched > 0) {
      const oldRaces = message?.count.races - message?.count.newRaces;
      const fetchedRaces = oldRaces + message?.count.fetched;
      const percentage = Math.ceil((fetchedRaces / message?.count.races) * 100);
      const title = "Your full season data is being prepared!";
      const description =
        percentage === 100
          ? "Finishing up."
          : `Prepared ${fetchedRaces} of ${message?.count.races} races. ${percentage}% done.`;
      const duration = Infinity;
      const variant = "default";

      if (toastId) {
        updateToast({ id: toastId, title, description, duration, variant });
      } else {
        const { id } = toast({
          duration,
          title,
          description,
          variant,
        });
        setToastId(id);
      }
    } else if (wsStatus === "DONE" && toastId) {
      updateToast({
        id: toastId,
        title: (
          <span className="flex flex-row items-center gap-2">
            <CheckCircle2 className="size-6 text-green-700" />
            {"Season data is now up to date!"}
          </span>
        ) as any,
        description: "",
        variant: "success",
        duration: 5000,
      });
    }
  }, [wsStatus, message?.count?.fetched, toast, toastId, wsStatus]);

  // Reason: Its supposed to only run when page is changed
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => dismissToast(toastId), []);

  if (wsStatus === "DONE-MAINTENANCE") {
    return <div>iRacing is currently under maintenance. Check back later.</div>;
  }

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
          <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-3">
            <div className="md:col-start-2">
              <SeasonSwitch
                iracingId={iracingId}
                season={+season}
                year={+year}
                category={category}
              />
            </div>
            <div className="order-2 flex items-center justify-self-center md:order-3 md:justify-self-end">
              <CategoryDropdown />
            </div>
          </div>
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
        isDone={wsStatus === "DONE" || wsStatus === "DONE-MAINTENANCE"}
      />
    </div>
  );
};
