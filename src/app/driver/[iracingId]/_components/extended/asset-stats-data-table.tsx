"use client";

import {
  useReactTable,
  type ColumnDef,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type AssetData } from "./types";
import { Delta } from "@/components/delta";

interface DataTableProps {
  data: AssetData[];
}

interface AssetDataTableProps {
  data: AssetData;
}

const positionClasses = new Proxy(
  {
    1: "text-primary dark:text-primary font-bold",
    2: "text-gray-400 dark:text-gray-400 font-bold",
    3: "text-yellow-600 dark:text-yellow-600 font-bold",
  },
  {
    get: (target, prop) => {
      if (prop in target) {
        // @ts-ignore
        return target[prop];
      }
      return "";
    },
  },
);

const columns: ColumnDef<AssetData>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "races", header: "Races" },
  { accessorKey: "wins", header: "Wins" },
  { accessorKey: "podiums", header: "Podiums" },
  {
    accessorFn: ({ best }: AssetData) => best + 1,
    header: "Best Finish",
    cell: ({ getValue }) => {
      const position = getValue() as number;
      // @ts-ignore
      return <span className={positionClasses[position]}>{position}</span>;
    },
  },
  {
    accessorFn: ({ worst }: AssetData) => worst + 1,
    header: "Worst Finish",
    cell: ({ getValue }) => {
      const position = getValue() as number;
      // @ts-ignore
      return <span className={positionClasses[position]}>{position}</span>;
    },
  },
  {
    accessorFn: ({ average }: AssetData) => average.toFixed(2),
    header: "Avg. Finish",
  },
  { accessorKey: "bestGain", header: "Most Gained" },
  {
    accessorKey: "iRatingDiff",
    header: "Gained iRating",
    cell: ({ getValue }) => <Delta value={getValue() as number} />,
  },
  {
    header: "iRating per race",
    cell: ({ row: { original } }) => (
      <Delta value={original.iRatingDiff / original.races} precision={2} />
    ),
  },
  {
    accessorKey: "incidents",
    header: "Incidents",
  },
  {
    header: "Incidents per race",
    accessorFn: ({ incidents, races }: AssetData) =>
      (incidents / races).toFixed(2),
  },
  { accessorKey: "lapsCompleted", header: "Laps Completed" },
  { accessorKey: "lapsLead", header: "Laps Lead" },
];

const DataTable = ({ data }: DataTableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export const AssetDataTable = ({ data }: AssetDataTableProps) => {
  const assets = useMemo(
    () =>
      Object.entries(data)
        .map(([name, asset]) => ({ name, ...asset }))
        .sort((a, b) => b.races - a.races),
    [data],
  );

  const className =
    "overflow-hidden rounded-md border flex size-full min-h-0 max-h-full";

  return (
    <div className={className}>
      <DataTable data={assets} />
    </div>
  );
};
