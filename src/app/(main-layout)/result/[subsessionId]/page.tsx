import { Result } from "./_components/result";
import { Suspense } from "react";

interface ResultPageProps {
  params: {
    subsessionId: string;
  };
}

const createResultUrl = (subsessionId: number, iracingId: string | number) =>
  `https://members.iracing.com/membersite/member/EventResult.do?subsessionid=${subsessionId}&custid=${iracingId}`;

export default function ResultPage({
  params: { subsessionId },
}: ResultPageProps) {
  return (
    <div className="container flex w-full items-center justify-center gap-2 py-4">
      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-ignore Server component */}
        <Result subsessionId={subsessionId} />
      </Suspense>
    </div>
  );
}
