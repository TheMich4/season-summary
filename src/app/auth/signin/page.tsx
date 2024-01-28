import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { ProviderButtons } from "./provider-buttons";
import { getProviders } from "next-auth/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/server/auth";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  const providers = await getProviders();

  if (session) {
    redirect("/");
  }

  return (
    <main className="flex min-h-full w-full py-4">
      <div className="flex w-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-lg bg-background/40">
          <CardHeader>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
              Welcome to <br className="block sm:hidden" />
              <span className="dark:text-primary">Season Summary</span>!
            </h2>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              {"We're glad to have you here. Please login to your account."}
            </p>
          </CardHeader>
          <CardContent className="mt-8 space-y-4">
            <ProviderButtons providers={providers} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
