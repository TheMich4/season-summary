"use client"

import { useState } from "react"
import { iracingSearch } from "@/server/iracing-search"
import type { GetDriversResponse } from "iracing-api"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Profile } from "@/components/profile"

type Drivers = GetDriversResponse

export const Search = () => {
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Drivers>([])
  const [searchError, setSearchError] = useState("")

  const handleSearch = async () => {
    setSearchError("")
    setLoading(true)
    const results = await iracingSearch(searchTerm)
      .catch(() => {
        setSearchError("No results found")
      })
      .then((res) => {
        if (res?.length === 0) {
          setSearchError("No results found")
        } else {
          setSearchError("")
        }
        return res
      })

    setSearchResults(results ?? [])
    setLoading(false)
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex flex-col gap-1 md:flex-row ">
        <Input
          placeholder="Search for iRacing profile"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          type="submit"
          className="w-full md:w-36"
          disabled={loading || searchTerm.length < 3}
          onClick={handleSearch}
        >
          {loading && <Loader2 className="mr-1 h-5 w-5 animate-spin" />}
          <span>{loading ? "Searching..." : "Search"}</span>
        </Button>
      </div>

      {searchError && (
        <span className="text-center text-sm">{searchError}</span>
      )}

      {searchResults.length > 0 && (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {searchResults.map(({ custId, displayName }) => (
            <Profile key={custId} iracingId={custId} name={displayName} />
          ))}
        </div>
      )}
    </div>
  )
}
