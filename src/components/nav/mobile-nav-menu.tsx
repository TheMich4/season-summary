import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { MainNavProps } from "./main-nav";
import { Menu } from "lucide-react";
import { Suspense } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { getUserSettings } from "@/server/get-user-settings";
import { siteConfig } from "@/config/site";
import { getProfileUrl } from "@/server/get-profile-url";
import { authOptions } from "@/server/auth";

export const ProfileNavLink = async () => {
  const session = await getServerSession(authOptions);
  const userSettings = await getUserSettings(session?.user?.id);
  const url = userSettings?.iracingId
    ? await getProfileUrl(userSettings.iracingId)
    : "#";

  if (!userSettings?.iracingId) {
    return null;
  }

  return (
    <DropdownMenuItem>
      <Link className="w-full p-1" href={url}>
        Your Profile
      </Link>
    </DropdownMenuItem>
  );
};

export const MobileNavMenu = ({ items }: MainNavProps) => {
  return (
    <div className="flex self-center md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
        >
          <Menu />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start">
          {items?.map(
            (item, index) =>
              item.href && (
                <DropdownMenuItem key={item.title}>
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "w-full p-1",
                      item.disabled && "cursor-not-allowed opacity-80",
                    )}
                  >
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ),
          )}
          <Suspense fallback={null}>
            <ProfileNavLink />
          </Suspense>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Link href="https://schedule.dyczkowski.dev/">
              <div className="flex flex-row items-center gap-1 dark:text-primary">
                <span>Schedule</span>
                <div className="flex h-[12px] items-center justify-center self-center rounded-sm bg-primary px-1 py-0 text-[0.5rem] text-black">
                  alpha
                </div>
              </div>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="w-full p-1"
            >
              Twitter
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="w-full p-1"
            >
              GitHub
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
