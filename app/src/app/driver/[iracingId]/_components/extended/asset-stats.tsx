import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AssetDataTable } from "./asset-stats-data-table";
import { useMemo } from "react";
import { type AssetData } from "./types";
import { StatBox } from "@/components/stat-box";
import { Car, Trophy, Medal, Target, Star, ChevronUp } from "lucide-react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

interface AssetStatsProps {
  assetData: AssetData;
  name: string;
  preposition: string;
}

const Data = ({
  data,
  preposition,
}: {
  data: Array<{
    name: string;
    races: number;
  }>;
  preposition: string;
}) => {
  return (
    <div className="flex flex-col text-start">
      {data.map(({ name, races }) => (
        <div className="flex w-full flex-row items-baseline gap-1" key={name}>
          <p className="min-w-[19px] font-bold dark:text-primary">{races}</p>
          <p className="text-xs text-muted-foreground">{preposition}</p>
          <p className="text-sm">{name}</p>
        </div>
      ))}
    </div>
  );
};

export const AssetStats = ({
  assetData,
  name,
  preposition,
}: AssetStatsProps) => {
  // Track mouse position for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Create transforms based on mouse position
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Create gradient position for light effect
  const backgroundX = useMotionValue(0);
  const backgroundY = useMotionValue(0);
  
  // Create gradient transforms for the animated border
  const background = useMotionTemplate`radial-gradient(400px circle at ${backgroundX}px ${backgroundY}px, rgba(234,179,8,0.10), transparent 80%)`;
  
  // Handle mouse movement to create 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    const x = clientX - left;
    const y = clientY - top;
    
    // Calculate rotation based on mouse position (max 4 degrees)
    const rotateXValue = ((y - height / 2) / height) * -4;
    const rotateYValue = ((x - width / 2) / width) * 4;
    
    // Update values for animations
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
    mouseX.set(x);
    mouseY.set(y);
    backgroundX.set(x);
    backgroundY.set(y);
  };
  
  // Reset animation values on mouse leave
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const { count, data } = useMemo(
    () =>
      Object.entries(assetData).reduce(
        (acc, [name, stats]) => ({
          count: acc.count + 1,
          data: [...acc.data, { name, races: stats.races }]
            .sort((a, b) => b.races - a.races)
            .slice(0, 3),
        }),
        { count: 0, data: [] } as {
          count: number;
          data: Array<{ name: string; races: number }>;
        },
      ),
    [assetData],
  );

  const stats = Object.entries(assetData).map(([key, value]) => ({
    name: key,
    ...value,
  }));

  const getIcon = (name: string) => {
    switch (name) {
      case "cars":
        return <Car className="h-5 w-5" />;
      case "series":
        return <Trophy className="h-5 w-5" />;
      case "tracks":
        return <Target className="h-5 w-5" />;
      default:
        return <Star className="h-5 w-5" />;
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <motion.div
          className="group relative overflow-hidden rounded-xl border border-primary/30 bg-background/60 p-4 backdrop-blur-md transition-colors hover:border-primary/60"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Animated border gradient */}
          <motion.div
            className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{ background }}
          />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="flex items-center gap-2">
              {getIcon(name)}
              <span className="text-base font-medium">{`Most raced ${name}`}</span>
            </div>

            <div className="mt-2 flex flex-row items-baseline gap-1 text-sm text-muted-foreground">
              {`You raced ${preposition} `}
              <p className="font-bold text-foreground dark:text-primary">
                {count}
              </p>
              {`different ${name} this season.`}
            </div>

            <div className="mt-4">
              <Data data={data} preposition={preposition} />
            </div>
          </div>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="flex h-fit max-h-[80%] max-w-full flex-col overflow-hidden md:max-w-[80%]">
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle>{`${name.charAt(0).toUpperCase()}${name.slice(
            1,
          )} stats`}</DialogTitle>
        </DialogHeader>

        <AssetDataTable data={assetData} />
      </DialogContent>
    </Dialog>
  );
};
