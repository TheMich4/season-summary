import { AuthButton } from "./auth-button";
import { FaXTwitter } from "react-icons/fa6";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { MainNav } from "./main-nav";
import { ThemeSwitch } from "./theme-switch";
import { buttonVariants } from "@/components/ui/button";
import { getIsUserAdmin } from "@/server/get-is-user-admin";
import { siteConfig } from "@/config/site";

export async function SiteHeader() {
  const isAdmin = await getIsUserAdmin();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/50 backdrop-blur">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center gap-2">
            <div className="flex flex-row gap-0">
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
                  })}
                >
                  <FaXTwitter className="h-5 w-5" />
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
                  })}
                >
                  <Icons.gitHub className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </div>
              </Link>
            </div>

            <ThemeSwitch />
            <AuthButton isAdmin={isAdmin} />
          </nav>
        </div>
      </div>
    </header>
  );
}
