import { Flag, Medal, Target, Trophy } from "lucide-react";
import { StatsDisplay } from "./stats-display";

export const QualifyingStats = ({ qualiData }: Record<string, any>) => {
  const stats = [
    {
      label: "Best Grid",
      value: qualiData.lowest,
      icon: <Trophy className="h-5 w-5 text-primary" />,
    },
    {
      label: "Worst Grid",
      value: qualiData.highest,
      icon: <Target className="h-5 w-5 text-muted-foreground" />,
    },
    {
      label: "Average Grid",
      value: Math.round(qualiData.average),
      icon: <Medal className="h-5 w-5 text-yellow-600" />,
    },
    {
      label: "Pole Positions",
      value: qualiData.poles,
      icon: <Flag className="h-5 w-5 text-primary" />,
    },
  ];

  return <StatsDisplay title="Qualifying Performance" icon={Flag} stats={stats} />;
};
