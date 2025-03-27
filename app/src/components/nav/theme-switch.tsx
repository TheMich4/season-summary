"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import posthog from "posthog-js";

export function ThemeSwitch() {
  const { setTheme, theme } = useTheme();

  const changeTheme = useCallback(
    (newTheme: string) => {
      posthog.capture("theme_change", { theme: newTheme });
      setTheme(newTheme);
    },
    [setTheme]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="rounded-md text-slate-600 hover:bg-primary/10 hover:text-primary dark:text-slate-400 dark:hover:bg-primary/10 dark:hover:text-primary"
        >
          <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-40 border-primary/20 bg-white/95 p-1 backdrop-blur-md dark:border-primary/10 dark:bg-slate-950/90 dark:backdrop-blur-md"
      >
        <DropdownMenuItem 
          onClick={() => changeTheme("light")}
          className={`flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/10 dark:hover:text-primary ${theme === 'light' ? 'bg-primary/15 text-primary dark:bg-primary/15 dark:text-primary' : 'text-slate-700 dark:text-slate-300'}`}
        >
          <Sun className="size-4 text-amber-500" />
          <span className="flex-1">Light</span>
          {theme === 'light' && <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeTheme("dark")}
          className={`flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/10 dark:hover:text-primary ${theme === 'dark' ? 'bg-primary/15 text-primary dark:bg-primary/15 dark:text-primary' : 'text-slate-700 dark:text-slate-300'}`}
        >
          <Moon className="size-4 text-indigo-400" />
          <span className="flex-1">Dark</span>
          {theme === 'dark' && <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeTheme("system")}
          className={`flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/10 dark:hover:text-primary ${theme === 'system' ? 'bg-primary/15 text-primary dark:bg-primary/15 dark:text-primary' : 'text-slate-700 dark:text-slate-300'}`}
        >
          <span className="flex size-4 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-300">
            OS
          </span>
          <span className="flex-1">System</span>
          {theme === 'system' && <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
