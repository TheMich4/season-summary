import { getServerSession } from "next-auth";
import { SidebarContent } from "./sidebar-content";
import { getUserSettings } from "@/server/get-user-settings";
/* import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site"; */
import { authOptions } from "@/server/auth";

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);
  const userSettings = await getUserSettings(session?.user?.id);

  return (
    <div className="h-full min-h-full 2xl:w-[300px]">
      <div className="hidden h-full border-r bg-background/50 p-4 backdrop-blur  2xl:flex">
        <SidebarContent session={session} userSettings={userSettings} />
      </div>

      {/* <div className="flex 2xl:hidden">
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="flex flex-row gap-2 dark:text-primary">
                <Icons.home className="size-6 " />
                <span className="inline-block text-nowrap font-bold">
                  {siteConfig.name}
                </span>
              </SheetTitle>
            </SheetHeader>
            <div className="py-8">
              <SidebarContent session={session} userSettings={userSettings} />
            </div>
          </SheetContent>
        </Sheet>
      </div> */}
    </div>
  );
};
