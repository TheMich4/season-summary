"use client";

import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Settings, Search as SearchIcon, User } from "lucide-react";
import { type Session } from "next-auth";
import { signIn } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { getProfileUrl } from "@/server/get-profile-url";
import posthog from "posthog-js";
import { motion } from "framer-motion";

interface SearchProps {
  iracingId?: string | null;
  session?: Session | null;
  placeholder?: string;
}

export const Search = ({ iracingId, session, placeholder }: SearchProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const goToProfile = useCallback(
    async (id?: string) => {
      const url = id ? await getProfileUrl(id) : pathname;
      router.push(url);
    },
    [pathname, router],
  );

  const handleSearch = useCallback(() => {
    if (!value) return;

    if (isNaN(Number(value))) {
      router.push(`/search?q=${value}`);
    } else {
      void goToProfile(value);
    }
  }, [goToProfile, router, value]);

  const runCommand = useCallback((command: () => unknown) => {
    posthog.capture("search-command");

    setOpen(false);
    command();
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div className="relative w-full">
        <motion.div 
          className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary/50 to-yellow-300/50 opacity-0 blur"
          animate={{ opacity: isHovered ? 0.7 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative z-10 w-full justify-between rounded-md border-primary/20 bg-background/40 text-sm font-normal text-muted-foreground shadow-none backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-background/50 hover:shadow-[0_0_20px_rgba(234,179,8,0.15)]"
        >
          <motion.span 
            className="inline-flex items-center gap-2"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              animate={{ 
                rotate: isHovered ? [0, -10, 10, -5, 5, 0] : 0,
                scale: isHovered ? [1, 1.1, 1] : 1 
              }}
              transition={{ 
                duration: 0.6, 
                ease: "easeInOut",
                times: [0, 0.2, 0.4, 0.6, 0.8, 1] 
              }}
            >
              <SearchIcon className="h-4 w-4 text-primary" />
            </motion.span>
            {placeholder ?? "Search..."}
          </motion.span>
          <kbd className="pointer-events-none -mr-2 hidden h-5 select-none items-center gap-1 self-center rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type to search for profile..."
          value={value}
          onValueChange={setValue}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {value && (
            <CommandGroup heading="Search">
              <CommandItem
                onSelect={() => runCommand(handleSearch)}
              >{`Search for ${value}...`}</CommandItem>
            </CommandGroup>
          )}

          <CommandGroup heading="User">
            {iracingId && (
              <CommandItem
                value="Your profile"
                onSelect={() => runCommand(() => goToProfile(iracingId))}
              >
                <User className="mr-2 size-6" />
                Your Profile
              </CommandItem>
            )}
            {session && (
              <CommandItem
                value="Settings"
                onSelect={() =>
                  runCommand(() => router.push("/profile/settings"))
                }
              >
                <Settings className="mr-2 size-6" />
                Settings
              </CommandItem>
            )}
            {!session && (
              <CommandItem
                value="Sign in"
                onSelect={() => runCommand(() => signIn())}
              >
                <User className="mr-2 size-6" />
                Sign In
              </CommandItem>
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
