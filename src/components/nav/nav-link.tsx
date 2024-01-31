import Link from "next/link";
import { type NavItem } from "./types";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const NavLink = ({
  children,
  item,
}: {
  children?: ReactNode;
  item: NavItem;
}) => {
  if (!item.href) {
    return null;
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center text-lg font-semibold sm:text-sm text-nowrap text-muted-foreground hover:text-foreground",
        item.disabled && "cursor-not-allowed opacity-80"
      )}
    >
      {children ?? item.title}
    </Link>
  );
};
