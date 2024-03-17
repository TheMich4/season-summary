export const Categories = {
  OVAL: "oval",
  ROAD: "road",
  DIRT_OVAL: "dirt_oval",
  DIRT_ROAD: "dirt_road",
  SPORTS_CAR: "sports_car",
  FORMULA_CAR: "formula_car",
};

export const categoryToId = {
  oval: 1,
  road: 2,
  dirt_oval: 3,
  dirt_road: 4,
  sports_car: 5,
  formula_car: 6,
};

export const categoryIdToKey = {
  1: "oval",
  2: "road",
  3: "dirt_oval",
  4: "dirt_road",
  5: "sports_car",
  6: "formula_car",
};

export const categoryToName = {
  oval: "Oval",
  road: "Road",
  dirt_oval: "Dirt Oval",
  dirt_road: "Dirt Road",
  sports_car: "Sports Car",
  formula_car: "Formula Car",
};

export type Category = keyof typeof categoryToId;
