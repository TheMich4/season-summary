"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getProfileUrl } from "@/server/get-profile-url";
import { ChevronRight, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import posthog from "posthog-js";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";

interface SidebarProfileCardProps {
  name?: string | null;
  iracingId: string;
  avatarUrl?: string | null;
}

export const SidebarProfileCard = ({
  name,
  iracingId,
  avatarUrl,
}: SidebarProfileCardProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const displayName = useMemo(() => {
    const nameSplit = name?.split(" ");
    return nameSplit?.reduce((acc, curr, i) => {
      if (i === nameSplit.length - 1) return `${acc} ${curr}`;

      return `${acc} ${curr.charAt(0)}.`;
    }, "");
  }, [name]);

  const handleClick = async () => {
    posthog.capture("sidebar_profile_card_click", { iracingId });

    const url = iracingId ? await getProfileUrl(iracingId) : pathname;
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
        <div className="min-w-0 flex-1">
          <div className="truncate font-bold text-foreground/90">
            {displayName}
          </div>
        </div>
      </div>
      <div className="z-10 flex items-center">
        <Link href="#" onClick={handleClick} className="relative">
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
