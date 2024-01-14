"use client";

import { SimpleStat } from "@/components/extended/simple-stat";
import { Badge } from "@/components/ui/badge";
import { Category, categoryToName } from "@/config/category";
import { useMemo } from "react";

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
  const stats = useMemo(() => {
    if (!data) return [];

    return [
      { label: "Races", value: data.stats.races },
      { label: "Wins", value: data.stats.wins },
      { label: "Top 5", value: data.stats.top5 },
      { label: "Laps", value: data.stats.laps },
    ];
  }, [data?.stats]);

  // TODO: Add no data component
  if (!data) return <div>No data for this season</div>;

  console.log({ data, category, x: Object.entries(data) });

  return (
    <div className="flex flex-row gap-2 rounded-md border bg-background/40 p-2 ">
      <div className="flex flex-col gap-2">
        <Badge variant="secondary" className="w-fit rounded-md">
          {categoryToName[category]}
        </Badge>

        <div className="flex flex-row gap-2">
          {stats.map(({ label, value }) => (
            <SimpleStat
              label={label}
              value={value}
              key={label}
              className="w-28"
            />
          ))}
          <SimpleStat
            label="iRating"
            value={data.finalIRating}
            className="w-28"
          />
        </div>
      </div>
    </div>
  );
};

export const DataListSeason = ({ season, data }: DataListSeasonProps) => {
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
