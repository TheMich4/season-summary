export const Delta = ({
  value,
  previous,
  invert = false,
  parseResult = (result: number) => `${result}`,
}: {
  value: number;
  previous: number;
  invert?: boolean;
  parseResult?: (result: number) => string;
}) => {
  const expectedHigh = invert ? previous : value;
  const expectedLow = invert ? value : previous;

  if (expectedHigh > expectedLow) {
    return (
      <p className="flex flex-row text-green-500">
        <p>↑</p>
        {parseResult(expectedHigh - expectedLow)}
      </p>
    );
  } else if (expectedHigh < expectedLow) {
    return (
      <p className="flex flex-row text-red-500">
        <p>↓</p>
        {parseResult(expectedLow - expectedHigh)}
      </p>
    );
  }

  return (
    <p className="text-gray-500">
      <p>=0</p>
    </p>
  );
};
