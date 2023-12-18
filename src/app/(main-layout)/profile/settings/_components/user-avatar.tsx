"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { AvatarUploader } from "./avatar-uploader";
import { useSession } from "next-auth/react";

export const UserAvatar = () => {
  const { data: session } = useSession();

  return (
    <>
      <Avatar className="h-20 w-20 rounded-full">
        <AvatarUploader />
        <AvatarImage src={session?.user.image ?? ""} />
        <AvatarFallback>{session?.user?.name?.charAt(0) ?? "U"}</AvatarFallback>
      </Avatar>
    </>
  );
};
