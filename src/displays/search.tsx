"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import type { GetDriversResponse } from "iracing-api";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { ProfileCard } from "@/components/common/profile-card";
import { iracingSearch } from "@/server/iracing-search";
import { useSearchParams } from "next/navigation";

type Drivers = GetDriversResponse;

export const Search = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("q");

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(search ?? "");
  const [searchResults, setSearchResults] = useState<Drivers>([]);
  const [searchError, setSearchError] = useState("");

  const handleSearch = async () => {
    setSearchResults([]);
    setSearchError("");
    setLoading(true);
    const results = await iracingSearch(searchTerm)
      .catch(() => {
        setSearchError("No results found");
      })
      .then((res) => {
        if (res?.length === 0) {
          setSearchError("No results found");
        } else {
          setSearchError("");
        }
        return res;
      });

    console.log(results);

    setSearchResults(results ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (search) {
      void handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-col gap-1 self-center sm:max-w-[570px] sm:flex-row">
        <Input
          disabled={loading}
          placeholder="Search for iRacing profile"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          type="submit"
          className="w-full sm:w-36"
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

      <div className="grid grid-cols-1 gap-2 py-2 md:grid-cols-2 lg:grid-cols-3">
        {searchResults.length > 0
          ? searchResults.map(({ custId, displayName }) => (
              <ProfileCard key={custId} iracingId={custId} name={displayName} />
            ))
          : loading &&
            new Array(12)
              .fill(undefined)
              .map((_, i) => <ProfileCard key={`search-${i}`} />)}
      </div>
    </div>
  );
};
