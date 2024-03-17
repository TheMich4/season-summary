import { NavLink } from "./nav-link";

export const ScheduleNavLink = async () => {
  return (
    <NavLink
      item={{ href: "https://schedule.dyczkowski.dev/", title: "Schedule" }}
    >
      <div className=" items-center md:flex">
        <span>Schedule</span>
        <div className="flex h-[12px] -translate-x-4 translate-y-[0.4rem] items-center justify-center self-end rounded-sm bg-primary px-1 py-0 text-[0.5rem] text-black">
          alpha
        </div>
      </div>
    </NavLink>
  );
};
