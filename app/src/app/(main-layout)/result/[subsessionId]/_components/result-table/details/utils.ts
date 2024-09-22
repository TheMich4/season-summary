export const getLapTime = (lapTime: number) => {
  if (lapTime === -1) return "N/A";

  const minutes = Math.floor(lapTime / 60 / 10000);
  const seconds = (lapTime / 10000) % 60;

  return `${minutes}:${seconds.toFixed(3)}`;
};
