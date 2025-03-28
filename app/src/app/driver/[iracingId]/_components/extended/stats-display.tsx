import { StatBox } from "@/components/stat-box";
import { type LucideIcon } from "lucide-react";

interface StatItem {
  label: string;
  value: number;
  icon: React.ReactNode;
}

interface StatsDisplayProps {
  title: string;
  icon: LucideIcon;
  stats: StatItem[];
}

export const StatsDisplay = ({
  title,
  icon: Icon,
  stats,
}: StatsDisplayProps) => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-xl border border-primary/30 bg-background/60 p-4 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-primary" />
        <span className="text-base font-medium">{title}</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {stats.map((stat) => (
          <StatBox
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>
    </div>
  );
};

