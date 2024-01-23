import { Delta } from "@/components/delta";
import { Interval } from "./interval";
import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<any>();

export const getColumns = (
  result: any,
  stats: { lapsPerClass: Record<string, number> }
) => [
  columnHelper.accessor("finishPosition", {
    cell: ({ getValue }) => getValue() + 1,
    header: "Pos",
  }),
  columnHelper.accessor("finishPositionInClass", {
    cell: ({ getValue, row }) => (
      <span className="flex flex-row items-baseline gap-2">
        <p>{getValue() + 1}</p>
        <p className="text-xs">
          <Delta
            value={row.original.finishPositionInClass}
            previous={row.original.startingPositionInClass}
            invert
          />
        </p>
      </span>
    ),
    header: "Class",
  }),
  columnHelper.accessor("displayName", {
    header: "Name",
    cell: ({
      getValue,
      row: {
        original: { custId },
      },
    }) => {
      return (
        <Link href={`/driver/${custId}`} prefetch={false}>
          {getValue()}
        </Link>
      );
    },
  }),
  // TODO: Render only if multiclass
  columnHelper.accessor("carClassName", { header: "Class" }),
  columnHelper.accessor("carName", {
    header: "Car",
  }),
  columnHelper.accessor("interval", {
    header: "Interval",
    cell: ({ getValue, row }) => (
      <Interval
        position={row.original.finishPosition}
        interval={getValue()}
        totalLaps={result.raceSummary.lapsComplete}
        lapsComplete={row.original.lapsComplete}
      />
    ),
  }),
  columnHelper.accessor("classInterval", {
    header: "Class Interval",
    cell: ({ getValue, row }) => (
      <Interval
        interval={getValue()}
        position={row.original.finishPositionInClass}
        lapsComplete={row.original.lapsComplete}
        totalLaps={stats.lapsPerClass[row.original.carClassId]}
      />
    ),
  }),
  columnHelper.accessor("incidents", {
    header: "Inc",
  }),
  columnHelper.accessor("newiRating", {
    header: "iRating",
    cell: ({ getValue, row }) => (
      <span className="flex flex-row items-baseline gap-2">
        <p>{getValue()}</p>
        <p className="text-xs">
          <Delta
            previous={row.original.oldiRating}
            value={row.original.newiRating}
          />
        </p>
      </span>
    ),
  }),
  columnHelper.accessor("newSubLevel", {
    header: "SR",
    cell: ({ getValue, row }) => (
      <span className="flex flex-row items-baseline gap-2">
        <p>{(getValue() / 100).toFixed(2)}</p>
        <p className="text-xs">
          <Delta
            previous={row.original.oldSubLevel / 100}
            value={row.original.newSubLevel / 100}
            precision={2}
          />
        </p>
      </span>
    ),
  }),
];
