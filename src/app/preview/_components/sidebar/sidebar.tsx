import { authOptions } from "@/config/auth-options";
import { getUserSettings } from "@/server/get-user-settings";
import { getServerSession } from "next-auth";
import { SidebarSectionLabel } from "./sidebar-section-label";
import { SidebarDivider } from "./sidebar-divider";
import { SidebarProfileCard } from "./sidebar-profile-card";
import { Input } from "@/components/ui/input";
import { SidebarYourProfile } from "./sidebar-your-profile";

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);
  const userSettings = await getUserSettings(session?.user?.id);

  console.log({ session, userSettings });

  if (!session) return null;

  return (
    <div className="hidden h-full min-h-full w-[250px] flex-col gap-2 border-r bg-background/50 p-4 backdrop-blur 2xl:flex">
      <Input placeholder="Search" />

      <SidebarDivider />

      <SidebarYourProfile
        avatarUrl={session.user.image}
        name={session.user.name}
        iracingId={userSettings?.iracingId}
      />
    </div>
  );
};
