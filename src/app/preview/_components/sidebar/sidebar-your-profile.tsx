import { getServerSession } from "next-auth";
import { SidebarProfileCard } from "./sidebar-profile-card";
import { SidebarSectionLabel } from "./sidebar-section-label";
import { getUserSettings } from "@/server/get-user-settings";
import { authOptions } from "@/config/auth-options";
import { SidebarDivider } from "./sidebar-divider";

interface SidebarYourProfileProps {
  name: string;
  iracingId?: string;
  avatarUrl?: string;
}

// TODO: Add no profile card
export const SidebarYourProfile = async () => {
  const session = await getServerSession(authOptions);
  const userSettings = await getUserSettings(session?.user?.id);

  if (!session) {
    return null;
  }

  return (
    <>
      <SidebarDivider />

      <SidebarSectionLabel>Your Profile</SidebarSectionLabel>

      <SidebarProfileCard
        name={session.user.name}
        iracingId={userSettings?.iracingId}
        avatarUrl={session.user.avatarUrl}
      />
    </>
  );
};
