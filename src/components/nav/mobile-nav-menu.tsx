import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { MainNavProps } from "./main-nav";
import { Menu } from "lucide-react";
import { NavLink } from "./nav-link";
import { Suspense } from "react";
import { authOptions } from "@/config/auth-options";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { getUserSettings } from "@/server/get-user-settings";

export const ProfileNavLink = async () => {
  const session = await getServerSession(authOptions);
  const userSettings = await getUserSettings(session?.user?.id);

  if (!userSettings?.iracingId) {
    return null;
  }

  return (
    <DropdownMenuItem>
      <Link
        className="w-full p-1"
        href={
          userSettings?.iracingId ? `/driver/${userSettings.iracingId}` : ""
        }
      >
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
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              )
          )}
          <Suspense fallback={null}>
            <ProfileNavLink />
          </Suspense>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
