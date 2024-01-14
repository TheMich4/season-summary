import { getDriverSeasons } from "../_api/get-driver-seasons";

interface DriverSummaryDataListProps {
  iracingId: string;
}

export const DriverSummaryDataList = async ({
  iracingId,
}: DriverSummaryDataListProps) => {
  const seasons = await getDriverSeasons(iracingId);

  return <div>LIST</div>;
};
