import { ProviderButtons } from "./provider-buttons";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/config/auth-options";
import { getProviders } from "next-auth/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  const providers = await getProviders();

  if (session) {
    redirect("/");
  }

  return (
    <main className="flex min-h-full items-center justify-center gap-6 pb-8 pt-6 md:gap-10 md:py-12">
      <div className="flex min-w-[400px] flex-col gap-2 rounded-md border p-4">
        <div className="flex flex-row items-baseline gap-1">
          <p>{"Log in to "}</p>
          <p className="text-lg font-bold dark:text-primary">Season Summary</p>
        </div>
        <Separator />
        <ProviderButtons providers={providers} />
      </div>
    </main>
  );
}
