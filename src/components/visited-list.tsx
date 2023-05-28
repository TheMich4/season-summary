"use client"

import { useVisited } from "./visited-provider"

export const VisitedList = () => {
  const { visited } = useVisited()

  return <div>VisitedList</div>
}
