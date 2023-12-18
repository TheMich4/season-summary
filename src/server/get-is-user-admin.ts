import { authOptions, prisma } from "@/config/auth-options";

import { getServerSession } from "next-auth";

export const getIsUserAdmin = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return false;
  }

  const data = await prisma.user.findFirst({
    where: {
      id: session.user.id,
    },
    select: {
      isAdmin: true,
    },
  });

  return data?.isAdmin ?? false;
};
