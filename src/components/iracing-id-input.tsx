"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const IracingIdInput = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const href = useMemo(() => {
    if (searchTerm.length < 3) return "#";

    if (isNaN(Number(searchTerm))) return `/search?q=${searchTerm}`;

    return `/${searchTerm}`;
  }, [searchTerm]);

  return (
    <>
      <Input
        placeholder="Search for iRacing profile"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Link href={href}>
        <Button
          type="submit"
          className="w-full md:w-36"
          disabled={searchTerm.length < 3}
        >
          Go to Profile
        </Button>
      </Link>
    </>
  );
};
