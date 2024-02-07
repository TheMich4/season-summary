import { NavLink } from "./nav-link";

export const SpecialEventsNavLink = async () => {
  return (
    <NavLink
      item={{
        href: "https://special-events.dyczkowski.dev/",
        title: "Special Events",
      }}
    >
      <div className=" items-center md:flex">
        <span>Special Events</span>
      </div>
    </NavLink>
  );
};
