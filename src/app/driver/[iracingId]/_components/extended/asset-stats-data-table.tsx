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

interface DataTableProps {
  data: AssetData[];
}

interface AssetDataTableProps {
  data: AssetData;
}

const columns: ColumnDef<AssetData>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "races", header: "Races" },
  { accessorKey: "wins", header: "Wins" },
  { accessorKey: "podiums", header: "Podiums" },
  { accessorFn: ({ best }: AssetData) => best + 1, header: "Best Finish" },
  { accessorFn: ({ worst }: AssetData) => worst + 1, header: "Worst Finish" },
  {
    accessorFn: ({ average }: AssetData) => average.toFixed(2),
    header: "Avg. Finish",
  },
  { accessorKey: "bestGain", header: "Most Gained" },
  { accessorKey: "iRatingDiff", header: "Gained iRating" },
  { accessorKey: "incidents", header: "Incidents" },
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
