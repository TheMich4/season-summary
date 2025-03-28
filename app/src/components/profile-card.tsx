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
  name?: string | null;
  iracingId?: number | string;
  avatarUrl?: string | null;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = async () => {
    const url = iracingId ? await getProfileUrl(`${iracingId}`) : pathname;
    router.push(url);
  };

  return (
    <div className="group relative flex flex-row justify-between overflow-hidden rounded-md border border-primary/20 bg-background/40 p-3 transition-colors hover:border-primary/50 hover:shadow-sm">
      {/* Subtle glow effect */}
      <div className="absolute -right-4 -top-4 h-12 w-12 rounded-full bg-primary/5 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />

      <div className="z-10 flex flex-row items-center gap-3">
        <Avatar className="size-10 border-2 border-primary/10 shadow-sm">
          <AvatarImage src={avatarUrl ?? ""} />
          <AvatarFallback className="bg-background/50 backdrop-blur-sm">
            <User className="size-6 text-primary/80" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="font-bold text-foreground/90">
            {name ?? <Skeleton className="h-4 w-32" />}
          </div>
          {iracingId ? (
            <Badge
              className="mt-1 w-fit bg-primary/10 text-foreground/70 hover:bg-primary/20"
              size="xs"
              variant="secondary"
            >
              #{iracingId}
            </Badge>
          ) : (
            <Skeleton className="mt-2 h-3 w-16" />
          )}
        </div>
      </div>
      <div className="z-10 flex items-center">
        <Link href={"#"} onClick={handleClick} className="relative">
          <Button
            size="sm"
            variant="ghost"
            className="aspect-square h-9 w-9 rounded-full p-0 text-foreground/70 transition-transform group-hover:translate-x-1 hover:text-primary"
          >
            <ChevronRight className="size-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
