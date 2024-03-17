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
import { env } from "@/env";
import { Footer } from "@/components/footer";
import { Maintenance } from "@/components/maintenance";
import { Sidebar } from "./_components/sidebar/sidebar";
import { TRPCReactProvider } from "@/trpc/react";

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
    return <Maintenance />;
  }

  return (
    <html lang="en">
      <Suspense>
        <PostHogPageView />
      </Suspense>

      <body
        className={cn(
          inter.className,
          "my-gradient flex h-screen max-h-screen flex-col overflow-hidden ",
        )}
      >
        <TRPCReactProvider>
          <PHProvider>
            <AuthProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
              >
                <QueryProvider>
                  <VisitedProvider>
                    <SiteHeader fullWidth />
                    <div className="flex size-full flex-row overflow-hidden">
                      <Sidebar />

                      <div className="flex size-full max-h-full flex-col justify-between overflow-auto scrollbar-thin scrollbar-track-background scrollbar-thumb-foreground dark:scrollbar-thumb-primary">
                        {children}

                        <Footer />
                      </div>

                      <Toaster />
                    </div>

                    <TailwindIndicator />
                  </VisitedProvider>
                </QueryProvider>
              </ThemeProvider>
            </AuthProvider>
          </PHProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
