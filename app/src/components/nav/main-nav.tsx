import * as React from "react";

import { Icons } from "@/components/icons";
import Link from "next/link";
import { MobileNavMenu } from "./mobile-nav-menu";
import { type NavItem } from "./types";
import { NavLink } from "./nav-link";
import { ProfileNavLink } from "./profile-nav-link";
import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import { Calendar } from "lucide-react";

export interface MainNavProps {
  items: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex justify-between gap-2 md:gap-6">
      <MobileNavMenu items={items} />
      <Link 
        href="/" 
        className="group flex items-center gap-2 rounded-md bg-transparent px-2 py-1 transition-all hover:bg-[hsl(47.9,95.8%,53.1%)]/5"
      >
        <div className="relative">
          <div className="absolute -inset-1 -z-10 rounded-full bg-gradient-to-r from-[hsl(47.9,95.8%,53.1%)]/0 to-[hsl(47.9,95.8%,53.1%)]/10 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"></div>
          <Icons.home className="size-6 text-slate-800 transition-colors group-hover:text-[hsl(47.9,95.8%,53.1%)] dark:text-[hsl(47.9,95.8%,53.1%)]/90" />
        </div>
        <span className="inline-block bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text font-bold text-transparent transition-all group-hover:from-[hsl(47.9,95.8%,53.1%)] group-hover:to-yellow-600 dark:from-white dark:to-slate-300 dark:group-hover:from-[hsl(47.9,95.8%,53.1%)] dark:group-hover:to-yellow-400">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="hidden gap-3 md:flex">
        {items?.map(
          (item, index) => item.href && <NavLink key={index} item={item} />,
        )}
        <Suspense fallback={null}>
          <ProfileNavLink />
        </Suspense>
        
        {/* Schedule link with alpha tag */}
        <div className="relative">
          <Link 
            href="/schedule" 
            className="group flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 transition-all hover:bg-[hsl(47.9,95.8%,53.1%)]/10 hover:text-[hsl(47.9,95.8%,53.1%)]/90 dark:text-slate-300 dark:hover:bg-[hsl(47.9,95.8%,53.1%)]/10 dark:hover:text-[hsl(47.9,95.8%,53.1%)]"
          >
            <Calendar className="size-4 text-slate-500 transition-all group-hover:text-[hsl(47.9,95.8%,53.1%)] dark:text-slate-400" />
            <span>Schedule</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
