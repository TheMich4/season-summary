"use client";

import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import type { GetDriversResponse } from "iracing-api";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { ProfileCard } from "@/components/common/profile-card";
import { iracingSearch } from "@/server/iracing-search";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

type Drivers = GetDriversResponse;

const formSchema = z.object({
  searchTerm: z.string().min(3),
});

export const Search = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("q");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchTerm: search ?? "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Drivers>([]);
  const [searchError, setSearchError] = useState("");

  const handleSearch = async ({ searchTerm }: z.infer<typeof formSchema>) => {
    setSearchResults([]);
    setSearchError("");
    setLoading(true);

    const results = await iracingSearch(searchTerm)
      .catch(() => {
        setSearchError("No profiles found");
      })
      .then((res) => {
        if (res?.length === 0) {
          setSearchError("No profiles found");
        } else {
          setSearchError("");
        }
        return res;
      });

    setSearchResults(results ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (search) {
      void handleSearch({ searchTerm: search });
    }
  }, [search]);

  return (
    <div className="flex w-full flex-col gap-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSearch)}
          className="flex w-full flex-col gap-1 self-center sm:max-w-[570px] sm:flex-row"
        >
          <FormField
            control={form.control}
            name="searchTerm"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Search for iRacing profile"
                    {...field}
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full md:w-44" disabled={loading}>
            {loading && <Loader2 className="mr-1 h-5 w-5 animate-spin" />}
            <span>{loading ? "Searching..." : "Search"}</span>
          </Button>
        </form>
      </Form>

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
