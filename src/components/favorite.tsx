import Image from "next/image"

export const FavoriteItem = ({
  imageSrc,
  type,
  value,
}: {
  imageSrc: string
  type: string
  value: string
}) => {
  return (
    <div className="flex flex-col gap-1 rounded-md border p-2 md:w-[50%]">
      <div className="text-center text-lg font-semibold">Favorite {type}:</div>
      <div className="flex h-full items-start justify-center text-center align-bottom text-2xl font-bold">
        {value}
      </div>
      <Image
        src={imageSrc}
        width={400}
        height={230}
        alt={`${type} image`}
        className="rounded-md border object-contain"
      />
    </div>
  )
}

export const Favorite = ({ memberRecap = {} }) => {
  return (
    <div className="flex w-full flex-col gap-2 md:flex-row">
      <FavoriteItem
        value={memberRecap.favoriteCar.carName}
        imageSrc={memberRecap.favoriteCar.carImage}
        type="Car"
      />
      <FavoriteItem
        value={memberRecap.favoriteTrack.trackName}
        imageSrc={memberRecap.favoriteTrack.trackLogo}
        type="Track"
      />
    </div>
  )
}
