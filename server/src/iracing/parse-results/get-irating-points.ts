export const getIratingPoints = (
  currentIratingPoints: Array<number>,
  result: any
) => {
  const { newiRating, oldiRating } = result;

  if (newiRating === -1) {
    return currentIratingPoints;
  }

  if (currentIratingPoints.length === 0 && oldiRating !== -1) {
    return [oldiRating, newiRating];
  }

  return [...currentIratingPoints, newiRating];
};
