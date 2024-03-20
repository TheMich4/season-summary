import { Categories } from "@season-summary/config";
import type { Category } from "@season-summary/config";

export const DEFAULT_SEASON = 2;
export const DEFAULT_YEAR = 2024;
export const DEFAULT_CATEGORY = Categories.OVAL as Category;

// TODO: Fill with previous seasons
export const SEASON_DATE_RANGES: Record<
  string,
  Record<string, { start: string; end: string }>
> = {
  "2022": {
    "1": {
      start: "2021-12-14",
      end: "2022-03-14",
    },
    "2": {
      start: "2022-03-15",
      end: "2022-06-13",
    },
    "3": {
      start: "2022-06-14",
      end: "2022-09-12",
    },
    "4": {
      start: "2022-09-13",
      end: "2022-12-12",
    },
  },
  "2023": {
    "1": {
      start: "2022-12-13",
      end: "2023-03-13",
    },
    "2": {
      start: "2023-03-14",
      end: "2023-06-12",
    },
    "3": {
      start: "2023-06-13",
      end: "2023-09-11",
    },
    "4": {
      start: "2023-09-12",
      end: "2023-12-11",
    },
  },
  "2024": {
    "1": {
      start: "2023-12-12",
      end: "2024-03-11",
    },
    "2": {
      start: "2024-03-12",
      end: "2024-06-10",
    },
  },
};
