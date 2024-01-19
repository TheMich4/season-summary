"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Category, categoryToName } from "@/config/category";
import { getProfileUrl } from "@/server/get-profile-url";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { SimpleStat } from "../../full/_components/extended/simple-stat";

interface CategoryData {
  finalIRating: number;
  stats: { laps: number; top5: number; wins: number; races: number };
}

interface DataListSeasonProps {
  data: Record<Category, CategoryData | undefined>;
  season: { season: number; year: number };
  iracingId: string;
}

interface CategoryStatsProps {
  data: CategoryData | undefined;
  category: Category;
  iracingId: string;
  season: { season: number; year: number };
}

const CategoryStats = ({
  data,
  category,
  iracingId,
  season,
}: CategoryStatsProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const stats = useMemo(() => {
    if (!data) return [];

    return [
      { label: "Races", value: data.stats.races },
      { label: "Wins", value: data.stats.wins },
      { label: "Top 5", value: data.stats.top5 },
      { label: "Laps", value: data.stats.laps },
    ];
  }, [data]);

  const handleClick = useCallback(async () => {
    const url = iracingId
      ? await getProfileUrl(`${iracingId}`, {
          category,
          season: season.season,
          year: season.year,
        })
      : pathname;
    router.push(url);
  }, [iracingId, category, season.season, season.year, pathname, router]);

  // TODO: Add no data component
  if (!data) return <div>No data for this season</div>;

  return (
    <div className="flex w-full flex-row justify-between gap-2">
      <div className="flex w-full flex-col gap-2">
        <Badge
          variant="secondary"
          className="w-fit rounded-md bg-background/40"
        >
          {categoryToName[category]}
        </Badge>

        <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 md:flex md:flex-row">
          {stats.map(({ label, value }) => (
            <SimpleStat
              label={label}
              value={value}
              key={label}
              className="w-full md:w-28"
            />
          ))}
          {data.finalIRating > 0 && (
            <SimpleStat
              label="iRating"
              value={data.finalIRating}
              className="w-full md:w-28"
            />
          )}
        </div>
      </div>

      {/* <div className="flex items-center">
        <Link href={"#"} onClick={handleClick}>
          <Button size="sm" variant="secondary" className="bg-background/40">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div> */}
    </div>
  );
};

export const DataListSeason = ({
  season,
  data,
  iracingId,
}: DataListSeasonProps) => {
  if (!data || Object.keys(data).length === 0) {
    return <div>No data for this season.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(data).map(([category, categoryData]) => (
        <CategoryStats
          data={categoryData}
          category={category as Category}
          key={category}
          season={season}
          iracingId={iracingId}
        />
      ))}
    </div>
  );
};
