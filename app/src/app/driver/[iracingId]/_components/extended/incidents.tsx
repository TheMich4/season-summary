import { StatBox } from "@/components/stat-box";
import { AlertTriangle, ChevronDown, ChevronUp, Target } from "lucide-react";

export const Incidents = ({ incidents }: Record<string, any>) => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border bg-background/40 p-4 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-red-500" />
        <span className="text-base font-medium">Incidents</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatBox
          label="Total Incidents"
          value={incidents.total}
          icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
        />
        <StatBox
          label="Average Incidents"
          value={Math.round(incidents.average)}
          icon={<Target className="h-5 w-5 text-yellow-600" />}
        />
        <StatBox
          label="Most Gained"
          value={incidents.bestGain}
          icon={<ChevronUp className="h-5 w-5 text-green-500" />}
        />
        <StatBox
          label="Most Lost"
          value={incidents.worstLoss}
          icon={<ChevronDown className="h-5 w-5 text-red-500" />}
        />
      </div>
    </div>
  );
};
