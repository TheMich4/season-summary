import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProviderButtons } from "./provider-buttons";
import { getProviders } from "next-auth/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/server/auth";
import { AnimatedBackground } from "@/app/(main-layout)/(home)/_components/animated-background";
import { AnimatedSection } from "@/app/(main-layout)/(home)/_components/animated-section";
import { AnimatedCard } from "@/app/(main-layout)/(home)/_components/animated-card";
import { SignInContent } from "./_components/sign-in-content";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  const providers = await getProviders();

  if (session) {
    redirect("/");
  }

  return (
    <main className="relative flex min-h-full w-full overflow-hidden">
      <AnimatedBackground />
      
      <div className="flex w-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <AnimatedSection className="w-full max-w-lg" delay={0.2}>
          <AnimatedCard position="right">
            <SignInContent providers={providers} />
          </AnimatedCard>
        </AnimatedSection>
      </div>
    </main>
  );
}
