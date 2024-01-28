import { RaceSummary } from "./race-summary";
import { ResultTable } from "./result-table/result-table";
import { api } from "@/trpc/server";

interface ResultProps {
  subsessionId: string;
}

export const Result = async ({ subsessionId }: ResultProps) => {
  const result = await api.data.getRaceResult.query({ subsessionId });

  if (!result) {
    return <div>Failed to get result for session {subsessionId}</div>;
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex flex-col items-baseline justify-start gap-1">
        <p className="text-2xl font-extrabold leading-tight tracking-tighter dark:text-primary">
          {result.seriesName}
        </p>
        <p>{result.track.trackName}</p>
        <p className="text-xs text-foreground/80">
          ({new Date(result.startTime).toLocaleString()})
        </p>
      </div>

      <RaceSummary result={result} />

      <ResultTable result={result} />
    </div>
  );
};
