import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DataListSeason } from "./data-list-season";
import { api } from "@/trpc/server";

interface DriverSummaryDataListProps {
  iracingId: string;
}

export const DriverSummaryDataList = async ({
  iracingId,
}: DriverSummaryDataListProps) => {
  const seasons = await api.data.getDriverSeasons.query({ iracingId });

  return (
    <div className="flex w-full flex-col gap-2">
      <Accordion type="multiple" className="flex flex-col gap-1">
        {seasons?.map(({ season, data }) => {
          const key = `${season?.season}-${season?.year}`;

          return (
            <AccordionItem
              key={key}
              value={key}
              className="rounded-md border bg-background/40 px-4 py-2"
            >
              <AccordionTrigger className="py-0">
                <span>{`${season.year} S${season.season}`}</span>
              </AccordionTrigger>

              <AccordionContent className="mt-4">
                <DataListSeason
                  season={season}
                  data={data}
                  iracingId={iracingId}
                />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};
