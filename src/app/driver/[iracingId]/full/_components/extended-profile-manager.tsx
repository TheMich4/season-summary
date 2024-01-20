"use client";

import { Category, categoryToName } from "@/config/category";
import { useMemo } from "react";

import { useDataWebSocket } from "@/hooks/use-data-web-socket";
import { ExtendedProfileNoData } from "./extended-profile-no-data";
import { View } from "./extended/view";

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

    const { fetched, races } = message.count;

    const percentage = Math.ceil((fetched / races) * 100);
    return `Prepared ${fetched} of ${races} races. ${percentage}% done.`;
  }, [message]);

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
