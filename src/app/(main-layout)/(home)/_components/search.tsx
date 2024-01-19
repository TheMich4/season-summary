import { Search as CommonSearch } from "@/components/search";
import { authOptions } from "@/config/auth-options";
import { getUserSettings } from "@/server/get-user-settings";
import { getServerSession } from "next-auth";

export const Search = async () => {
  const session = await getServerSession(authOptions);
  const userSettings = await getUserSettings(session?.user?.id);

  return (
    <div className="w-full md:w-[600px]">
      <CommonSearch
        iracingId={userSettings?.iracingId}
        session={session}
        placeholder="Search for iRacing profile..."
      />
    </div>
  );
};
