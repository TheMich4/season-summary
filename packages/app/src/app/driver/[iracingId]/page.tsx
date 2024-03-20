import { DEFAULT_SEASON, DEFAULT_YEAR } from "@/config/iracing";

import { Categories } from "@season-summary/config";
import type { Category } from "@season-summary/config";
import { ConfigProvider } from "@/components/providers/config-provider";
import { ExtendedProfile } from "./_components/extended-profile";
import { ProfileLoader } from "./_components/profile-loader";
import { Suspense } from "react";

interface DriverPageProps {
  params: {
    iracingId: string;
  };
  searchParams: {
    year?: string;
    season?: string;
    category?: string;
  };
}

export default function ExtendedPage({
  params: { iracingId },
  searchParams: {
    year = `${DEFAULT_YEAR}`,
    season = `${DEFAULT_SEASON}`,
    category = Categories.SPORTS_CAR,
  },
}: DriverPageProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-4 2xl:container">
      <Suspense fallback={<ProfileLoader iracingId={iracingId} />}>
        <ConfigProvider>
          <ExtendedProfile
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
