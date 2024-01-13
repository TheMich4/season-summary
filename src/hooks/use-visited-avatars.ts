"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useVisitedAvatars = (
  apiUrl: string,
  visited: { iracingId: string; name: string }[]
) => {
  const url = useMemo(
    () =>
      `${apiUrl}v2/get-avatars?ids=${visited
        .map(({ iracingId }) => iracingId)
        .join(",")}`,
    [apiUrl, visited]
  );

  const { data } = useQuery({
    queryKey: ["visitedAvatars"],
    queryFn: () => fetch(url).then((r) => r.json()),
    enabled: visited.length > 0,
    staleTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });

  return data;
};
