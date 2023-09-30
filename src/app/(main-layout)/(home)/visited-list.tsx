"use client";

import { ProfileCard } from "@/components/common/profile-card";
import { useVisited } from "@/components/providers/visited-provider";

export const VisitedList = () => {
  const { visited } = useVisited();

  if (!visited.length) return null;

  return (
    <div>
      <div className="text-center text-2xl font-bold md:text-start">
        Recently Visited:
      </div>
      <div className="grid grid-cols-1 gap-2 py-2 md:grid-cols-2">
        {visited
          .filter(({ iracingId, name }) => iracingId && name)
          .slice(0, 10)
          .map(({ iracingId, name }) => (
            <ProfileCard key={iracingId} iracingId={iracingId} name={name} />
          ))}
      </div>
    </div>
  );
};
