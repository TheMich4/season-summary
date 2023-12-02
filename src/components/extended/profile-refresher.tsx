"use client";

import { Category } from "@/config/category";
import { useDataWebSocket } from "@/hooks/use-data-web-socket";
import { useEffect } from "react";

interface Props {
  iracingId: number;
  year: number;
  season: number;
  category: Category;
  wsUrl: string;
}

export const ProfileRefresher = ({
  iracingId,
  year,
  season,
  category,
  wsUrl,
}: Props) => {
  const { status: wsStatus, message } = useDataWebSocket({
    iracingId,
    year,
    season,
    category,
    wsUrl,
  });

  useEffect(() => {
    if (wsStatus === "DONE" && message?.newRaces > 0) {
      window.location.reload();
    }
  }, [message?.newRaces, wsStatus]);

  return null;
};
