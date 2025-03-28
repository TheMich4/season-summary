import { StatBox } from "@/components/stat-box";
import { Trophy, Target, Medal, Star } from "lucide-react";

export const SOF = ({ sof }: Record<string, any>) => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border bg-background/40 p-4 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <Star className="h-5 w-5 text-primary" />
        <span className="text-base font-medium">Strength of Field</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatBox
          label="Average SOF"
          value={Math.round(sof.average)}
          icon={<Medal className="h-5 w-5 text-yellow-600" />}
        />
        <StatBox
          label="Highest SOF"
          value={sof.highest}
          icon={<Trophy className="h-5 w-5 text-primary" />}
        />
        <StatBox
          label="Lowest SOF"
          value={sof.lowest}
          icon={<Target className="h-5 w-5 text-muted-foreground" />}
        />
        <StatBox
          label="Highest Win SOF"
          value={sof.highestWin}
          icon={<Star className="h-5 w-5 text-primary" />}
        />
      </div>
    </div>
  );
};
