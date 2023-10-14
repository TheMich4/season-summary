import { NavLink } from "./nav-link";
import { authOptions } from "@/config/auth-options";
import { getServerSession } from "next-auth";
import { getUserSettings } from "@/server/get-user-settings";

export const ProfileNavLink = async () => {
  const session = await getServerSession(authOptions);
  const userSettings = await getUserSettings(session?.user?.id);

  const item = {
    href: userSettings?.iracingId ? `/driver/${userSettings.iracingId}` : "",
    title: "Your Profile",
  };

  return <NavLink item={item} />;
};
