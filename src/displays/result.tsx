import { RaceSummary } from "@/components/race/race-summary";
import { ResultTable } from "@/components/race/result-table/result-table";
import { getRaceResult } from "@/server/get-race-result";
import { siteConfig } from "@/config/site";

export const Result = async ({ subsessionId }) => {
  const result = await getRaceResult(subsessionId);

  if (!result) {
    return <div>Failed to get result for session {subsessionId}</div>;
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="text-balance flex flex-col items-center rounded-md border p-2 text-center text-sm">
        <p className="mb-1 font-bold text-red-500">
          This page is a work in progress!
        </p>
        <p>
          If you have any feedback or ideas, please let me know on{" "}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-primary"
          >
            Github
          </a>
          .
        </p>
        <p>
          Or contact me on{" "}
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-primary"
          >
            Twitter
          </a>
          .
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-1 md:flex-row md:items-baseline">
        <p className="text-2xl font-extrabold leading-tight tracking-tighter text-primary">
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
