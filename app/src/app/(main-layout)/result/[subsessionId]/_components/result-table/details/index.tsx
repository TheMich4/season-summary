import { api } from "@/trpc/react";
import { Loader2, ChevronDown } from "lucide-react";
import { Chart } from "./chart";
import React, { useMemo, useState } from "react";
import { getLapTime } from "./utils";
import { Button } from "@/components/ui/button";
import { LapTable } from "./lap-table";

export const Details = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = api.raceData.getDriverRaceLaps.useQuery(
    {
      subsessionId: props.result.subsessionId,
      simsessionNumber: 0,
      customerId: props.row.custId,
    },
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
    },
  );

  const details = useMemo(() => {
    if (!data?.lapData) return null;

    return [
      {
        label: "Best Lap Time",
        value: getLapTime(data.bestLapTime),
      },
      {
        label: "Average Lap Time",
        value: getLapTime(props.row.averageLap),
      },
      {
        label: "Laps Lead",
        value: props.row.lapsLead,
      },
    ];
  }, [data, props.row]);

  if (isLoading || !data?.lapData) {
    return (
      <div className="flex h-32 w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2 text-primary">
          <Loader2 className="size-8 animate-spin" />
          <p className="text-sm text-muted-foreground">Loading lap data...</p>
        </div>
      </div>
    );
  }

  if (!data?.lapData?.length) {
    return (
      <div className="flex h-16 w-full items-center justify-center text-muted-foreground">
        No lap data available
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="col-span-1 flex flex-col justify-between gap-4 rounded-lg bg-background/80 p-4 shadow-sm">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-primary">Driver Stats</h3>
            <div className="space-y-2">
              {details?.map(({ label, value }) => (
                <div key={label} className="flex flex-row items-baseline justify-between gap-2 border-b border-primary/10 pb-1">
                  <div className="text-sm font-medium text-foreground">
                    {label}
                  </div>
                  <div className="font-mono font-semibold">{value}</div>
                </div>
              ))}
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsOpen(true)}
            className="mt-2 w-full border-primary/20 bg-primary/5 hover:bg-primary/10 hover:text-primary"
          >
            <span>Lap Details</span>
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="col-span-3 rounded-lg bg-background/80 p-4 shadow-sm">
          <h3 className="mb-3 text-lg font-bold text-primary">Lap Time Analysis</h3>
          <Chart lapData={data.lapData} driverId={props.row.custId} />
        </div>
      </div>

      {/* <LapTable isOpen={isOpen} close={() => setIsOpen(false)} /> */}
    </>
  );
};
