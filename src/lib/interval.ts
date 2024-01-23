export const getIntervalString = (interval: number) => {
  const date = new Date(interval / 10);

  const minutes = date.getMinutes();
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const milliseconds = date.getMilliseconds().toString().padStart(3, "0");

  if (minutes === 0) {
    return `${seconds}.${milliseconds}`;
  }

  return `${minutes}:${seconds}.${milliseconds}`;
};
