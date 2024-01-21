import { Categories, Category } from "@/config/category";
import { DEFAULT_SEASON, DEFAULT_YEAR } from "@/config/iracing";

import { ConfigProvider } from "@/components/providers/config-provider";
import { ExtendedProfile } from "./_components/extended-profile";
import { Suspense } from "react";
import { ProfileLoader } from "./_components-old/profile/profile-loader";

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
    <div className="container flex w-full flex-col items-center justify-center gap-4 py-4">
      <Suspense fallback={<ProfileLoader iracingId={iracingId} />}>
        <ConfigProvider>
          {/* @ts-ignore Server component */}
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
