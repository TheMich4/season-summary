import { Categories, Category } from "@/config/category";
import { DEFAULT_SEASON, DEFAULT_YEAR } from "@/config/iracing";

import { ConfigProvider } from "@/components/providers/config-provider";
import { Profile } from "./_components/profile";
import { ProfileLoader } from "@/components/profile/profile-loader";
import { Suspense } from "react";
import { authOptions } from "@/config/auth-options";
import { getServerSession } from "next-auth";
import { getUserSettings } from "@/server/get-user-settings";

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

export default async function DriverPage({
  params: { iracingId },
  searchParams: {
    year = `${DEFAULT_YEAR}`,
    season = `${DEFAULT_SEASON}`,
    category = Categories.ROAD,
  },
}: DriverPageProps) {
  const session = await getServerSession(authOptions);
  const userSettings =
    session?.user && (await getUserSettings(session?.user?.id));

  return (
    <div className="container flex w-full items-center justify-center gap-2 py-4">
      <Suspense fallback={<ProfileLoader iracingId={iracingId} />}>
        <ConfigProvider>
          {/* @ts-ignore Server component */}
          <Profile
            iracingId={iracingId}
            year={Number(year)}
            season={Number(season)}
            category={(userSettings?.favoriteCategory ?? category) as Category}
          />
        </ConfigProvider>
      </Suspense>
    </div>
  );
}
