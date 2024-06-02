export const getActivityData = (currentActivity: any, result: any) => {
  const startTime = result.startTime.split("T")[0];

  if (!startTime) return currentActivity;

  return {
    ...currentActivity,
    [startTime]: (currentActivity[startTime] ?? 0) + 1,
  };
};
