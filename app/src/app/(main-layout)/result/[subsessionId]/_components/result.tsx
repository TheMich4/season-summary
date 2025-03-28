import { RaceSummary } from "./race-summary";
import { ResultTable } from "./result-table/result-table";
import { api } from "@/trpc/server";

interface ResultProps {
  subsessionId: string;
}

export const Result = async ({ subsessionId }: ResultProps) => {
  const result = await api.data.getRaceResult.query({ subsessionId });

  if (!result) {
    return (
      <div className="flex items-center justify-center p-6">
        <p className="text-lg text-foreground/80">Failed to get result for session {subsessionId}</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col items-baseline justify-start gap-1">
        <h2 className="text-2xl font-extrabold leading-tight tracking-tighter text-primary">
          {result.seriesName}
        </h2>
        <p className="text-lg font-medium">{result.track.trackName}</p>
        <p className="text-sm text-muted-foreground">
          {new Date(result.startTime).toLocaleString()}
        </p>
      </div>

      <RaceSummary result={result} />

      <ResultTable result={result} />
    </div>
  );
};
