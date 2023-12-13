"use client";

import { ProfileCard } from "@/components/common/profile-card";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useVisited } from "@/components/providers/visited-provider";

interface VisitedListProps {
  apiUrl: string;
}

export const VisitedList = ({ apiUrl }: VisitedListProps) => {
  const { visited } = useVisited();

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

  if (!visited.length) return null;

  return (
    <div className="w-full md:w-[720px] lg:w-[820px]">
      <div className="text-center text-2xl font-bold md:text-start">
        Recently Visited:
      </div>
      <div className="grid grid-cols-1 gap-2 py-2 md:grid-cols-2">
        {visited
          .filter(({ iracingId, name }) => iracingId && name)
          .slice(0, 10)
          .map(({ iracingId, name }) => (
            <ProfileCard
              avatarUrl={data?.[iracingId]}
              key={iracingId}
              iracingId={iracingId}
              name={name}
            />
          ))}
      </div>
    </div>
  );
};
