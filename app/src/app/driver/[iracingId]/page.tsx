import { DEFAULT_SEASON, DEFAULT_YEAR } from "@/config/iracing";
import { Categories } from "@season-summary/config";
import type { Category } from "@season-summary/config";
import { ConfigProvider } from "@/components/providers/config-provider";
import { ExtendedProfile } from "./_components/extended-profile";
import { ProfileLoader } from "./_components/profile-loader";
import { Suspense } from "react";
import { AnimatedSection } from "./_components/animated/animated-section";
import { AnimatedRacingBackground } from "./_components/animated/animated-background";
import { AnimatedStatCard } from "./_components/animated/animated-stat-card";

export const dynamic = "force-dynamic";

interface DriverPageProps {
  params: {
    iracingId: string;
  };
  searchParams: {
    year?: string;
    season?: string;
    category?: string;
  };
}

export default function ExtendedPage({
  params: { iracingId },
  searchParams: {
    year = `${DEFAULT_YEAR}`,
    season = `${DEFAULT_SEASON}`,
    category = Categories.SPORTS_CAR,
  },
}: DriverPageProps) {
  return (
    <main className="relative min-h-screen w-full bg-gradient-to-b from-background to-background/95 pb-12">
      {/* Animated background with racing-themed elements */}
      <AnimatedRacingBackground />

      {/* Page content with animated transitions */}
      <div className="container relative mx-auto flex flex-col items-center px-2 pt-2 md:pt-4 lg:px-4">
        <AnimatedSection className="w-full max-w-full" delay={0.2}>
          <AnimatedStatCard className="p-4 md:p-6">
            <Suspense fallback={<ProfileLoader iracingId={iracingId} />}>
              <ConfigProvider>
                <ExtendedProfile
                  iracingId={iracingId}
                  year={year}
                  season={season}
                  category={category as Category}
                />
              </ConfigProvider>
            </Suspense>
          </AnimatedStatCard>
        </AnimatedSection>

        <AnimatedSection
          className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground"
          delay={0.4}
        >
          <p>Track your season progress and compare with friends!</p>
        </AnimatedSection>
      </div>
    </main>
  );
}
