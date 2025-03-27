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
import { Cog, LogOut, Shield, User } from "lucide-react";
import posthog from "posthog-js";

interface AuthButtonProps {
  isAdmin: boolean;
}

export const AuthButton = ({ isAdmin }: AuthButtonProps) => {
  const { data: sessionData } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="group relative">
          {/* Animated ring effect on hover */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 opacity-75 blur-sm transition-all duration-500 group-hover:from-primary/10 group-hover:via-primary/20 group-hover:to-primary/10 dark:group-hover:from-primary/20 dark:group-hover:via-primary/30 dark:group-hover:to-primary/20"></div>
          
          <Avatar className="size-8 cursor-pointer border-2 border-transparent bg-slate-100 shadow-sm transition-all group-hover:border-white group-hover:shadow-md dark:bg-slate-800 dark:group-hover:border-slate-700">
            <AvatarImage src={sessionData?.user?.image ?? ""} />
            <AvatarFallback className="bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
              {sessionData?.user?.name?.charAt(0) ?? <User className="size-4" />}
            </AvatarFallback>
          </Avatar>
          
          {/* Online status indicator - only show when logged in */}
          {sessionData && (
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500 dark:border-slate-800"></span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 border-primary/20 bg-white/95 p-1.5 backdrop-blur-md border-primary/10 bg-background/90">
        {sessionData ? (
          <>
            <DropdownMenuLabel className="flex items-center gap-2.5 rounded-md px-2 py-1.5 font-normal">
              <Avatar className="size-7 border border-primary/10">
                <AvatarImage src={sessionData?.user?.image ?? ""} />
                <AvatarFallback className="text-xs">
                  {sessionData?.user?.name?.charAt(0) ?? <User className="size-3" />}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {sessionData.user?.name ?? "My Account"}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {sessionData.user?.email ?? ""}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1 bg-primary/10" />
            {isAdmin && (
              <DropdownMenuItem className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-primary/10 hover:text-primary dark:text-slate-300 dark:hover:bg-primary/10 dark:hover:text-primary">
                <Shield className="size-4 text-amber-500 dark:text-amber-400" />
                <Link href="/admin" className="w-full">
                  Admin Dashboard
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-primary/10 hover:text-primary dark:text-slate-300 dark:hover:bg-primary/10 dark:hover:text-primary">
              <Cog className="size-4 text-slate-500 dark:text-slate-400" />
              <Link href="/profile/settings" className="w-full">
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1 bg-primary/10" />
            <DropdownMenuItem
              onClick={() => {
                posthog.capture("sign_out_click");
                void signOut();
              }}
              className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <LogOut className="size-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem
            onClick={() => {
              posthog.capture("sign_in_click");
              void signIn();
            }}
            className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-primary/10 hover:text-primary dark:text-slate-300 dark:hover:bg-primary/10 dark:hover:text-primary"
          >
            <User className="size-4 text-slate-500 dark:text-slate-400" />
            <span>Sign in</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
