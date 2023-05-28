"use client"

import { useEffect } from "react"

import { useVisited } from "./visited-provider"

export const VisitedManager = ({
  iracingId,
  displayName,
}: {
  iracingId: string
  displayName?: string
}) => {
  const { addVisited } = useVisited()

  useEffect(() => {
    console.log("effect")
    addVisited({ iracingId, name: displayName ?? "" })
  }, [iracingId, displayName])

  return null
}
