"use client";

import { type NavItem } from "./types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  item: NavItem;
}

export const NavLink = ({ item }: NavLinkProps) => {
  const pathname = usePathname();
  // Only compare if href exists, otherwise default to false
  const isActive = item.href ? pathname === item.href : false;

  // If href is undefined, don't render the link
  if (!item.href) {
    return null;
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex items-center rounded-md px-3 py-1.5 text-sm font-medium transition-all",
        isActive
          ? "bg-primary/20 text-primary dark:bg-primary/20 dark:text-primary"
          : "text-slate-600 hover:bg-primary/10 hover:text-primary/90 dark:text-slate-300 dark:hover:bg-primary/10 dark:hover:text-primary",
        item.disabled && "pointer-events-none opacity-60"
      )}
    >
      {/* Active indicator - small dot */}
      {isActive && (
        <span className="absolute -bottom-[1px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary dark:bg-primary"></span>
      )}
      
      {/* Active indicator - sliding line animation on hover */}
      <span className={cn(
        "absolute -bottom-[1px] left-0 h-[2px] w-0 bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40 transition-all group-hover:w-full",
        isActive ? "opacity-0" : "opacity-0 group-hover:opacity-100"
      )}></span>
      
      <span>{item.title}</span>
    </Link>
  );
};
