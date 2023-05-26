import { recapKeyToName } from "@/config/recap"

type MemberRecapValue = keyof typeof recapKeyToName

const Stat = ({ name, value }: { name: string; value: number }) => {
  // Omit favorite car and track
  if (typeof value !== "number") return null

  return (
    <div className="flex flex-col gap-1 rounded-md border p-2">
      <div className="text-center text-lg font-semibold">{name}:</div>
      <div className="flex h-full items-end justify-center align-bottom text-3xl font-bold">
        {value}
      </div>
    </div>
  )
}

export const MemberRecap = ({ memberRecap = {} }) => {
  console.log({ memberRecap })

  return (
    <div className="grid w-full grid-cols-1 grid-rows-2 gap-2 sm:grid-cols-2 md:grid-cols-7 md:grid-rows-1">
      {Object.entries(memberRecap).map(([key, value]) => (
        <Stat
          name={recapKeyToName[key as MemberRecapValue]}
          value={value as number}
          key={key}
        />
      ))}
    </div>
  )
}
