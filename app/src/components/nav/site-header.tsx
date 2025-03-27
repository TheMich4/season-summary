import { AuthButton } from "./auth-button";
import { FaXTwitter } from "react-icons/fa6";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { MainNav } from "./main-nav";
import { ThemeSwitch } from "./theme-switch";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";

interface SiteHeaderProps {
  fullWidth?: boolean;
}

export async function SiteHeader({ fullWidth = false }: SiteHeaderProps) {
  const isAdmin = await api.user.isAdmin.query();

  return (
    <header className="sticky top-0 z-40 w-full overflow-hidden border-b border-slate-200 bg-white/80 backdrop-blur-md transition-all dark:border-primary/20 dark:bg-background/60 dark:backdrop-blur-lg">
      {/* Animated accent line */}
      <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40 dark:from-primary/30 dark:via-primary/60 dark:to-primary/30" />
      
      {/* Decorative elements - only visible in dark mode */}
      <div className="absolute -left-20 top-6 h-6 w-32 rotate-45 rounded-full bg-primary/5 opacity-0 blur-xl transition-opacity dark:opacity-30" />
      <div className="absolute -right-20 top-6 h-6 w-32 -rotate-45 rounded-full bg-primary/5 opacity-0 blur-xl transition-opacity dark:opacity-30" />
      
      <div
        className={cn(
          "flex h-16 items-center sm:justify-between",
          fullWidth ? "px-4" : "px-4 md:container",
        )}
      >
        <MainNav items={siteConfig.mainNav} />
        <div className="flex items-center justify-end">
          <nav className="flex items-center gap-1">
            <div className="flex flex-row">
              <Link
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
                className="hidden md:block"
              >
                <div
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                    className: "text-slate-600 hover:bg-primary/10 hover:text-primary dark:text-slate-400 dark:hover:bg-primary/10 dark:hover:text-primary",
                  })}
                >
                  <FaXTwitter className="size-5" />
                  <span className="sr-only">Twitter</span>
                </div>
              </Link>
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="hidden md:block"
              >
                <div
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                    className: "text-slate-600 hover:bg-primary/10 hover:text-primary dark:text-slate-400 dark:hover:bg-primary/10 dark:hover:text-primary",
                  })}
                >
                  <Icons.gitHub className="size-5" />
                  <span className="sr-only">GitHub</span>
                </div>
              </Link>

              <ThemeSwitch />
            </div>

            <div className="ml-1">
              <AuthButton isAdmin={isAdmin} />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
