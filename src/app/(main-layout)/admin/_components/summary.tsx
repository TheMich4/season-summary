import { SimpleStat } from "@/app/driver/[iracingId]/full/_components/extended/simple-stat";
import { getAdminSummary } from "@/server/get-admin-summary";

const userStatToLabel: Record<string, string> = {
  _all: "Total users",
  emailVerified: "Email verified",
  favoriteCategory: "Favorite category",
  preferFull: "Prefer full",
  isAdmin: "Admins",
  iracingId: "iRacing ID set",
};

export const Summary = async () => {
  const summaryData = await getAdminSummary();

  if (!summaryData) {
    return <div>Failed loading</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6 ">
        {Object.entries(summaryData.userCount).map(([label, value]) => (
          <SimpleStat
            label={userStatToLabel[label] ?? "Unknown"}
            value={value}
            key={label}
          />
        ))}
      </div>
    </div>
  );
};
