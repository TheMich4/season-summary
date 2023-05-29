"use client"

import Link from "next/link"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"

import { MainNavProps } from "./main-nav"
import { buttonVariants } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

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
                <DropdownMenuItem>
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "p-1",
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
  )
}
