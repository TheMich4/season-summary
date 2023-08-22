import { DEFAULT_SEASON, DEFAULT_YEAR } from "@/config/iracing";

import { Categories } from "@/config/category";
import { ConfigProvider } from "@/components/providers/config-provider";
import { Profile } from "@/displays/profile";
import { ProfileLoader } from "@/components/profile/profile-loader";
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

export default function DriverPage({
  params: { iracingId },
  searchParams: {
    year = `${DEFAULT_YEAR}`,
    season = `${DEFAULT_SEASON}`,
    category = Categories.ROAD,
  },
}: DriverPageProps) {
  return (
    <div className="container flex w-full items-center justify-center gap-2 py-4">
      <Suspense fallback={<ProfileLoader iracingId={iracingId} />}>
        <ConfigProvider>
          {/* @ts-ignore Server component */}
          <Profile
            iracingId={iracingId}
            year={Number(year)}
            season={Number(season)}
            category={category}
          />
        </ConfigProvider>
      </Suspense>
    </div>
  );
}
