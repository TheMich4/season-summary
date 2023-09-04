import { Category } from "@/config/category";
import { NextResponse } from "next/server";
import { getExtendedSeasonData } from "@/server/extended-data";
import { parseExtendedData } from "@/lib/extended-data";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const iracingId = searchParams.get("iracingId");
    const year = searchParams.get("year");
    const season = searchParams.get("season");
    const category = searchParams.get("category");

    if (!iracingId || !year || !season || !category) {
      return NextResponse.error();
    }

    const results = await getExtendedSeasonData(
      iracingId,
      parseInt(year, 10),
      parseInt(season, 10),
      category as Category
    );

    if (!results) {
      return NextResponse.error();
    }

    const parsedExtendedData = "parseExtendedData(results, iracingId)";

    return NextResponse.json({ results, parsedExtendedData });
  } catch (e) {
    console.log(e);
    return NextResponse.error();
  }
}
