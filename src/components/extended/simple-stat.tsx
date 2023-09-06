export const SimpleStat = ({ label, value }) => {
  return (
    <div className="flex w-full flex-col rounded-md border p-4 text-start">
      <div className="pb-2 text-base font-normal tracking-tight">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
};
