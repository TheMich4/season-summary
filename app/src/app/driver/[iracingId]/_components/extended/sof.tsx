import { Medal, Star, Target, Trophy } from "lucide-react";
import { StatsDisplay } from "./stats-display";

export const SOF = ({ sof }: Record<string, any>) => {
  const stats = [
    {
      label: "Average SOF",
      value: Math.round(sof.average),
      icon: <Medal className="h-5 w-5 text-yellow-600" />,
    },
    {
      label: "Highest SOF",
      value: sof.highest,
      icon: <Trophy className="h-5 w-5 text-primary" />,
    },
    {
      label: "Lowest SOF",
      value: sof.lowest,
      icon: <Target className="h-5 w-5 text-muted-foreground" />,
    },
    {
      label: "Highest Win SOF",
      value: sof.highestWin,
      icon: <Star className="h-5 w-5 text-primary" />,
    },
  ];

  return <StatsDisplay title="Strength of Field" icon={Star} stats={stats} />;
};
