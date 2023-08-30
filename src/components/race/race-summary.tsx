import { Stat } from "../profile/stat";

export const RaceSummary = ({ result }) => {
  return (
    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
      <Stat name="Laps" value={result.raceSummary.lapsComplete} />
      <Stat name="SOF" value={result.raceSummary.fieldStrength} />
      <Stat name="Lead Changes" value={result.raceSummary.numLeadChanges} />
      <Stat name="Cautions" value={result.raceSummary.numCautions} />
    </div>
  );
};
