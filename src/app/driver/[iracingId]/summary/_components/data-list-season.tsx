import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Category, categoryToName } from "@/config/category";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface CategoryData {
  finalIRating: number;
  stats: { laps: number; top5: number; wins: number; races: number };
}

interface DataListSeasonProps {
  data: Record<Category, CategoryData | undefined>;
  season: { season: number; year: number };
}

interface CategoryStatsProps {
  data: CategoryData | undefined;
  category: Category;
}

const CategoryStats = ({ data, category }: CategoryStatsProps) => {
  // TODO: Add no data component
  if (!data) return null;

  console.log({ data, category });

  return (
    <div className="rounded-md border p-2">
      <Badge variant="secondary">{categoryToName[category]}</Badge>
    </div>
  );
};

export const DataListSeason = ({ season, data }: DataListSeasonProps) => {
  console.log({ season, data });

  return (
    <div className="flex flex-col gap-2">
      {Object.entries(data).map(([category, categoryData]) => (
        <CategoryStats
          data={categoryData}
          category={category as Category}
          key={category}
        />
      ))}
    </div>
  );
};
