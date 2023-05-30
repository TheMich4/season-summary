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

export const categoryToName = {
  oval: "Oval",
  road: "Road",
  dirt_oval: "Dirt Oval",
  dirt_road: "Dirt Road",
};

export type Category = keyof typeof categoryToId;
