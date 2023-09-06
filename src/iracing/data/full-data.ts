import { Result } from "./results.js";

export interface FullData {
  [customerId: string]: {
    [year: string]: {
      [season: string]: {
        [categoryId: string]: {
          data: Array<Result> | null;
          isFetching: boolean;
          isFetched: boolean;
        };
      };
    };
  };
}

export interface FullDataParams {
  categoryId: string;
  customerId: string;
  season: string;
  year: string;
}

interface FullDataResult {
  data: Array<Result> | null;
  isFetching: boolean;
  isFetched: boolean;
}

const fullData: FullData = {};

export const initFullData = ({
  customerId,
  year,
  season,
  categoryId,
}: FullDataParams) => {
  fullData[customerId] = {
    ...fullData[customerId],
    [year]: {
      ...fullData[customerId]?.[year],
      [season]: {
        ...fullData[customerId]?.[year]?.[season],
        [categoryId]: {
          data: null,
          isFetching: false,
          isFetched: false,
        },
      },
    },
  };
};

export const getFullData = ({
  customerId,
  year,
  season,
  categoryId,
}: FullDataParams) => {
  return fullData[customerId]?.[year]?.[season]?.[categoryId] ?? undefined;
};

export const setFullData = (
  { customerId, year, season, categoryId }: FullDataParams,
  { data, isFetching, isFetched }: FullDataResult
) => {
  fullData[customerId] = {
    ...fullData[customerId],
    [year]: {
      ...fullData[customerId]?.[year],
      [season]: {
        ...fullData[customerId]?.[year]?.[season],
        [categoryId]: {
          data,
          isFetching,
          isFetched,
        },
      },
    },
  };
};

export const isFullDataFetched = ({
  categoryId,
  customerId,
  season,
  year,
}: FullDataParams) => {
  return (
    fullData[customerId]?.[year]?.[season]?.[categoryId]?.isFetched ?? false
  );
};

export const setFullDataFetched = ({
  categoryId,
  customerId,
  season,
  year,
}: FullDataParams) => {
  setFullData(
    { categoryId, customerId, season, year },
    {
      data: null,
      isFetching: false,
      isFetched: true,
    }
  );
};

export const isFullDataFetching = ({
  categoryId,
  customerId,
  season,
  year,
}: FullDataParams) => {
  return (
    fullData[customerId]?.[year]?.[season]?.[categoryId]?.isFetching ?? false
  );
};

export const setFullDataFetching = ({
  categoryId,
  customerId,
  season,
  year,
}: FullDataParams) => {
  setFullData(
    { categoryId, customerId, season, year },
    {
      data: null,
      isFetching: true,
      isFetched: false,
    }
  );
};
