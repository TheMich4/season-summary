import { Suspense } from "react";
import { Profile } from "@/displays/profile";
import { ProfileLoading } from "@/displays/profile-loading";

import { Categories, Category } from "@/config/category";

interface DriverPageProps {
  params: {
    iracingId: string;
  };
  searchParams: {
    year?: string;
    season?: string;
    category?: Category;
  };
}

export default function DriverPage({
  params: { iracingId },
  searchParams: { year = "2023", season = "2", category = Categories.ROAD },
}: DriverPageProps) {
  return (
    <div className="container flex w-full items-center justify-center gap-2 py-4">
      <Suspense fallback={<ProfileLoading iracingId={iracingId} />}>
        {/* @ts-ignore Server component */}
        <Profile
          iracingId={iracingId}
          year={Number(year)}
          season={Number(season)}
          category={category}
        />
      </Suspense>
    </div>
  );
}