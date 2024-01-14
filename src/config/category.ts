export const Categories = {
  OVAL: "oval",
  ROAD: "road",
  DIRT_OVAL: "dirt_oval",
  DIRT_ROAD: "dirt_road",
};

export const categoryToId = {
  oval: 1,
  road: 2,
  dirt_oval: 3,
  dirt_road: 4,
};

export const categoryIdToKey = {
  1: "oval",
  2: "road",
  3: "dirt_oval",
  4: "dirt_road",
};

export const categoryToName = {
  oval: "Oval",
  road: "Road",
  dirt_oval: "Dirt Oval",
  dirt_road: "Dirt Road",
};

export type Category = keyof typeof categoryToId;
