import { ChevronUp, Medal, Target, Trophy } from "lucide-react";
import { StatsDisplay } from "./stats-display";
import { type RaceData } from "@season-summary/types";

interface RaceStatsProps {
  raceData: RaceData;
}

export const RaceStats = ({ raceData }: RaceStatsProps) => {
  const stats = [
    {
      label: "Best Finish",
      value: raceData.lowest,
      icon: <Trophy className="h-5 w-5 text-primary" />,
    },
    {
      label: "Worst Finish",
      value: raceData.highest,
      icon: <Target className="h-5 w-5 text-muted-foreground" />,
    },
    {
      label: "Average Finish",
      value: Math.round(raceData.average),
      icon: <Medal className="h-5 w-5 text-yellow-600" />,
    },
    {
      label: "Wins",
      value: raceData.wins,
      icon: <Trophy className="h-5 w-5 text-primary" />,
    },
    {
      label: "Podiums",
      value: raceData.podiums,
      icon: <Medal className="h-5 w-5 text-yellow-600" />,
    },
    {
      label: "Most Gained",
      value: raceData.bestGain,
      icon: <ChevronUp className="h-5 w-5 text-green-500" />,
    },
  ];

  return <StatsDisplay title="Race Performance" icon={Trophy} stats={stats} />;
};
