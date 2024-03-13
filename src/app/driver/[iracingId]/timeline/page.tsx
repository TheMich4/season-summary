import { Categories, type Category } from "@/config/category";
import { DEFAULT_SEASON, DEFAULT_YEAR } from "@/config/iracing";

import { ConfigProvider } from "@/components/providers/config-provider";
import { Suspense } from "react";
import { ProfileLoader } from "../_components/profile-loader";
import { Timeline } from "./_components/timeline";

interface TimelinePageProps {
  params: {
    iracingId: string;
  };
  searchParams: {
    year?: string;
    season?: string;
    category?: string;
  };
}

export default function TimelinePage({
  params: { iracingId },
  searchParams: {
    year = `${DEFAULT_YEAR}`,
    season = `${DEFAULT_SEASON}`,
    category = Categories.ROAD,
  },
}: TimelinePageProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4 2xl:container">
      <Suspense fallback={<ProfileLoader iracingId={iracingId} />}>
        <ConfigProvider>
          <Timeline
            iracingId={iracingId}
            year={year}
            season={season}
            category={category as Category}
          />
        </ConfigProvider>
      </Suspense>
    </div>
  );
}
