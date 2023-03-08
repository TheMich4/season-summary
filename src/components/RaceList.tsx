import Box from "./Box";
import Race from "./Race";
import { type SeasonResult } from "~/types";

const RaceList = ({
  seasonResults,
  iracingId,
}: {
  seasonResults: Array<SeasonResult>;
  iracingId: string;
}) => {
  console.log({ seasonResults });

  return (
    <>
      <Box>
        <div className="font-bold">Races:</div>
      </Box>
      {seasonResults.map((result) => (
        <Race result={result} key={result.subSessionId} iracingId={iracingId} />
      ))}
    </>
  );
};

export default RaceList;
