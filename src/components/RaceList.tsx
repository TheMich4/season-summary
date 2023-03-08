import Box from "./Box";
import Race from "./Race";
import { type SeasonResult } from "~/types";
import Button from "./Button";
import { useMemo, useState } from "react";

const racesPerPage = 5;

const RaceList = ({
  seasonResults,
  iracingId,
}: {
  seasonResults: Array<SeasonResult>;
  iracingId: string;
}) => {
  const numberOfPages = useMemo(() => {
    const numberOfRaces = seasonResults.length;
    return Math.ceil(numberOfRaces / racesPerPage);
  }, [seasonResults]);
  const [page, setPage] = useState(0);

  return (
    <>
      <Box>
        <div className="flex flex-row justify-between gap-2">
          <div className="font-bold">Races:</div>
          {/* TODO: Change to icons */}
          <div className="flex flex-row gap-2">
            <div>
              Page: {page + 1}{" "}
              <span className="font-italic text-xs text-slate-300">
                (of: {numberOfPages})
              </span>
            </div>

            <Button
              disabled={page === 0}
              onClick={() => setPage((prev) => prev - 1)}
            >
              {"<"}
            </Button>
            <Button
              disabled={page === numberOfPages - 1}
              onClick={() => setPage((prev) => prev + 1)}
            >
              {">"}
            </Button>
          </div>
        </div>
      </Box>
      {seasonResults
        .slice(page * racesPerPage, (page + 1) * racesPerPage)
        .map((result) => (
          <Race
            result={result}
            key={result.subsessionId}
            iracingId={iracingId}
          />
        ))}
    </>
  );
};

export default RaceList;
