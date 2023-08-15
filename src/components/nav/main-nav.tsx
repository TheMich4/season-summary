import * as React from "react";

import { Icons } from "@/components/icons";
import Link from "next/link";
import { MobileNavMenu } from "./mobile-nav-menu";
import { NavItem } from "./types";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <MobileNavMenu items={items} />
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.home className="h-6 w-6 " />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-lg font-semibold text-muted-foreground sm:text-sm",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  );
}
