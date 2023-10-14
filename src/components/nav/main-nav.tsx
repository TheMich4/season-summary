import * as React from "react";

import { Icons } from "@/components/icons";
import Link from "next/link";
import { MobileNavMenu } from "./mobile-nav-menu";
import { NavItem } from "./types";
import { NavLink } from "./nav-link";
import { ProfileNavLink } from "./profile-nav-link";
import { siteConfig } from "@/config/site";

export interface MainNavProps {
  items: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <MobileNavMenu items={items} />
      <Link
        href="/"
        className="hidden items-center space-x-2 dark:text-primary md:flex"
      >
        <Icons.home className="h-6 w-6 " />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      <nav className="hidden gap-6 md:flex">
        {items?.map(
          (item, index) => item.href && <NavLink key={index} item={item} />
        )}
        <ProfileNavLink />
      </nav>
    </div>
  );
}
