import { SidebarDivider } from "./sidebar-divider";
import { SidebarYourProfile } from "./sidebar-your-profile";
import { SidebarRecentlyVisited } from "./sidebar-recently-visited";
import { env } from "@/env.mjs";
import { type Session } from "next-auth";
import { Search } from "@/components/search";

interface SidebarContentProps {
  session: Session | null;
  userSettings: any;
}

// TODO: Add favorites
export const SidebarContent = ({
  session,
  userSettings,
}: SidebarContentProps) => {
  return (
    <div className="custom-scrollbar flex size-full flex-col gap-3 overflow-auto">
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
