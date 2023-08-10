"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { MainNavProps } from "./main-nav";
import { Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
