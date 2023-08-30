import { Result } from "@/displays/result";
import { Suspense } from "react";

const createResultUrl = (subsessionId: number, iracingId: string | number) =>
  `https://members.iracing.com/membersite/member/EventResult.do?subsessionid=${subsessionId}&custid=${iracingId}`;

export default function ResultPage({ params: { subsessionId } }) {
  return (
    <div className="container flex w-full items-center justify-center gap-2 py-4">
      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-ignore Server component */}
        <Result subsessionId={subsessionId} />
      </Suspense>
    </div>
  );
}
