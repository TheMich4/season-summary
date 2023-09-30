"use client";

import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";

import { BuiltInProviderType } from "next-auth/providers/index";
import { Button } from "@/components/ui/button";

export const ProviderButtons = ({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}) => {
  return (
    <div>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <Button onClick={() => signIn(provider.id)} className="w-full">
            Sign in with {provider.name}
          </Button>
        </div>
      ))}
    </div>
  );
};
