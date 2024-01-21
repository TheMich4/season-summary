import { StatBox } from "@/components/stat-box";

// TODO: type from iracing-api
interface Result {
  [key: string]: any;
}

interface RaceSummaryProps {
  result: Result;
}

export const RaceSummary = ({ result }: RaceSummaryProps) => {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
      <StatBox label="Laps" value={result.raceSummary.lapsComplete} />
      <StatBox label="SOF" value={result.raceSummary.fieldStrength} />
      <StatBox label="Lead Changes" value={result.raceSummary.numLeadChanges} />
      <StatBox label="Cautions" value={result.raceSummary.numCautions} />
    </div>
  );
};
