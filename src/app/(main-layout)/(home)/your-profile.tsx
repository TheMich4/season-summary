import { Category, categoryToId } from "@/config/category";

import { Loader2 } from "lucide-react";
import { ProfileCard } from "@/components/common/profile-card";
import { SimpleStat } from "@/components/extended/simple-stat";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { authOptions } from "@/config/auth-options";
import { env } from "@/env.mjs";
import { getServerSession } from "next-auth";
import { getUserSettings } from "@/server/get-user-settings";

const NoProfile = () => {
  return (
    <div className="text-center text-xs text-muted-foreground md:text-start">
      {
        "You don't have a profile yet. You can add it in settings after you log in."
      }
    </div>
  );
};

// TODO: Stats for favorite category
// TODO: Add skeleton
// TODO: Add ir and sr
const Stats = async ({
  iracingId,
  category,
}: {
  iracingId: string;
  category: Category;
}) => {
  const response = await fetch(
    `${env.API_URL}v2/get-basic-data?iracingId=${iracingId}&categoryId=${categoryToId[category]}`
  );
  const stats = await response.json();

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
      <SimpleStat
        label="Races"
        value={stats.current.starts}
        previous={stats.previous.starts}
      />
      <SimpleStat
        label="Wins"
        value={stats.current.wins}
        previous={stats.previous.wins}
      />
      <SimpleStat
        label="Top 5"
        value={stats.current.top5}
        previous={stats.previous.top5}
      />
      <SimpleStat
        label="Laps"
        value={stats.current.laps}
        previous={stats.previous.laps}
      />
      <SimpleStat
        label="Avg Start"
        value={stats.current.avgStartPosition}
        previous={stats.previous.avgStartPosition}
        ignorePreviousIfZero
        invert
      />
      <SimpleStat
        label="Avg Finish"
        value={stats.current.avgFinishPosition}
        previous={stats.previous.avgFinishPosition}
        ignorePreviousIfZero
        invert
      />
      {/* <SimpleStat label="iRating" value="0" />
      <SimpleStat label="SR" value="0" /> */}
    </div>
  );
};

const Profile = async () => {
  const session = await getServerSession(authOptions);
  const userSettings = session && (await getUserSettings(session.user.id));

  if (!session || !userSettings?.iracingId) {
    return <NoProfile />;
  }
  return (
    <>
      <div className="col-span-2 flex w-full flex-col gap-2">
        <ProfileCard
          iracingId={userSettings.iracingId}
          avatarUrl={session.user.image}
          name={session.user.name}
        />
        <Suspense
          fallback={
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
              {Array(6)
                .fill(null)
                .map((_, i) => (
                  <div
                    key={i}
                    className="flex w-full flex-col gap-4 rounded-md border bg-background/40 p-4 text-start"
                  >
                    <Skeleton className="h-6 w-12 pb-2 text-base font-normal tracking-tight" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                ))}
            </div>
          }
        >
          <Stats
            iracingId={userSettings.iracingId}
            category={userSettings.favoriteCategory as Category}
          />
        </Suspense>
      </div>
    </>
  );
};

export const YourProfile = async () => {
  return (
    <div>
      <div className="text-center text-2xl font-bold md:text-start">
        Your Profile:
      </div>
      <div className="grid grid-cols-1 gap-2 py-2 md:grid-cols-2">
        <Suspense
          fallback={
            <div className="flex flex-row gap-2">
              <Loader2 className="h-6 w-6 animate-spin self-center text-xs dark:text-primary" />
              Loading...
            </div>
          }
        >
          <Profile />
        </Suspense>
      </div>
    </div>
  );
};
