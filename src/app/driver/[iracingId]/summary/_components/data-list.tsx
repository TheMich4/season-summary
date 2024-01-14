import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getDriverSeasons } from "../_api/get-driver-seasons";
import { DataListSeason } from "./data-list-season";

interface DriverSummaryDataListProps {
  iracingId: string;
}

export const DriverSummaryDataList = async ({
  iracingId,
}: DriverSummaryDataListProps) => {
  const seasons = await getDriverSeasons(iracingId);

  return (
    <div className="flex w-full flex-col gap-2">
      <Accordion type="multiple">
        {seasons?.map(({ season, data }) => {
          const key = `${season?.season}-${season?.year}-${season?.category}`;

          return (
            <AccordionItem key={key} value={key} className="border-b-0">
              <AccordionTrigger>
                <span>{`${season.year} S${season.season}`}</span>
              </AccordionTrigger>

              <AccordionContent>
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
