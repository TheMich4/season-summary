import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";
import { Chart } from "./chart";
import { useMemo } from "react";
import { getLapTime } from "./utils";

export const Details = (props: any) => {
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
    console.log({ data });
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
      <span className="flex h-full w-full items-center justify-center gap-2 text-primary">
        <Loader2 className="size-6 animate-spin" />
      </span>
    );
  }

  if (!data?.lapData?.length) {
    return <div>No laps</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
      <div className="col-span-1">
        {details?.map(({ label, value }) => (
          <div key={label} className="flex flex-row items-baseline gap-1">
            <div className="text-sm font-semibold uppercase text-primary">
              {label}:
            </div>
            <div className="italic">{value}</div>
          </div>
        ))}
      </div>
      <div className="col-span-3">
        <Chart lapData={data.lapData} driverId={props.row.custId} />
      </div>
    </div>
  );
};
