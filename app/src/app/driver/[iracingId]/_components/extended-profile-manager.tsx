"use client";

import type { Category } from "@season-summary/config";
import { ExtendedProfileNoData } from "./extended-profile-no-data";
import type { Session } from "next-auth";
import { EnhancedView } from "./extended/enhanced-view";
import { categoryToName } from "@season-summary/config";
import { useDataStatusToast } from "../_hooks/use-data-status-toast";
import { useDataWebSocket } from "@/hooks/use-data-web-socket";
import { useMemo } from "react";
import { useNoAccountToast } from "../_hooks/use-no-account-toast";

interface Props {
  iracingId: string;
  season: string;
  year: string;
  category: Category;
  wsUrl: string;
  simpleData: any;
  session: Session | null;
}

export const ExtendedProfileManager = ({
  iracingId,
  season,
  year,
  category,
  wsUrl,
  simpleData,
  session,
}: Props) => {
  const wsData = useDataWebSocket({
    iracingId: parseInt(iracingId, 10),
    year: parseInt(year, 10),
    season: parseInt(season, 10),
    category,
    wsUrl,
  });

  const description = useMemo(() => {
    if (wsData?.status === "DONE-MAINTENANCE") return undefined;

    if (!wsData?.message?.count) return "Requesting data...";

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsData?.status]);

  useDataStatusToast(wsData);
  useNoAccountToast(session);

  // TODO: Add maintenance stats
  if (wsData?.status === "DONE-MAINTENANCE") {
    return <div>iRacing is currently under maintenance. Check back later.</div>;
  }

  if (wsData?.status === "DONE" && !wsData?.message?.data) {
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

      <EnhancedView
        data={wsData?.message?.data}
        iracingId={iracingId}
        season={season}
        year={year}
        category={category}
        simpleData={simpleData}
        isDone={
          wsData?.status === "DONE" || wsData?.status === "DONE-MAINTENANCE"
        }
      />
    </div>
  );
};
