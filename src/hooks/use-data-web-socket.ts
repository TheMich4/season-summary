import { type Category, categoryToId } from "@/config/category";

import { useMemo } from "react";
import useWebSocket from "react-use-websocket";

export const useDataWebSocket = ({
  wsUrl,
  iracingId,
  year,
  season,
  category,
}: {
  wsUrl: string;
  iracingId: number;
  year: number;
  season: number;
  category: string;
}) => {
  const SOCKET_URL = `${wsUrl}?iracingId=${iracingId}&year=${year}&season=${season}&categoryId=${
    categoryToId[category as Category]
  }`;

  const { lastMessage } = useWebSocket(SOCKET_URL);

  return useMemo(() => {
    if (!lastMessage) return { status: undefined };

    return JSON.parse(lastMessage.data);
  }, [lastMessage]);
};
