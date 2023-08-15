import { Icons } from "@/components/icons";
import Link from "next/link";
import { MainNav } from "./main-nav";
import { ThemeToggle } from "./theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>

            <ThemeToggle />

            {/* <a
              href="https://www.buymeacoffee.com/dyczkowski"
              target="_blank"
              className="h-9 min-w-[120px]"
              rel="noreferrer"
            >
              eslint-disable-next-line @next/next/no-img-element
              <img
                src="https://cdn.buymeacoffee.com/buttons/v2/default-black.png"
                alt="Buy Me A Coffee"
                className="min-w-32 h-9 min-w-[120px] rounded-md border transition duration-200 ease-in-out hover:scale-105"
              />
            </a> */}
          </nav>
        </div>
      </div>
    </header>
  );
}
