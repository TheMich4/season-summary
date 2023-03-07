import Box from "./Box";
import type { Car } from "~/types";
import Image from "next/image";

const FavoriteCar = ({ favoriteCar }: { favoriteCar: Car }) => {
  return (
    <Box>
      <div className="flex flex-row gap-2">
        <Image
          src={favoriteCar.carImage}
          width={200}
          height={200}
          alt=""
          className="rounded-md"
        />
        <div className="flex flex-col gap-1">
          <div className="font-bold">Favorite Car:</div>
          <div className="text-sm text-slate-300">{favoriteCar.carName}</div>
        </div>
      </div>
    </Box>
  );
};

export default FavoriteCar;
