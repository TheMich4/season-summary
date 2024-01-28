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
import { Settings, User } from "lucide-react";
import { type Session } from "next-auth";
import { signIn } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { getProfileUrl } from "@/server/get-profile-url";
import posthog from "posthog-js";

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
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="relative w-full justify-between rounded-md bg-background/40 text-sm font-normal text-muted-foreground shadow-none"
      >
        <span className="inline-flex">{placeholder ?? "Search..."}</span>
        <kbd className="pointer-events-none -mr-2 hidden h-5 select-none items-center gap-1 self-center rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

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
