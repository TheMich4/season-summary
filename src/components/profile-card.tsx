"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, User } from "lucide-react";

import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export const ProfileCard = ({
  name,
  iracingId,
}: {
  name?: string;
  iracingId?: number | string;
}) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-row justify-between rounded-md border p-2">
      <div className="flex flex-row gap-2">
        <User className="h-6 w-6 self-center" />
        <div className="flex flex-col">
          <div className="font-bold">
            {name ? name : <Skeleton className="h-4 w-32" />}
          </div>
          <div className="text-sm">
            {iracingId ? (
              `(${iracingId})`
            ) : (
              <Skeleton className="mt-2 h-3 w-16" />
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <Link href={iracingId ? `/${iracingId}` : pathname} className="ml-2">
          <Button size="sm" variant="ghost">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
