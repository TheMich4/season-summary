import { NavLink } from "./nav-link";
import { getProfileUrl } from "@/server/get-profile-url";
import { api } from "@/trpc/server";

export const ProfileNavLink = async () => {
  const userSettings = await api.user.getSettings.query();
  const href = userSettings?.iracingId
    ? await getProfileUrl(userSettings.iracingId)
    : "";

  const item = {
    href,
    title: "Your Profile",
  };

  return <NavLink item={item} />;
};
