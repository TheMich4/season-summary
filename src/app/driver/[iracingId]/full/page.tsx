import {
  DEFAULT_CATEGORY,
  DEFAULT_SEASON,
  DEFAULT_YEAR,
} from "@/config/iracing";

import { Categories } from "@/config/category";
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
    category = DEFAULT_CATEGORY,
  },
}: DriverPageProps) {
  return redirect(
    `/driver/${iracingId}?year=${year}&season=${season}&category=${category}`,
  );
}
