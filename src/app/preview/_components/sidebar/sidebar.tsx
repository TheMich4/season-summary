import { SidebarDivider } from "./sidebar-divider";
import { Input } from "@/components/ui/input";
import { SidebarYourProfile } from "./sidebar-your-profile";
import { SidebarRecentlyVisited } from "./sidebar-recently-visited";
import { env } from "@/env.mjs";

// TODO: Add favorites
export const Sidebar = async () => {
  return (
    <div className="custom-scrollbar hidden h-full min-h-full w-[300px] flex-col gap-2 overflow-auto border-r bg-background/50 p-4 backdrop-blur 2xl:flex">
      <Input placeholder="Search" />

      <SidebarYourProfile />

      <SidebarDivider />

      <SidebarRecentlyVisited apiUrl={env.API_URL} />
    </div>
  );
};
