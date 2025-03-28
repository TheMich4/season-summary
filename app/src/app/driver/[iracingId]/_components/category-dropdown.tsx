"use client";

import { Categories, categoryToName } from "@season-summary/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Category } from "@season-summary/config";
import { ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { isBeforeSeason } from "@/lib/season";
import { useConfig } from "@/components/providers/config-provider";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

export const CategoryDropdown = () => {
  const searchParams = useSearchParams();
  const { category, updateConfig } = useConfig();

  const options = useMemo(() => {
    const year = searchParams.get("year");
    const season = searchParams.get("season");

    if (!year || !season) {
      return [];
    }

    if (
      isBeforeSeason(
        { year: +year, season: +season },
        { year: 2024, season: 2 },
      )
    ) {
      return [
        Categories.OVAL,
        Categories.ROAD,
        Categories.DIRT_OVAL,
        Categories.DIRT_ROAD,
      ];
    }

    return [
      Categories.OVAL,
      Categories.DIRT_OVAL,
      Categories.DIRT_ROAD,
      Categories.SPORTS_CAR,
      Categories.FORMULA_CAR,
    ];
  }, [searchParams]);

  const handleClick = (category: Category) => {
    updateConfig({ category });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "xs" }),
          "gap-1 bg-background/40 hover:bg-background/50",
        )}
        onClick={console.log}
      >
        <ChevronDown className="size-5" />
        {category && categoryToName[category]}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="light:bg-background">
        {options.map((cat) => {
          const catName = categoryToName[cat as Category];

          return (
            <DropdownMenuItem
              key={catName}
              onClick={() => handleClick(cat as Category)}
            >
              {catName}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
