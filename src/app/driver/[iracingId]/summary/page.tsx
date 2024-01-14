import { Suspense } from "react";
import { DriverSummaryDataList } from "./_components/data-list";

interface DriverSummaryPageProps {
  params: {
    iracingId: string;
  };
}

export default function DriverSummaryPage({
  params: { iracingId },
}: DriverSummaryPageProps) {
  if (!iracingId) return null;

  return (
    <div className="container flex w-[725px] flex-col items-center justify-center gap-4 py-4">
      <Suspense fallback={<div>Loading...</div>}>
        <DriverSummaryDataList iracingId={iracingId} />
      </Suspense>
    </div>
  );
}
