export const dynamic = "force-dynamic";

import { Settings } from "./_components/settings";
import { UserAvatar } from "./_components/user-avatar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/server/auth";
import { api } from "@/trpc/server";

export default async function ProfileSettings() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const userSettings = await api.user.getSettings.query();

  return (
    <main className="container flex min-h-full w-full flex-col items-center justify-start gap-6 py-4">
      <div className="flex w-full flex-col items-center justify-start gap-6 rounded-md border bg-background/40 p-4 text-card-foreground md:w-[500px]">
        <div className="flex w-full flex-row items-center gap-4">
          <UserAvatar />
          <div>
            <p className="text-2xl font-bold">{session.user.name}</p>
            <p>{session.user.email}</p>
          </div>
        </div>

        <Settings userSettings={userSettings} />
      </div>
    </main>
  );
}
