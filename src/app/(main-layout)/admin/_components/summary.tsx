import { SimpleStat } from "@/components/extended/simple-stat";
import { getAdminSummary } from "@/server/get-admin-summary";

export const Summary = async () => {
  const summaryData = await getAdminSummary();

  if (!summaryData) {
    return <div>Failed loading</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-5 gap-2">
        {Object.entries(summaryData.userCount).map(([label, value]) => (
          <SimpleStat
            label={
              label === "_all"
                ? "Total users"
                : label.replace(/([A-Z])/g, " $1")
            }
            value={value}
            key={label}
          />
        ))}
      </div>
    </div>
  );
};
