import { NavLink } from "./nav-link";
import { authOptions } from "@/config/auth-options";
import { getServerSession } from "next-auth";
import { getUserSettings } from "@/server/get-user-settings";
import { getProfileUrl } from "@/server/get-profile-url";

export const ProfileNavLink = async () => {
  const session = await getServerSession(authOptions);
  const userSettings = await getUserSettings(session?.user?.id);
  const href = userSettings?.iracingId
    ? await getProfileUrl(userSettings.iracingId)
    : "";

  const item = {
    href,
    title: "Your Profile",
  };

  return <NavLink item={item} />;
};
