"use client";

import { type Category, categoryToName } from "@/config/category";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useConfig } from "@/components/providers/config-provider";

export const CategoryDropdown = () => {
  const { category, updateConfig } = useConfig();

  const handleClick = (category: Category) => {
    updateConfig({ category });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "xs" }),
          "gap-1 bg-background/40"
        )}
      >
        <ChevronDown className="size-5" />
        {category && categoryToName[category]}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="light:bg-background">
        {Object.entries(categoryToName).map(([cat, catName]) => (
          <DropdownMenuItem asChild key={catName}>
            <span onClick={() => handleClick(cat as Category)}>{catName} </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
