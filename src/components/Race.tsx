import Box from "./Box";
import Link from "next/link";
import { SeasonResult } from "~/types";

const stats = [
  {
    label: "Starting position",
    key: "startingPositionInClass",
  },
  {
    label: "Finish position",
    key: "finishPositionInClass",
  },
];

const createResultUrl = (subsessionId: number, iracingId: string | number) =>
  `https://members.iracing.com/membersite/member/EventResult.do?subsessionid=${subsessionId}&custid=${iracingId}`;

const Race = ({
  result,
  iracingId,
}: {
  result: SeasonResult;
  iracingId: string;
}) => {
  const resultUrl = createResultUrl(result.subsessionId, iracingId);

  return (
    <Link href={resultUrl} rel="noopener noreferrer" target="_blank">
      <Box>
        <div className="cursor-pointer">
          <div className="text-sm font-light text-slate-300">
            {new Date(result.startTime).toLocaleString()}
          </div>
          <div>
            {result.track.trackName} - {result.track.configName}
            <span className="text-sm text-gray-300">{" with "}</span>
            {result.carClassName}
          </div>
          {/* {stats.map((stat) => (
          <div key={stat.key}>
            {stat.label}: {result[stat.key]}
          </div>
        ))} */}
        </div>
      </Box>
    </Link>
  );
};

export default Race;
