"use client"

import { useMemo } from "react"
import { ChartData } from "iracing-api"
import { useTheme } from "next-themes"
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const CustomTooltip = ({
  active,
  payload,
}: {
  active: boolean
  payload: any
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md border bg-slate-800 p-2 text-white" border-0>
        <p>{payload[0].value}</p>
      </div>
    )
  }

  return null
}

export const IratingChart = ({
  chartData,
}: {
  chartData: Array<ChartData> | undefined
}) => {
  const { theme } = useTheme()

  const data = useMemo(
    () =>
      chartData?.map((cd) => ({
        ...cd,
        when: new Date(cd.when).toDateString(),
      })),
    [chartData]
  )
  const { min, max } = useMemo(() => {
    const values = Math.min(...data.map((d) => d.value))
    const min = Math.min(values)
    const max = Math.max(values)
    return { min, max }
  }, [data])

  console.log({ chartData, data })

  return (
    <div className="rounded-md border">
      <ResponsiveContainer width="100%" height={200}>
        <LineChart width={730} height={250} data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={theme === "dark" ? "#fff" : "#000"}
            dot={false}
            strokeWidth={2}
          />
          <XAxis dataKey="when" hide />
          <YAxis domain={[min, max]} hide />
          <Tooltip
            content={<CustomTooltip active={false} payload={undefined} />}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
