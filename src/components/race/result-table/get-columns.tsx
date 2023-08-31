import { Change } from "./change";
import { Interval } from "./interval";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<any>();

export const getColumns = (result) => [
  columnHelper.accessor("finishPosition", {
    cell: ({ getValue }) => getValue() + 1,
    header: "Pos",
  }),
  columnHelper.accessor("finishPositionInClass", {
    cell: ({ getValue, row }) => (
      <span className="flex flex-row gap-2 items-baseline">
        {getValue() + 1}
        <Change
          change={
            row.original.startingPositionInClass -
            row.original.finishPositionInClass
          }
        />
      </span>
    ),
    header: "Class",
  }),
  columnHelper.accessor("displayName", {
    header: "Name",
  }),
  columnHelper.accessor("carName", {
    header: "Car",
  }),
  columnHelper.accessor("interval", {
    header: "Interval",
    cell: ({ getValue, row }) => (
      <Interval
        interval={getValue()}
        totalLaps={result.raceSummary.lapsComplete}
        lapsComplete={row.original.lapsComplete}
      />
    ),
  }),
  columnHelper.accessor("classInterval", {
    header: "Class Interval",
    cell: ({ getValue }) => <Interval interval={getValue()} />,
  }),
  columnHelper.accessor("incidents", {
    header: "Inc",
  }),
  columnHelper.accessor("newiRating", {
    header: "iRating",
    cell: ({ getValue, row }) => (
      <span className="flex flex-row gap-2 items-baseline">
        {getValue()}
        <Change change={row.original.newiRating - row.original.oldiRating} />
      </span>
    ),
  }),
];
