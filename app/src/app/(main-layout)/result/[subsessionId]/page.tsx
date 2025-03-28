import { Loader2 } from "lucide-react";
import { Result } from "./_components/result";
import { Suspense } from "react";
import { AnimatedBackground } from "../../(home)/_components/animated-background";
import { AnimatedSection } from "../../(home)/_components/animated-section";
import { AnimatedCard } from "../../(home)/_components/animated-card";

interface ResultPageProps {
  params: {
    subsessionId: string;
  };
}

export default function ResultPage({
  params: { subsessionId },
}: ResultPageProps) {
  return (
    <main className="container relative flex min-h-full flex-col items-center pb-8 pt-6 md:gap-10 md:py-12">
      <AnimatedBackground />
      
      <AnimatedSection className="w-full" delay={0.2}>
        <AnimatedCard>
          <Suspense
            fallback={
              <div className="flex flex-row items-center justify-center gap-2 py-8">
                <Loader2 className="size-6 animate-spin text-primary" />
                <p>{`Loading results for race ${subsessionId}.`}</p>
              </div>
            }
          >
            {/* @ts-ignore Server component */}
            <Result subsessionId={subsessionId} />
          </Suspense>
        </AnimatedCard>
      </AnimatedSection>
    </main>
  );
}
