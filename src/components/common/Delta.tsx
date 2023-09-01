export const Delta = ({
  value,
  previous,
}: {
  value: number;
  previous: number;
}) => {
  if (value > previous) {
    return (
      <p className="text-green-500 flex flex-row">
        <p>↑</p>
        {value - previous}
      </p>
    );
  } else if (value < previous) {
    return (
      <p className="text-red-500 flex flex-row">
        <p>↓</p>
        {previous - value}
      </p>
    );
  }

  return (
    <p className="text-gray-500">
      <p>=0</p>
    </p>
  );
};
