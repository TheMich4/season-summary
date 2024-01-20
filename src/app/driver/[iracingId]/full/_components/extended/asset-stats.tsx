import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AssetDataTable } from "./asset-stats-data-table";
import { useMemo } from "react";

interface AssetStatsProps {
  assetData: AssetData;
  name: string;
  preposition: string;
}

const Data = ({
  data,
  preposition,
}: {
  data: Array<{
    name: string;
    races: number;
  }>;
  preposition: string;
}) => {
  return (
    <div className="flex flex-col text-start">
      {data.map(({ name, races }) => (
        <div className="flex w-full flex-row items-baseline gap-1" key={name}>
          <p className="min-w-[19px] font-bold dark:text-primary">{races}</p>
          <p className="text-xs text-muted-foreground">{preposition}</p>
          <p className="text-sm">{name}</p>
        </div>
      ))}
    </div>
  );
};

export const AssetStats = ({
  assetData,
  name,
  preposition,
}: AssetStatsProps) => {
  const { count, data } = useMemo(
    () =>
      Object.entries(assetData).reduce(
        (acc, [name, stats]) => ({
          count: acc.count + 1,
          data: [...acc.data, { name, races: stats.races }]
            .sort((a, b) => b.races - a.races)
            .slice(0, 5),
        }),
        { count: 0, data: [] } as {
          count: number;
          data: Array<{ name: string; races: number }>;
        }
      ),
    [assetData]
  );

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex w-full flex-col gap-2 rounded-md border bg-background/40 p-4 text-start hover:border-primary/60">
          <p className="text-2xl font-semibold leading-none tracking-tight">
            {`Most raced ${name}`}
          </p>
          <div className="flex flex-row items-baseline gap-1 text-sm text-muted-foreground">
            {`You raced ${preposition} `}
            <p className="font-bold text-foreground dark:text-primary">
              {count}
            </p>
            {`different ${name} this season.`}
          </div>
          <Data data={data} preposition={preposition} />
        </div>
      </DialogTrigger>
      <DialogContent className="2xl:max-[1500px] h-full max-h-[80%] overflow-hidden lg:max-w-[1000px] xl:max-w-[1200px]">
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle>{`${name.charAt(0).toUpperCase()}${name.slice(
            1
          )} stats`}</DialogTitle>
        </DialogHeader>

        <AssetDataTable data={assetData} />
      </DialogContent>
    </Dialog>
  );
};
