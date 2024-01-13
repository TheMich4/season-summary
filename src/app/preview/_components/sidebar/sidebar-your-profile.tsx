import { SidebarProfileCard } from "./sidebar-profile-card";
import { SidebarSectionLabel } from "./sidebar-section-label";

interface SidebarYourProfileProps {
  name: string;
  iracingId?: string;
  avatarUrl?: string;
}

// TODO: Add no profile card
export const SidebarYourProfile = ({
  name,
  iracingId,
  avatarUrl,
}: SidebarYourProfileProps) => {
  return (
    <>
      <SidebarSectionLabel>Your Profile</SidebarSectionLabel>

      <SidebarProfileCard
        name={name}
        iracingId={iracingId}
        avatarUrl={avatarUrl}
      />
    </>
  );
};
