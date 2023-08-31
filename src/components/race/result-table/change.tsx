export const Change = ({ change }: { change: number }) => {
  if (!change || change === 0) {
    return null;
  }

  if (change > 0) {
    return <p className="text-green-500 text-xs">+{change}</p>;
  }

  return <p className="text-red-500 text-xs">{change}</p>;
};
