import type { Category } from "@season-summary/config";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { api } from "@/trpc/server";
import { authOptions } from "@/server/auth";
import { categoryToId } from "@season-summary/config";
import { env } from "@/env";
import { getServerSession } from "next-auth";
import { StatsClient } from "./stats-client";
import { ProfileCardClient } from "./profile-card-client";

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
// TODO: Add caching for 1h
const Stats = async ({
  iracingId,
  category,
}: {
  iracingId: string;
  category: Category;
}) => {
  const response = await fetch(
    `${env.API_URL}v2/get-basic-data?iracingId=${iracingId}&categoryId=${categoryToId[category]}`,
  );

  if (response.status === 503) return null;

  const stats = await response.json();

  if (!stats) return null;

  return <StatsClient stats={stats} />;
};

const Profile = async () => {
  const session = await getServerSession(authOptions);
  const userSettings = await api.user.getSettings.query();

  if (!session || !userSettings?.iracingId) {
    return <NoProfile />;
  }
  return (
    <>
      <div className="flex w-full flex-col gap-2">
        <ProfileCardClient
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
    <div className="mx-auto w-full max-w-full">
      <div className="text-center text-2xl font-bold md:text-start">
        Your Profile:
      </div>
      <div className="grid grid-cols-1 gap-2 py-2">
        <Suspense
          fallback={
            <div className="flex flex-row gap-2">
              <Loader2 className="size-6 animate-spin self-center text-xs dark:text-primary" />
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
