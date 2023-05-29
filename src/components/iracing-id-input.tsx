"use client"

import { useState } from "react"
import Link from "next/link"

import { Button } from "./ui/button"
import { Input } from "./ui/input"

export const IracingIdInput = () => {
  const [iracingId, setIracingId] = useState("")

  return (
    <>
      <Input
        placeholder="Search for your iRacing id"
        value={iracingId}
        onChange={(e) => setIracingId(e.target.value)}
      />
      <Link href={iracingId ? `/${iracingId}` : "#"}>
        <Button
          type="submit"
          className="w-full md:w-36"
          disabled={isNaN(parseInt(iracingId, 10))}
        >
          Go to Profile
        </Button>
      </Link>
    </>
  )
}
