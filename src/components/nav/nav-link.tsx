import Link from "next/link";
import { NavItem } from "./types";
import { ReactNode } from "react";
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
        "flex items-center text-lg font-semibold text-muted-foreground sm:text-sm",
        item.disabled && "cursor-not-allowed opacity-80"
      )}
    >
      {children ?? item.title}
    </Link>
  );
};
