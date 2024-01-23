"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { getColumns } from "./get-columns";
import { useMemo } from "react";

// TODO: Add type from iracing-api
export const ResultTable = ({ result }: { result: Record<string, any> }) => {
  const { columns, data } = useMemo(() => {
    const data =
      result.sessionResults.find(
        (r: Record<string, any>) => r.simsessionTypeName === "Race"
      )?.results ?? [];

    const lapsPerClass = (data as any[])
      .filter((r) => r.finishPositionInClass === 0)
      .reduce(
        (acc, r) => ({
          ...acc,
          [r.carClassId]: r.lapsComplete,
        }),
        {}
      );

    return { columns: getColumns(result, { lapsPerClass }), data };
  }, [result]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border bg-background/40">
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
                          header.getContext()
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
                  <TableCell key={cell.id} className="py-2">
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
    </div>
  );
};
