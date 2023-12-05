"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronRight, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { getProfileUrl } from "@/server/get-profile-url";

export const ProfileCard = ({
  name,
  iracingId,
  avatarUrl,
}: {
  name?: string;
  iracingId?: number | string;
  avatarUrl?: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = async () => {
    const url = iracingId ? await getProfileUrl(`${iracingId}`) : pathname;
    router.push(url);
  };

  return (
    <div className="flex flex-row justify-between rounded-md border bg-background/40 p-2">
      <div className="flex flex-row items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatarUrl ?? ""} />
          <AvatarFallback>
            <User className="h-6 w-6 self-center dark:text-primary" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="font-bold">
            {name ? name : <Skeleton className="h-4 w-32" />}
          </div>
          <div className="text-xs italic dark:text-primary/80">
            {iracingId ? (
              `(${iracingId})`
            ) : (
              <Skeleton className="mt-2 h-3 w-16" />
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <Link href={"#"} className="ml-2" onClick={handleClick}>
          <Button size="sm" variant="ghost">
            <ChevronRight className="h-4 w-4 dark:text-primary" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
