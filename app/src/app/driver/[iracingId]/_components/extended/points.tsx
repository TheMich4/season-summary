import { Medal, Star, Target, Trophy } from "lucide-react";
import { StatsDisplay } from "./stats-display";
import { type PointsData } from "@season-summary/types";

interface PointsProps {
  points: PointsData;
}

export const Points = ({ points }: PointsProps) => {
  const stats = [
    {
      label: "Average Points",
      value: Math.round(points.average),
      icon: <Medal className="h-5 w-5 text-yellow-600" />,
    },
    {
      label: "Highest Points",
      value: points.highest,
      icon: <Trophy className="h-5 w-5 text-primary" />,
    },
    {
      label: "Lowest Points",
      value: points.lowest,
      icon: <Target className="h-5 w-5 text-muted-foreground" />,
    },
    {
      label: "Total Races",
      value: points.races,
      icon: <Star className="h-5 w-5 text-primary" />,
    },
  ];

  return <StatsDisplay title="Points" icon={Trophy} stats={stats} />;
};
