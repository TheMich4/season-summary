import { Categories, type Category } from "@/config/category";
import { DEFAULT_SEASON, DEFAULT_YEAR } from "@/config/iracing";

import { ConfigProvider } from "@/components/providers/config-provider";
import { ExtendedProfile } from "./_components/extended-profile";
import { Suspense } from "react";
import { ProfileLoader } from "./_components/profile-loader";

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
    category = Categories.ROAD,
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
