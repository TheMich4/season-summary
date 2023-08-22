import { Category, categoryToName } from "@/config/category";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { ChevronDown } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { useConfig } from "../providers/config-provider";

// TODO: Add loader
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
          "gap-1"
        )}
      >
        <ChevronDown className="h-5 w-5" />
        {categoryToName[category]}
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {Object.entries(categoryToName).map(([cat, catName]) => (
          <DropdownMenuItem asChild key={catName}>
            <span onClick={() => handleClick(cat as Category)}>{catName} </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
