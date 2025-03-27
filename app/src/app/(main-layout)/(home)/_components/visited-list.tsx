"use client";

import { useVisited } from "@/components/providers/visited-provider";
import { useVisitedAvatars } from "@/hooks/use-visited-avatars";
import { ProfileCardClient } from "./profile-card-client";

interface VisitedListProps {
  apiUrl: string;
}

export const VisitedList = ({ apiUrl }: VisitedListProps) => {
  const { visited } = useVisited();
  const avatars = useVisitedAvatars(apiUrl, visited);

  if (!visited.length) return null;

  const visibleProfiles = visited
    .filter(({ iracingId, name }) => iracingId && name)
    .slice(0, 10);

  return (
    <div className="mx-auto w-full max-w-full">
      <div className="text-center text-2xl font-bold md:text-start">
        Recently Visited:
      </div>
      <div className={`grid gap-2 py-2 ${
        visibleProfiles.length > 1 
          ? "grid-cols-1 sm:grid-cols-2" 
          : "grid-cols-1"
      }`}>
        {visibleProfiles.map(({ iracingId, name }) => (
          <ProfileCardClient
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
