import { Category } from "@/config/category";
import { NextResponse } from "next/server";
import { getSeasonData } from "@/server/store/iracing-data";

export const revalidate = 60 * 60; // 1 hour

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const iracingId = searchParams.get("iracingId");
  const year = searchParams.get("year");
  const season = searchParams.get("season");
  const category = searchParams.get("category");

  if (!iracingId || !year || !season || !category) {
    return NextResponse.error();
  }

  const data = await getSeasonData(
    iracingId,
    year,
    season,
    category as Category
  );

  return NextResponse.json(data);
}
