"use client";

import { StatBox } from "@/components/stat-box";

interface StatsClientProps {
  stats: {
    current: {
      starts: number;
      wins: number;
      top5: number;
      laps: number;
      avgStartPosition: number;
      avgFinishPosition: number;
    };
    previous: {
      starts: number;
      wins: number;
      top5: number;
      laps: number;
      avgStartPosition: number;
      avgFinishPosition: number;
    };
  };
}

export const StatsClient = ({ stats }: StatsClientProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
      <StatBox
        label="Races"
        value={stats.current.starts}
        previous={stats.previous.starts}
      />
      <StatBox
        label="Wins"
        value={stats.current.wins}
        previous={stats.previous.wins}
      />
      <StatBox
        label="Top 5"
        value={stats.current.top5}
        previous={stats.previous.top5}
      />
      <StatBox
        label="Laps"
        value={stats.current.laps}
        previous={stats.previous.laps}
      />
      <StatBox
        label="Avg Start"
        value={stats.current.avgStartPosition}
        previous={stats.previous.avgStartPosition}
        ignorePreviousIfZero
        ignorePreviousIfValueZero
        invert
      />
      <StatBox
        label="Avg Finish"
        value={stats.current.avgFinishPosition}
        previous={stats.previous.avgFinishPosition}
        ignorePreviousIfZero
        ignorePreviousIfValueZero
        invert
      />
    </div>
  );
}; 