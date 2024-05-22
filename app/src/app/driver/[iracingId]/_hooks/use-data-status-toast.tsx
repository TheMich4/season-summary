import { updateToast, useToast } from "@/components/ui/use-toast";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

export const useDataStatusToast = (data?: {
  status: string;
  message?: Record<string, unknown>;
}) => {
  const { toast, dismiss } = useToast();
  const [toastId, setToastId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const { status: wsStatus, message } = data ?? ({} as any);

    if (wsStatus === "DONE-MAINTENANCE") {
      toast({
        title: "iRacing is currently under maintenance.",
      });
    } else if (wsStatus === "PROGRESS" && message?.count.fetched > 0) {
      const oldRaces = message?.count.races - message?.count.newRaces;
      const fetchedRaces = oldRaces + message?.count.fetched;
      const percentage = Math.ceil((fetchedRaces / message?.count.races) * 100);
      const title = "Your full season data is being prepared!";
      const description =
        percentage === 100
          ? "Finishing up."
          : `Prepared ${fetchedRaces} of ${message?.count.races} races. ${percentage}% done.`;
      const duration = Infinity;
      const variant = "default";
      if (toastId) {
        updateToast({ id: toastId, title, description, duration, variant });
      } else {
        const { id } = toast({
          duration,
          title,
          description,
          variant,
        });
        setToastId(id);
      }
    } else if (wsStatus === "DONE" && toastId) {
      updateToast({
        id: toastId,
        title: (
          <span className="flex flex-row items-center gap-2">
            <CheckCircle2 className="size-6 text-green-700" />
            {"Season data is now up to date!"}
          </span>
        ) as any,
        description: "",
        variant: "success",
        duration: 5000,
      });
    }
  }, [toastId, data, toast]);

  // Reason: Its supposed to only run when page is changed
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => dismiss(toastId), []);
};
