import type { ReactNode } from "react"

export const Stat = ({
  name,
  value,
}: {
  name: string
  value: string | number | ReactNode
}) => {
  return (
    <div className="flex flex-col gap-1 rounded-md border p-2">
      <div className="text-center text-lg font-semibold">{name}:</div>
      <div className="flex h-full items-end justify-center align-bottom text-3xl font-bold">
        {value}
      </div>
    </div>
  )
}