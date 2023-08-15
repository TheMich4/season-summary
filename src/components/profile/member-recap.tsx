import { Stat } from "@/components/profile/stat";
import { recapKeyToName } from "@/config/recap";

type MemberRecapValue = keyof typeof recapKeyToName;

export const MemberRecap = ({ memberRecap = {} }) => {
  return (
    <div className="grid w-full grid-cols-1 grid-rows-2 gap-2 sm:grid-cols-2 md:grid-cols-7 md:grid-rows-1">
      {Object.entries(memberRecap)
        .filter(([_, value]) => ["string", "number"].includes(typeof value))
        .map(([key, value]) => (
          <Stat
            name={recapKeyToName[key as MemberRecapValue]}
            value={value as number}
            key={key}
          />
        ))}
    </div>
  );
};
