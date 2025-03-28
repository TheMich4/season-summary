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
  getExpandedRowModel,
  type ExpandedState,
} from "@tanstack/react-table";

import { getColumns } from "./get-columns";
import React, { useMemo, useState } from "react";
import { Details } from "./details";

// TODO: Add type from iracing-api
export const ResultTable = ({ result }: { result: Record<string, any> }) => {
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const { columns, data } = useMemo(() => {
    const data =
      result.sessionResults.find(
        (r: Record<string, any>) => r.simsessionTypeName === "Race",
      )?.results ?? [];

    const lapsPerClass = (data as any[])
      .filter((r) => r.finishPositionInClass === 0)
      .reduce(
        (acc, r) => ({
          ...acc,
          [r.carClassId]: r.lapsComplete,
        }),
        {},
      );

    return {
      columns: getColumns(result, { lapsPerClass }),
      data,
    };
  }, [result]);

  const columnVisibility = useMemo(() => {
    const isMultiClass = result.carClasses.length > 1;

    return {
      finishPositionInClass: isMultiClass,
      carClassName: isMultiClass,
      classInterval: isMultiClass,
    };
  }, [result]);

  const table = useReactTable({
    data,
    columns,
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange: setExpanded,
    state: {
      columnVisibility,
      expanded,
    },
  });

  return (
    <div className="overflow-hidden rounded-xl border border-primary/30 bg-background/60 backdrop-blur-md shadow-sm transition-all">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-muted/70">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead 
                      key={header.id}
                      className="py-3 text-foreground font-semibold"
                    >
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
              table.getRowModel().rows.map((row, index) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    className={`
                      transition-colors hover:bg-muted/40
                      ${index % 2 === 0 ? 'bg-background/80' : 'bg-background/40'}
                      ${row.getIsExpanded() ? 'bg-muted/30' : ''}
                    `}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>

                  {row.getIsExpanded() && (
                    <TableRow className="border-t border-primary/10 bg-muted/20">
                      <TableCell colSpan={columns.length} className="p-4">
                        <div className="rounded-lg bg-background/60 p-3 backdrop-blur-sm border border-primary/10">
                          <Details row={row.original} result={result} />
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
