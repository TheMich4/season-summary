"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
