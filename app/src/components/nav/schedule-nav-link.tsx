import { NavLink } from "./nav-link";

export const ScheduleNavLink = async () => {
  return (
    <NavLink
      item={{ 
        href: "https://schedule.dyczkowski.dev/", 
        title: "Schedule"
      }}
    />
  );
};
