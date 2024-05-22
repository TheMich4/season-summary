export const dynamic = "force-dynamic";

import { Loader2 } from "lucide-react";
import { Summary } from "./_components/summary";
import { Suspense } from "react";
import { UsersList } from "./_components/users-list";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const isAdmin = await api.user.isAdmin.query();

  if (!isAdmin) {
    return redirect("/");
  }

  const users = await api.admin.getUsers.query();

  return (
    <main className="container flex min-h-full w-full flex-col items-center justify-start gap-6 py-4">
      <Suspense
        fallback={<Loader2 className="size-6 animate-spin text-primary" />}
      >
        <Summary />
      </Suspense>

      <Suspense
        fallback={<Loader2 className="size-6 animate-spin text-primary" />}
      >
        <UsersList users={users} />
      </Suspense>
    </main>
  );
}
