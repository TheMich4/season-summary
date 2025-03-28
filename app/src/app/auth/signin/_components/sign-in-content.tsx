"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProviderButtons } from "../provider-buttons";
import { motion } from "framer-motion";
import type { ClientSafeProvider } from "next-auth/react";

interface SignInContentProps {
  providers: Record<string, ClientSafeProvider> | null;
}

export function SignInContent({ providers }: SignInContentProps) {
  return (
    <>
      <CardHeader className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <h2 className="text-center text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Season Summary
            </span>
          </h2>
          <p className="mt-4 text-center text-lg text-muted-foreground">
            Track your iRacing performance across seasons
          </p>
        </motion.div>
      </CardHeader>
      <CardContent className="mt-8 space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ProviderButtons providers={providers} />
        </motion.div>
      </CardContent>
    </>
  );
} 