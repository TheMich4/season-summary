import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const DataListSeason = ({ season, data }) => {
  console.log({ season, data });

  return (
    <div>
      <span>{`${season.year} S${season.season}`}</span>
    </div>
  );
};
