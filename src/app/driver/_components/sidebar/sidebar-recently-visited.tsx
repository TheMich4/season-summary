"use client";

import { useVisited } from "@/components/providers/visited-provider";
import { SidebarSectionLabel } from "./sidebar-section-label";
import { SidebarProfileCard } from "./sidebar-profile-card";
import { useVisitedAvatars } from "@/hooks/use-visited-avatars";

interface SidebarRecentlyVisitedProps {
  apiUrl: string;
}

export const SidebarRecentlyVisited = ({
  apiUrl,
}: SidebarRecentlyVisitedProps) => {
  const { visited } = useVisited();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const avatars = useVisitedAvatars(apiUrl, visited);

  if (!visited.length) return null;

  return (
    <>
      <SidebarSectionLabel>Recently Visited</SidebarSectionLabel>

      <div className="flex flex-col gap-2">
        {visited
          .filter(({ iracingId, name }) => iracingId && name)
          .slice(0, 5)
          .map(({ iracingId, name }) => (
            <SidebarProfileCard
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              avatarUrl={avatars?.[iracingId]}
              key={iracingId}
              name={name}
              iracingId={iracingId}
            />
          ))}
      </div>
    </>
  );
};
