"use client";

import { Category, categoryToName } from "@/config/category";
import { useEffect, useMemo } from "react";

import { CategoryDropdown } from "../profile/category-dropdown";
import { SeasonSwitch } from "../profile/season-switch";
import { useDataWebSocket } from "@/hooks/use-data-web-socket";
import { SimpleStat } from "./simple-stat";
import { Counter } from "../common/counter";

interface Props {
  iracingId: string;
  season: string;
  year: string;
  category: Category;
  status: string;
  wsUrl: string;
}

interface PendingStatsProps {
  stats?: {
    races: number;
    wins: number;
    top5: number;
    laps: number;
  };
}

const PendingStat = ({ label, value }: { label: string; value?: number }) => {
  const ValueComponent = useMemo(() => {
    if (value === undefined) return undefined;
    return <Counter value={value} />;
  }, [value]);

  return (
    <SimpleStat
      label={label}
      value={ValueComponent}
      className="w-full md:w-28"
      withSkeleton
    />
  );
};

const PendingStats = ({ stats }: PendingStatsProps) => {
  return (
    <div className="mt-2 grid w-[240px] grid-cols-2 justify-center gap-2 md:flex md:w-fit md:flex-row">
      <PendingStat label="Races" value={stats?.races} />
      <PendingStat label="Wins" value={stats?.wins} />
      <PendingStat label="Top 5" value={stats?.top5} />
      <PendingStat label="Laps" value={stats?.laps} />
    </div>
  );
};

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

  useEffect(() => {
    if (wsStatus === "DONE") {
      window.location.reload();
    }
  }, [wsStatus]);

  const description = useMemo(() => {
    if (!message || !message?.count) return "Requesting data...";

    const { fetched, races } = message.count;

    const percentage = Math.ceil((fetched / races) * 100);
    return `Prepared ${fetched} of ${races} races. ${percentage}% done.`;
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

      <PendingStats stats={message?.stats} />
    </div>
  );
};
