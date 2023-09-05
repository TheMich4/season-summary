import { DEFAULT_SEASON, DEFAULT_YEAR } from "@/config/iracing";

import { Categories } from "@/config/category";
import { ConfigProvider } from "@/components/providers/config-provider";
import { ExtendedProfile } from "@/displays/extended-profile";
import { ProfileLoader } from "@/components/profile/profile-loader";
import { Suspense } from "react";
import { siteConfig } from "@/config/site";

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
      <div className="text-balance flex w-full flex-col justify-center rounded-md border  border-red-500 p-2 text-center">
        <p className="mb-1 font-bold text-red-500">
          This page is experimental!
        </p>
        <p>
          This page is under development so it will be updated regularly. Please
          come back soon to check new features!
        </p>
        <p>
          If you have any issues, feedback or you would want to see more data
          contact me on{" "}
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-primary"
          >
            Twitter
          </a>
          .
        </p>
      </div>
      <Suspense fallback={<ProfileLoader iracingId={iracingId} />}>
        <ConfigProvider>
          {/* @ts-ignore Server component */}
          <ExtendedProfile
            iracingId={iracingId}
            year={year}
            season={season}
            category={category}
          />
        </ConfigProvider>
      </Suspense>
    </div>
  );
}
