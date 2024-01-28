"use client";

import { type Category } from "@/config/category";
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
    if (wsStatus === "DONE" && message?.count?.newRaces > 0) {
      window.location.reload();
    }
  }, [message?.count?.newRaces, wsStatus]);

  return null;
};
