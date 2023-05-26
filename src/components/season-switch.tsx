import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "./ui/button"

export const SeasonSwitch = () => {
  return (
    <div className="flex flex-row items-center justify-center gap-2 rounded-md">
      <Button size="xs" variant="outline" disabled>
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <span>
        <span className="font-bold">2023</span>
        {" Season "}
        <span className="font-bold">2</span>
      </span>

      <Button size="xs" variant="outline" disabled>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
