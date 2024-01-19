"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
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
        <Avatar className="size-8">
          <AvatarImage src={avatarUrl ?? ""} />
          <AvatarFallback>
            <User className="size-6 self-center dark:text-primary" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="font-bold">
            {name ?? <Skeleton className="h-4 w-32" />}
          </div>
          {iracingId ? (
            <Badge
              className="w-fit dark:text-primary"
              size="xs"
              variant="secondary"
            >
              {iracingId}
            </Badge>
          ) : (
            <Skeleton className="mt-2 h-3 w-16" />
          )}
        </div>
      </div>
      <div className="flex items-center">
        <Link href={"#"} className="ml-2" onClick={handleClick}>
          <Button size="sm" variant="ghost">
            <ChevronRight className="size-4 dark:text-primary" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
