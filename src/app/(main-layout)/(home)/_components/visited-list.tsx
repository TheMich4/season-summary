"use client";

import { ProfileCard } from "@/components/profile-card";
import { useVisited } from "@/components/providers/visited-provider";
import { useVisitedAvatars } from "@/hooks/use-visited-avatars";

interface VisitedListProps {
  apiUrl: string;
}

export const VisitedList = ({ apiUrl }: VisitedListProps) => {
  const { visited } = useVisited();
  const avatars = useVisitedAvatars(apiUrl, visited);

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
              avatarUrl={avatars?.[iracingId]}
              key={iracingId}
              iracingId={iracingId}
              name={name}
            />
          ))}
      </div>
    </div>
  );
};
