"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";

import Link from "next/link";
import { User } from "lucide-react";
import posthog from "posthog-js";

interface AuthButtonProps {
  isAdmin: boolean;
}

export const AuthButton = ({ isAdmin }: AuthButtonProps) => {
  const { data: sessionData } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-8 cursor-pointer">
          <AvatarImage src={sessionData?.user?.image ?? ""} />
          <AvatarFallback>
            {sessionData?.user?.name?.charAt(0) ?? <User className="size-5" />}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {sessionData ? (
          <>
            <DropdownMenuLabel>
              {sessionData.user?.name ?? "My Account"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {isAdmin && (
              <DropdownMenuItem>
                <Link href="/admin" className="w-full">
                  Admin Page
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <Link href="/profile/settings" className="w-full">
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                posthog.capture("sign_out_click");
                void signOut();
              }}
              className="w-full"
            >
              Sign out
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem
            onClick={() => {
              posthog.capture("sign_in_click");
              void signIn();
            }}
            className="w-full"
          >
            Sign in
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
