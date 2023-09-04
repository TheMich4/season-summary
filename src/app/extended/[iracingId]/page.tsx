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
    <div className="container flex w-full items-center justify-center gap-2 py-4 flex-col">
      <div className="border rounded-md border-red-500 p-2 w-full justify-center flex  text-balance text-center flex-col">
        <p className="text-red-500 font-bold mb-1">
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
            className="text-primary font-bold"
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
