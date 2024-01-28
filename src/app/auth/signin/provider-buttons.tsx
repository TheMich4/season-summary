"use client";

import { type ClientSafeProvider, type LiteralUnion, signIn } from "next-auth/react";

import { type BuiltInProviderType } from "next-auth/providers/index";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { RxDiscordLogo } from "react-icons/rx";

const IconClassName = "w-4 h-4 mr-2";

const ProviderIcon = ({ provider }: { provider: string }) => {
  if (provider === "GitHub") return <Github className={IconClassName} />;
  if (provider === "Discord")
    return <RxDiscordLogo className={IconClassName} />;

  return null;
};

export const ProviderButtons = ({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}) => {
  return (
    <div className="flex flex-col gap-2 py-2">
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <Button
              onClick={() => signIn(provider.id)}
              className="w-full"
              variant="outline"
            >
              <ProviderIcon provider={provider.name} />
              Sign in with {provider.name}
            </Button>
          </div>
        ))}
    </div>
  );
};
