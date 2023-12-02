"use client";

import { Category, categoryToName } from "@/config/category";
import { useEffect, useMemo } from "react";

import { CategoryDropdown } from "../profile/category-dropdown";
import { SeasonSwitch } from "../profile/season-switch";
import { useDataWebSocket } from "@/hooks/use-data-web-socket";

interface Props {
  iracingId: string;
  season: string;
  year: string;
  category: Category;
  status: string;
  wsUrl: string;
}

export const ExtendedPending = ({
  iracingId,
  season,
  year,
  category,
  status,
  wsUrl,
}: Props) => {
  const { status: wsStatus, message } = useDataWebSocket({
    iracingId: parseInt(iracingId, 10),
    year: parseInt(year, 10),
    season: parseInt(season, 10),
    category,
    wsUrl,
  });

  console.log({ status, wsStatus, message });

  useEffect(() => {
    if (wsStatus === "DONE") {
      window.location.reload();
    }
  }, [wsStatus]);

  const description = useMemo(() => {
    if (!message || !message?.fetched) return "Requesting data...";

    const percentage = Math.ceil((message?.fetched / message?.races) * 100);
    return `Prepared ${message?.fetched} of ${message?.races} races. ${percentage}% done.`;
  }, [message]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
      <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-3">
        <div className="md:col-start-2">
          <SeasonSwitch
            iracingId={iracingId}
            season={parseInt(season, 10)}
            year={parseInt(year, 10)}
            category={category}
          />
        </div>
        <div className="order-2 flex items-center justify-self-center md:order-3 md:justify-self-end">
          <CategoryDropdown />
        </div>
      </div>
      <p className="font-semibold">
        We are preparing your {categoryToName[category].toLowerCase()} data for
        this season.
      </p>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
