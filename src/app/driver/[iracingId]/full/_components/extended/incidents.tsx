import { Counter } from "@/components/counter";

export const Incidents = ({
  incidentData,
}: {
  incidentData: Record<string, any>;
}) => {
  return (
    <div className="flex flex-col gap-1 rounded-md border bg-background/40 p-4">
      <p className="pb-2 text-start font-normal tracking-tight">Incidents</p>
      <div className="flex flex-row items-baseline gap-1">
        <p className="text-2xl font-bold">
          <Counter value={incidentData.incidentsPerRace.total} />
        </p>
        <p className="text-xs text-muted-foreground">total</p>
      </div>

      <div className="flex flex-row items-baseline gap-1">
        <p className="text-2xl font-bold">
          <Counter
            value={incidentData.incidentsPerCorner.value}
            precision={3}
          />
        </p>
        <p className="text-xs text-muted-foreground">per corner</p>
      </div>

      <div className="flex flex-row items-baseline gap-1">
        <p className="text-2xl font-bold">
          <Counter value={incidentData.incidentsPerLap.value} precision={3} />
        </p>
        <p className="text-xs text-muted-foreground">per lap</p>
      </div>

      <div className="flex flex-row items-baseline gap-1">
        <p className="text-2xl font-bold">
          <Counter value={incidentData.incidentsPerRace.value} precision={3} />
        </p>
        <p className="text-xs text-muted-foreground">per race</p>
      </div>
    </div>
  );
};
