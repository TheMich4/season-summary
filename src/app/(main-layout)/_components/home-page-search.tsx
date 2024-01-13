import { Search } from "@/components/common/search";
import { authOptions } from "@/config/auth-options";
import { getUserSettings } from "@/server/get-user-settings";
import { getServerSession } from "next-auth";

export const HomePageSearch = async () => {
  const session = await getServerSession(authOptions);
  const userSettings = await getUserSettings(session?.user?.id);

  return (
    <div className="w-full md:w-[600px]">
      <Search
        iracingId={userSettings?.iracingId}
        session={session}
        placeholder="Search for iRacing profile..."
      />
    </div>
  );
};
