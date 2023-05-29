import Link from "next/link"
import { ChevronRight, User } from "lucide-react"

import { Button } from "./ui/button"

export const Profile = ({
  name,
  iracingId,
}: {
  name: string
  iracingId: number | string
}) => {
  return (
    <div className="flex flex-row justify-between rounded-md border p-2">
      <div className="flex flex-row gap-2">
        <User className="h-6 w-6 self-center" />
        <div className="flex flex-col">
          <div className="font-bold">{name}</div>
          <div className="text-sm">({iracingId})</div>
        </div>
      </div>
      <div className="flex items-center">
        <Link href={`${iracingId}`}>
          <Button size="sm" variant="ghost">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
