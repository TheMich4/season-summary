import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Box from "~/components/Box";
import type { ChartData } from "~/types";
import { useMemo } from "react";

const Chart = ({ chartData }: { chartData: Array<ChartData> }) => {
  const data = useMemo(
    () =>
      chartData.map((cd) => ({
        ...cd,
        when: new Date(cd.when).toDateString(),
      })),
    [chartData]
  );
  const { min, max } = useMemo(() => {
    const values = Math.min(...data.map((d) => d.value));
    const min = Math.min(values);
    const max = Math.max(values);
    return { min, max };
  }, [data]);

  return (
    <Box>
      <div className="font-bold">iRating Progression:</div>
      <div className="rounded-md border border-slate-600">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart width={730} height={250} data={data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="rgb(241 245 249)"
              dot={false}
              strokeWidth={2}
            />
            <XAxis dataKey="when" hide />
            <YAxis domain={[min, max]} hide />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Box>
  );
};

export default Chart;
