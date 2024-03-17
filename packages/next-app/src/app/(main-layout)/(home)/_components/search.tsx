import { Search as CommonSearch } from "@/components/search";
import { authOptions } from "@/server/auth";
import { api } from "@/trpc/server";
import { getServerSession } from "next-auth";

export const Search = async () => {
  const session = await getServerSession(authOptions);
  const userSettings = await api.user.getSettings.query();

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
