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
    <div className="flex flex-col gap-2 w-full">
      <div className="text-sm items-center flex flex-col border rounded-md p-2 text-balance text-center">
        <p className="text-red-500 font-bold mb-1">
          This page is a work in progress!
        </p>
        <p>
          If you have any feedback or ideas, please let me know on{" "}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-bold"
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
            className="text-primary font-bold"
          >
            Twitter
          </a>
          .
        </p>
      </div>

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

      <ResultTable result={result} />
    </div>
  );
};
