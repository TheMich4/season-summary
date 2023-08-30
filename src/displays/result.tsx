import { RaceSummary } from "@/components/race/race-summary";
import { getRaceResult } from "@/server/get-race-result";

export const Result = async ({ subsessionId }) => {
  const result = await getRaceResult(subsessionId);

  if (!result) {
    return <div>Failed to get result for session {subsessionId}</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col md:flex-row gap-1 md:items-baseline items-center justify-center">
        <p className="text-2xl font-extrabold leading-tight tracking-tighter text-primary">
          {result.seriesName}
        </p>
        <p>{result.track.trackName}</p>
        <p className="text-xs text-foreground/80">
          ({new Date(result.startTime).toLocaleString()})
        </p>
      </div>

      <RaceSummary result={result} />
    </div>
  );
};
