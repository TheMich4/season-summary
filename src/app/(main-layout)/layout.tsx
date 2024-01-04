import "../../styles/globals.css";

import {
  PHProvider,
  PostHogPageView,
} from "@/components/providers/ph-provider";

import { AuthProvider } from "@/components/providers/auth-provider";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { QueryProvider } from "@/components/providers/query-provider";
import { SiteHeader } from "@/components/nav/site-header";
import { Suspense } from "react";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { VisitedProvider } from "@/components/providers/visited-provider";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { env } from "@/env.mjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  if (env.MAINTENANCE) {
    return (
      <html lang="en">
        <body className="my-gradient flex min-h-screen flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold">Maintenance</h1>
          <p className="text-lg">
            {"We are currently performing maintenance. "}
            <br className="visible sm:hidden" />
            {"Please check back later"}.
          </p>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <Suspense>
        <PostHogPageView />
      </Suspense>

      <body
        className={cn(
          inter.className,
          "scrollbar-thumb-foreground scrollbar-track-background dark:scrollbar-thumb-primary scrollbar-thin min-h-full my-gradient"
        )}
      >
        <PHProvider>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <QueryProvider>
                <VisitedProvider>
                  <div className="relative flex min-h-screen flex-col">
                    <SiteHeader />
                    <div className="flex-1">{children}</div>

                    <Toaster />
                  </div>
                  <TailwindIndicator />
                </VisitedProvider>
              </QueryProvider>
            </ThemeProvider>
          </AuthProvider>
        </PHProvider>
      </body>
    </html>
  );
}
