export const getUserSettings = async (userId?: string) => {
  if (!userId) {
    return null;
  }

  const userSettings = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      iracingId: true,
      preferFull: true,
      favoriteCategory: true,
    },
  });

  return userSettings;
};
