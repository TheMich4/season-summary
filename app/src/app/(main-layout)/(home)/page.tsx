export const dynamic = "force-dynamic";

import { Title } from "./_components/title";
import { env } from "@/env";
import { Search } from "./_components/search";
import { YourProfile } from "./_components/your-profile";
import { VisitedList } from "./_components/visited-list";
import { Subtitle } from "./_components/subtitle";
import { AnimatedBackground } from "./_components/animated-background";
import { AnimatedSection } from "./_components/animated-section";
import { AnimatedCard } from "./_components/animated-card";

export default function Home() {
  return (
    <main className="container relative flex min-h-full flex-col items-center pb-8 pt-6 md:gap-10 md:py-12">
      <AnimatedBackground />

      <AnimatedSection className="flex min-w-full flex-col items-center gap-2 pb-6" delay={0}>
        <Title />
        <Subtitle />
      </AnimatedSection>

      <AnimatedSection className="w-full md:w-[600px]" delay={0.2}>
        <Search />
      </AnimatedSection>

      <AnimatedSection className="mt-10 w-full" delay={0.4}>
        <AnimatedCard position="right">
          <YourProfile />
        </AnimatedCard>
      </AnimatedSection>

      <AnimatedSection className="mt-6 w-full" delay={0.6}>
        <AnimatedCard position="left">
          <VisitedList apiUrl={env.API_URL} />
        </AnimatedCard>
      </AnimatedSection>
    </main>
  );
}
