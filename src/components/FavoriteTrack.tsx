import Box from "./Box";
import Image from "next/image";
import type { Track } from "~/types";

const FavoriteTrack = ({ favoriteTrack }: { favoriteTrack: Track }) => {
  return (
    <Box>
      <div className="flex flex-row gap-2">
        <Image
          src={favoriteTrack.trackLogo}
          width={200}
          height={200}
          alt=""
          className="min-h-[120px] rounded-md border-2 border-slate-700 object-contain"
        />
        <div className="flex flex-col gap-1">
          <div className="font-bold">Favorite Track:</div>
          <div className="text-sm text-slate-300">
            {favoriteTrack.trackName} - {favoriteTrack.configName}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default FavoriteTrack;
