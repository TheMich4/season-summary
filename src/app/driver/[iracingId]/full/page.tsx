import { Categories } from "@/config/category";
import { DEFAULT_SEASON, DEFAULT_YEAR } from "@/config/iracing";
import { redirect } from "next/navigation";

interface DriverPageProps {
  params: {
    iracingId: string;
  };
  searchParams: {
    year?: string;
    season?: string;
    category?: string;
  };
}

export default function FullPage({
  params: { iracingId },
  searchParams: {
    year = `${DEFAULT_YEAR}`,
    season = `${DEFAULT_SEASON}`,
    category = Categories.ROAD,
  },
}: DriverPageProps) {
  return redirect(
    `/driver/${iracingId}?year=${year}&season=${season}&category=${category}`
  );
}
