import { StatBox } from "@/components/stat-box";
import { Trophy, Target, Medal, Flag } from "lucide-react";

export const QualifyingStats = ({ qualiData }: Record<string, any>) => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border bg-background/40 p-4 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <Flag className="h-5 w-5 text-primary" />
        <span className="text-base font-medium">Qualifying Performance</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatBox
          label="Best Grid"
          value={qualiData.lowest}
          icon={<Trophy className="h-5 w-5 text-primary" />}
        />
        <StatBox
          label="Worst Grid"
          value={qualiData.highest}
          icon={<Target className="h-5 w-5 text-muted-foreground" />}
        />
        <StatBox
          label="Average Grid"
          value={Math.round(qualiData.average)}
          icon={<Medal className="h-5 w-5 text-yellow-600" />}
        />
        <StatBox
          label="Pole Positions"
          value={qualiData.poles}
          icon={<Flag className="h-5 w-5 text-primary" />}
        />
      </div>
    </div>
  );
};
