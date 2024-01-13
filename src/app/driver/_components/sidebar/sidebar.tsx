import { SidebarDivider } from "./sidebar-divider";
import { SidebarYourProfile } from "./sidebar-your-profile";
import { SidebarRecentlyVisited } from "./sidebar-recently-visited";
import { env } from "@/env.mjs";
import { getUserSettings } from "@/server/get-user-settings";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth-options";
import { Search } from "@/components/common/search";

// TODO: Add favorites
export const Sidebar = async () => {
  const session = await getServerSession(authOptions);
  const userSettings = await getUserSettings(session?.user?.id);

  return (
    <div className="custom-scrollbar hidden h-full min-h-full w-[300px] flex-col gap-2 overflow-auto border-r bg-background/50 p-4 backdrop-blur 2xl:flex">
      <Search iracingId={userSettings?.iracingId} session={session} />
      <SidebarDivider />

      <SidebarYourProfile
        name={session?.user.name}
        iracingId={userSettings?.iracingId}
        avatarUrl={session?.user.image}
      />

      <SidebarRecentlyVisited apiUrl={env.API_URL} />
    </div>
  );
};
