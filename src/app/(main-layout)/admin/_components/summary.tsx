import { StatBox } from "@/components/stat-box";
import { api } from "@/trpc/server";

const userStatToLabel: Record<string, string> = {
  _all: "Total users",
  emailVerified: "Email verified",
  favoriteCategory: "Favorite category",
  preferFull: "Prefer full",
  isAdmin: "Admins",
  iracingId: "iRacing ID set",
};

export const Summary = async () => {
  const summaryData = await api.admin.getSummary.query();

  if (!summaryData) {
    return <div>Failed loading</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6 ">
        {Object.entries(summaryData.userCount).map(([label, value]) => (
          <StatBox
            label={userStatToLabel[label] ?? "Unknown"}
            value={value}
            key={label}
          />
        ))}
      </div>
    </div>
  );
};
