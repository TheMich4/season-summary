"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "./ui/button"
import { Input } from "./ui/input"

export const IracingIdInput = () => {
  const router = useRouter()

  const [iracingId, setIracingId] = useState("")

  return (
    <>
      <Input
        placeholder="Search for your iRacing id"
        value={iracingId}
        onChange={(e) => setIracingId(e.target.value)}
      />
      <Button
        type="submit"
        className="w-full md:w-36"
        onClick={() => router.push(`/${iracingId}`)}
        disabled={!iracingId}
      >
        Go to Profile
      </Button>
    </>
  )
}
