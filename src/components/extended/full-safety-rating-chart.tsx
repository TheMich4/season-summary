"use client";

// import {
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// import { useMemo } from "react";

import { Skeleton } from "../ui/skeleton";
import { useTailwindTheme } from "@/hooks/use-tailwind-theme";

// const CustomTooltip = ({
//   active,
//   payload,
// }: {
//   active: boolean;
//   payload: any;
// }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="grid grid-cols-2 gap-2 rounded-md border bg-background p-2 text-muted-foreground">
//         <div>
//           <div className="text-xs">IRATING</div>
//           <div className="font-bold text-foreground">{payload[0].value}</div>
//         </div>
//       </div>
//     );
//   }

//   return null;
// };

export const FullSafetyRatingChart = ({}) => {
  const theme = useTailwindTheme();

  return (
    <div className="flex w-full flex-col gap-2 rounded-md border p-4 text-start">
      <p className="text-2xl font-semibold leading-none tracking-tight">
        Safety rating:
      </p>
      <p className="text-sm text-muted-foreground">
        How your iRating developed over the season.
      </p>
      <div className="flex h-full w-full max-w-full self-center sm:w-full sm:max-w-md md:max-w-full">
        <Skeleton className="h-full min-h-[150px] w-full" />
        {/* <ResponsiveContainer height={150}>
          <LineChart height={150} data={data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={theme.colors?.primary.DEFAULT}
              dot={false}
              strokeWidth={2}
            />

            <XAxis dataKey="when" hide />
            <YAxis domain={[min, max]} hide />
            <Tooltip
              content={<CustomTooltip active={false} payload={undefined} />}
            />
          </LineChart>
        </ResponsiveContainer> */}
      </div>
    </div>
  );
};