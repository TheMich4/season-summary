// import { Result } from "iracing-api/lib/types/results";

// TODO: Add iracing-api type
export interface Result {
  [key: string]: any;
}

interface Results {
  [subsessionId: string]: Result;
}

const results: Results = {};

export const getResult = (subsessionId: string) => {
  return results[subsessionId] ?? undefined;
};

export const setResult = (subsessionId: string, result: Result) => {
  results[subsessionId] = result;
};
