export const Delta = ({
  value,
  previous,
  invert = false,
}: {
  value: number;
  previous: number;
  invert?: boolean;
}) => {
  const expectedHigh = invert ? previous : value;
  const expectedLow = invert ? value : previous;

  if (expectedHigh > expectedLow) {
    return (
      <p className="flex flex-row text-green-500">
        <p>↑</p>
        {expectedHigh - expectedLow}
      </p>
    );
  } else if (expectedHigh < expectedLow) {
    return (
      <p className="flex flex-row text-red-500">
        <p>↓</p>
        {expectedLow - expectedHigh}
      </p>
    );
  }

  return (
    <p className="text-gray-500">
      <p>=0</p>
    </p>
  );
};
