import Box from "~/components/Box";
import type { MemberRecap } from "~/types";

interface ShortRecapProps {
  memberRecap: MemberRecap;
}

const fields: Array<{
  label: string;
  key:
    | "avgFinishPosition"
    | "avgStartPosition"
    | "laps"
    | "lapsLed"
    | "starts"
    | "top5"
    | "wins";
}> = [
  {
    label: "Starts",
    key: "starts",
  },
  {
    label: "Wins",
    key: "wins",
  },
  {
    label: "Top 5s",
    key: "top5",
  },
  {
    label: "Laps",
    key: "laps",
  },
  {
    label: "Laps Led",
    key: "lapsLed",
  },
  {
    label: "Avg. Start",
    key: "avgStartPosition",
  },
  {
    label: "Avg. Finish",
    key: "avgFinishPosition",
  },
];

const ShortRecap = ({ memberRecap }: ShortRecapProps) => {
  return (
    <div className="grid w-full grid-cols-1 grid-rows-2 gap-2 sm:grid-cols-2 md:grid-cols-7 md:grid-rows-1">
      {fields.map((field) => {
        return (
          <div className="min-w-[120px]" key={field.key}>
            <Box>
              <div className="flex flex-col items-center gap-2">
                <div className="font-bold">{field.label}:</div>
                <div className="font text-center text-2xl">
                  {memberRecap.stats[field.key]}
                </div>
              </div>
            </Box>
          </div>
        );
      })}
    </div>
  );
};

export default ShortRecap;
