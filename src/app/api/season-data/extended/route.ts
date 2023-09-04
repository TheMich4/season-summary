import { Category } from "@/config/category";
import { NextResponse } from "next/server";
import { getExtendedSeasonData } from "@/server/extended-data";

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

    const extendedData = await getExtendedSeasonData(
      iracingId,
      parseInt(year, 10),
      parseInt(season, 10),
      category as Category
    );

    console.log(extendedData);

    return NextResponse.json(extendedData);
  } catch (e) {
    console.log(e);
    return NextResponse.error();
  }
}
