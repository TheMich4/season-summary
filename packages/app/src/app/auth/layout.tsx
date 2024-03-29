import "../../styles/globals.css";

import { AuthProvider } from "@/components/providers/auth-provider";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

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
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "scrollbar-thumb-foreground scrollbar-track-background dark:scrollbar-thumb-primary scrollbar-thin min-h-full my-gradient"
        )}
      >
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <div className="flex-1">{children}</div>
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
