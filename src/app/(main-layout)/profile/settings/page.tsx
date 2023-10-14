import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Settings } from "./settings";
import { authOptions } from "@/config/auth-options";
import { getServerSession } from "next-auth";
import { getUserSettings } from "@/server/get-user-settings";

export default async function ProfileSettings() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { user } = session;

  const userSettings = await getUserSettings(user.id);

  return (
    <main className="container grid min-h-full items-start justify-start gap-6 pb-8 pt-6 md:gap-10 md:py-12">
      <div className="flex flex-row items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={user.image ?? ""} />
          <AvatarFallback>{user?.name?.charAt(0) ?? "U"}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-2xl font-bold">{user.name}</p>
          <p>{user.email}</p>
        </div>
      </div>

      <Settings userSettings={userSettings} />
    </main>
  );
}
