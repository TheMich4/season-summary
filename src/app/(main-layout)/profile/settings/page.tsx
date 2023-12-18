import { Settings } from "./settings";
import { UserAvatar } from "./_components/user-avatar";
import { authOptions } from "@/config/auth-options";
import { getServerSession } from "next-auth";
import { getUserSettings } from "@/server/get-user-settings";
import { redirect } from "next/navigation";

export default async function ProfileSettings() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const { user } = session;

  const userSettings = await getUserSettings(user.id);

  return (
    <main className="container flex min-h-full w-full  flex-col items-center justify-start gap-6 py-4">
      <div className="flex w-full flex-col items-center justify-start gap-6 rounded-md border bg-background/40 p-4 text-card-foreground md:w-[500px]">
        <div className="flex w-full flex-row items-center gap-4">
          <UserAvatar />
          <div>
            <p className="text-2xl font-bold">{user.name}</p>
            <p>{user.email}</p>
          </div>
        </div>

        <Settings userSettings={userSettings} />
      </div>
    </main>
  );
}
