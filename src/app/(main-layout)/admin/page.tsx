import { getIsUserAdmin } from "@/server/get-is-user-admin";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const isAdmin = await getIsUserAdmin();

  if (!isAdmin) {
    return redirect("/");
  }

  return (
    <main className="container flex min-h-full w-full flex-col items-center justify-start gap-6 py-4">
      Admin
    </main>
  );
}
