import { authOptions } from "@/config/auth-options";
import { getUserSettings } from "@/server/get-user-settings";
import { getServerSession } from "next-auth";
import { SidebarSectionLabel } from "./sidebar-section-label";
import { SidebarDivider } from "./sidebar-divider";
import { SidebarProfileCard } from "./sidebar-profile-card";

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);
  const userSettings = await getUserSettings(session?.user?.id);

  console.log({ session, userSettings });

  if (!session) return null;

  return (
    <div className="hidden h-full min-h-full w-[250px] flex-col gap-2 border-r bg-background/50 p-4 backdrop-blur 2xl:flex">
      <p className="font-bold">{session?.user?.name}</p>

      <SidebarDivider />

      <SidebarSectionLabel>Your Profile</SidebarSectionLabel>

      <SidebarProfileCard
        name={session?.user?.name}
        iracingId={userSettings?.iracingId}
        avatarUrl={session?.user?.image}
      />
    </div>
  );
};
