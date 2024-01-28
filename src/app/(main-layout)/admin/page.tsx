import { Loader2 } from "lucide-react";
import { Summary } from "./_components/summary";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { api } from "@/trpc/server";

export default async function AdminPage() {
  const isAdmin = await api.user.isAdmin.query();

  if (!isAdmin) {
    return redirect("/");
  }

  return (
    <main className="container flex min-h-full w-full flex-col items-center justify-start gap-6 py-4">
      <Suspense
        fallback={<Loader2 className="size-6 animate-spin text-primary" />}
      >
        <Summary />
      </Suspense>
    </main>
  );
}
