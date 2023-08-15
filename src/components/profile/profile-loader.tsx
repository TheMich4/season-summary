import { Loader2 } from "lucide-react";

// import { SeasonSwitch } from "@/components/season-switch";

export const ProfileLoader = ({
  iracingId,
  season = 2,
  year = 2023,
}: {
  iracingId: string;
  season?: number;
  year?: number;
}) => {
  return (
    <div className="flex w-full flex-col gap-2">
      {/* <SeasonSwitch iracingId={iracingId} season={season} year={year} /> */}
      <div className="align-center flex flex-row justify-center gap-2 text-2xl font-semibold">
        <Loader2 className="h-6 w-6 animate-spin self-center dark:text-primary" />
        {"Loading stats for: "}
        <span className="self-center font-extrabold leading-tight tracking-tighter dark:text-primary">
          {iracingId}
        </span>
      </div>
      <span className="text-center text-sm">
        It can take longer if you have many races this season!
      </span>
    </div>
  );
};
