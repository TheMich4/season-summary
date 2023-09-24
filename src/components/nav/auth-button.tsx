"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "../ui/button";

export const AuthButton = () => {
  const { data: sessionData } = useSession();

  console.log({ sessionData });

  if (!sessionData) return <Button onClick={() => signIn()}>Sign in</Button>;

  return (
    <Avatar className="h-8 w-8 cursor-pointer" onClick={() => signOut()}>
      <AvatarImage src={sessionData.user?.image ?? ""} />
      <AvatarFallback>
        {sessionData.user?.name?.charAt(0) ?? "U"}
      </AvatarFallback>
    </Avatar>
  );
};
