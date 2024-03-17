import { StatBox } from "@/components/stat-box";
import { getIntervalString } from "@/lib/interval";

// TODO: type from iracing-api
type Result = Record<string, any>;

interface RaceSummaryProps {
  result: Result;
}

export const RaceSummary = ({ result }: RaceSummaryProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
      <StatBox label="Laps" value={result.raceSummary.lapsComplete} />
      <StatBox label="SOF" value={result.raceSummary.fieldStrength} />
      <StatBox
        label="Avg Lap Time"
        value={getIntervalString(result.raceSummary.averageLap)}
      />
      <StatBox label="Lead Changes" value={result.raceSummary.numLeadChanges} />
      <StatBox label="Cautions" value={result.raceSummary.numCautions} />
      <StatBox label="Week" value={result.raceWeekNum + 1} />
    </div>
  );
};
