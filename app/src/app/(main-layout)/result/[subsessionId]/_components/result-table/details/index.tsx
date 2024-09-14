import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";
import { Chart } from "./chart";

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
    <div>
      <Chart lapData={data.lapData} driverId={props.row.custId} />
    </div>
  );
};
