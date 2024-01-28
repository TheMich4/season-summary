import { SidebarProfileCard } from "./sidebar-profile-card";
import { SidebarSectionLabel } from "./sidebar-section-label";
import { SidebarDivider } from "./sidebar-divider";

interface SidebarYourProfileProps {
  name: string;
  iracingId?: string | null;
  avatarUrl?: string;
}

// TODO: Add no profile card
export const SidebarYourProfile = async ({
  name,
  iracingId,
  avatarUrl,
}: SidebarYourProfileProps) => {
  if (!iracingId) {
    return null;
  }

  return (
    <>
      <SidebarSectionLabel>Your Profile</SidebarSectionLabel>

      <SidebarProfileCard
        name={name}
        iracingId={iracingId}
        avatarUrl={avatarUrl}
      />

      <SidebarDivider />
    </>
  );
};
