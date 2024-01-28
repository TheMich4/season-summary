/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SidebarDivider } from "./sidebar-divider";
import { SidebarYourProfile } from "./sidebar-your-profile";
import { SidebarRecentlyVisited } from "./sidebar-recently-visited";
import { env } from "@/env";
import { type Session } from "next-auth";
import { Search } from "@/components/search";

interface SidebarContentProps {
  session: Session | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        iracingId={userSettings?.iracingId}
        avatarUrl={session?.user.image}
      />

      <SidebarRecentlyVisited apiUrl={env.API_URL} />
    </div>
  );
};
