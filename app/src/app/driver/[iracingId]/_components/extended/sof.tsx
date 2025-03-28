import { Medal, Star, Target, Trophy } from "lucide-react";
import { StatsDisplay } from "./stats-display";
import { type SOFData } from "@season-summary/types";

interface SOFProps {
  sof: SOFData;
  useCounter?: boolean;
}

export const SOF = ({ sof, useCounter = false }: SOFProps) => {
  const stats = [
    {
      label: "Average SOF",
      value: Math.round(sof.average),
      icon: <Medal className="h-5 w-5 text-yellow-600" />,
      useCounter,
    },
    {
      label: "Highest SOF",
      value: sof.highest,
      icon: <Trophy className="h-5 w-5 text-primary" />,
      useCounter,
    },
    {
      label: "Lowest SOF",
      value: sof.lowest,
      icon: <Target className="h-5 w-5 text-muted-foreground" />,
      useCounter,
    },
    {
      label: "Highest Win SOF",
      value: sof.highestWin,
      icon: <Star className="h-5 w-5 text-primary" />,
      useCounter,
    },
  ];

  return <StatsDisplay title="Strength of Field" icon={Star} stats={stats} />;
};
