import { StatBox } from "@/components/stat-box";
import { Trophy, Target, Medal, Star } from "lucide-react";

interface PointsProps {
  points: {
    average: number;
    lowest: number;
    highest: number;
    races: number;
  };
  useCounter?: boolean;
}

export const Points = ({ points, useCounter = false }: PointsProps) => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border bg-background/40 p-4 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <Trophy className="h-5 w-5 text-primary" />
        <span className="text-base font-medium">Points</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatBox
          label="Average Points"
          value={Math.round(points.average)}
          icon={<Medal className="h-5 w-5 text-yellow-600" />}
        />
        <StatBox
          label="Highest Points"
          value={points.highest}
          icon={<Trophy className="h-5 w-5 text-primary" />}
        />
        <StatBox
          label="Lowest Points"
          value={points.lowest}
          icon={<Target className="h-5 w-5 text-muted-foreground" />}
        />
        <StatBox
          label="Total Races"
          value={points.races}
          icon={<Star className="h-5 w-5 text-primary" />}
        />
      </div>
    </div>
  );
};
