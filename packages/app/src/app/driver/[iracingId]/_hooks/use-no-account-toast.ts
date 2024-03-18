import type { Session } from "next-auth";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export const useNoAccountToast = (session: Session | null) => {
  const { toast } = useToast();

  useEffect(() => {
    if (session) return;

    toast({
      title: "No favorite category",
      description:
        "Create an account to choose your favorite category, iRacing account and more in the future!",
      variant: "info",
      duration: 10000,
    });
  }, [session, toast]);
};
