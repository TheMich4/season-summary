import DriverBox from "./DriverBox";
import { drivers } from "~/consts";

const DriverList = () => {
  return (
    <div className="flex flex-col gap-2">
      {drivers
        ?.sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((driver) => (
          <DriverBox driver={driver} key={driver.id} />
        ))}
    </div>
  );
};

export default DriverList;
