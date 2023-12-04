import { Loader2 } from "lucide-react";
import { ProfileCard } from "@/components/common/profile-card";
import { Suspense } from "react";
import { authOptions } from "@/config/auth-options";
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

const Profile = async () => {
  const session = await getServerSession(authOptions);
  const userSettings = session && (await getUserSettings(session.user.id));

  if (!session || !userSettings?.iracingId) {
    return <NoProfile />;
  }
  return (
    <ProfileCard
      iracingId={userSettings.iracingId}
      avatarUrl={session.user.image}
      name={session.user.name}
    />
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
            <div>
              <Loader2 className="h-6 w-6 animate-spin self-center dark:text-primary" />
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
