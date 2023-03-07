import { type Driver } from "~/types";

const DriverBox = ({ driver }: { driver: Driver }) => {
  return (
    <div className="flex w-[200px] cursor-pointer flex-col rounded-md bg-slate-900 p-2">
      <div className="font-bold">{driver.name}</div>
      <div className="text-xs text-gray-400">{driver.iracingId}</div>
    </div>
  );
};

export default DriverBox;
