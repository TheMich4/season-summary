"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getProfileUrl } from "@/server/get-profile-url";
import { ChevronRight, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import posthog from "posthog-js";
import { useMemo } from "react";

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
    <div className="flex flex-row items-center justify-between gap-2 rounded-md border bg-background/40 p-2">
      <div className="flex flex-row items-center gap-2">
        <Avatar className="size-[28px]">
          <AvatarImage src={avatarUrl ?? ""} />
          <AvatarFallback>
            <User className="size-5 self-center dark:text-primary" />
          </AvatarFallback>
        </Avatar>

        <div className="text-nowrap font-semibold">{displayName}</div>
      </div>
      <Link href="#" onClick={handleClick}>
        <Button size="sm" variant="ghost">
          <ChevronRight className="size-4 dark:text-primary" />
        </Button>
      </Link>
    </div>
  );
};
