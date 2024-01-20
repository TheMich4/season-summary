import { useMemo } from "react";
import { Counter } from "./counter";

export const Delta = ({
  value,
  previous,
  invert = false,
  precision = 0,
  useCounter = false,
}: {
  value: number;
  previous: number;
  invert?: boolean;
  precision?: number;
  useCounter?: boolean;
}) => {
  const { className, icon, counterValue } = useMemo(() => {
    const expectedHigh = invert ? previous : value;
    const expectedLow = invert ? value : previous;

    if (expectedHigh > expectedLow) {
      return {
        className: "flex flex-row text-green-500",
        icon: "↑",
        counterValue: expectedHigh - expectedLow,
      };
    } else if (expectedHigh < expectedLow) {
      return {
        className: "flex flex-row text-red-500",
        icon: "↓",
        counterValue: expectedLow - expectedHigh,
      };
    }

    return {
      className: "text-gray-500",
      icon: "=",
      counterValue: 0,
    };
  }, [invert, previous, value]);

  return (
    <p className={className}>
      <p>{icon}</p>
      <Counter
        value={counterValue}
        precision={precision}
        disabled={!useCounter}
      />
    </p>
  );
};
