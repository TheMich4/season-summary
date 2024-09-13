import { Delta } from "@/components/delta";
import { Interval } from "./interval";
import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";
// import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";

const columnHelper = createColumnHelper<any>();

export const getColumns = (
  result: any,
  stats: { lapsPerClass: Record<string, number> },
) => {
  return [
    // columnHelper.accessor("expand", {
    //   size: 10,
    //   maxWidth: 10,
    //   header: "",
    //   cell: ({ row }) => {
    //     if (!row.getCanExpand()) return null;
    //
    //     const Icon = row.getIsExpanded() ? ChevronDownIcon : ChevronRightIcon;
    //
    //     return (
    //       <span className="flex items-center justify-center">
    //         <button onClick={row.getToggleExpandedHandler()}>
    //           <Icon className="flex size-4 items-center justify-center dark:text-primary" />
    //         </button>
    //       </span>
    //     );
    //   },
    // }),
    columnHelper.accessor("finishPosition", {
      cell: ({ getValue, row }) => (
        <span className="flex flex-row items-baseline gap-2">
          <p>{getValue() + 1}</p>
          <p className="text-xs">
            <Delta
              value={row.original.finishPosition}
              previous={row.original.startingPosition}
              invert
            />
          </p>
        </span>
      ),
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
};
