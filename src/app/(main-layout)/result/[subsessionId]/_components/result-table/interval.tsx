const getIntervalString = (interval: number) => {
  const date = new Date(interval / 10);

  const minutes = date.getMinutes();
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const milliseconds = date.getMilliseconds().toString().padStart(3, "0");

  if (minutes === 0) {
    return `${seconds}.${milliseconds}`;
  }

  return `${minutes}:${seconds}.${milliseconds}`;
};

export const Interval = ({
  interval,
  totalLaps,
  lapsComplete,
  position,
}: {
  interval: number;
  totalLaps?: number;
  lapsComplete?: number;
  position: number;
}) => {
  if (position === 0) {
    return <p className="text-xs font-bold dark:text-primary">Winner</p>;
  }

  if (interval === 0 || (interval === -1 && !totalLaps)) {
    return null;
  }

  if (interval === -1 && totalLaps && lapsComplete) {
    return <p className="text-xs">-{totalLaps - lapsComplete} Laps</p>;
  }

  return <p className="text-xs">-{getIntervalString(interval)}</p>;
};
