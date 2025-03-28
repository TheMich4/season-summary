import { StatBox } from "@/components/stat-box";
import { Trophy, Medal, Target, ChevronUp } from "lucide-react";

export const RaceStats = ({ raceData }: Record<string, any>) => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border bg-background/40 p-4 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <Trophy className="h-5 w-5 text-primary" />
        <span className="text-base font-medium">Race Performance</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatBox
          label="Best Finish"
          value={raceData.lowest}
          icon={<Trophy className="h-5 w-5 text-primary" />}
        />
        <StatBox
          label="Worst Finish"
          value={raceData.highest}
          icon={<Target className="h-5 w-5 text-muted-foreground" />}
        />
        <StatBox
          label="Average Finish"
          value={Math.round(raceData.average)}
          icon={<Medal className="h-5 w-5 text-yellow-600" />}
        />
        <StatBox
          label="Wins"
          value={raceData.wins}
          icon={<Trophy className="h-5 w-5 text-primary" />}
        />
        <StatBox
          label="Podiums"
          value={raceData.podiums}
          icon={<Medal className="h-5 w-5 text-yellow-600" />}
        />
        <StatBox
          label="Most Gained"
          value={raceData.bestGain}
          icon={<ChevronUp className="h-5 w-5 text-green-500" />}
        />
      </div>
    </div>
  );
};
