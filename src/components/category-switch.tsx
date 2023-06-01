"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { Category, categoryToName } from "@/config/category";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const CategorySwitch = ({
  category,
  iracingId,
  season,
  year,
}: {
  category: Category;
  iracingId: string;
  season: number;
  year: number;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="flex flex-row items-center gap-2 self-center text-3xl font-bold">
        <span className="cursor-pointer ">{`${categoryToName[category]} stats:`}</span>

        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(buttonVariants({ variant: "outline", size: "xs" }))}
          >
            <ChevronDown />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            {Object.entries(categoryToName).map(([cat, catName]) => (
              <DropdownMenuItem asChild>
                <Link
                  key={cat}
                  href={`/driver/${iracingId}?year=${year}&season=${season}&category=${cat}`}
                  className={cn(
                    "w-full",
                    cat === category && "cursor-not-allowed opacity-80"
                  )}
                >
                  {catName}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </span>
    </div>
  );
};
