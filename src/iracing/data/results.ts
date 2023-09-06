import { Result } from "iracing-api/lib/types/results";

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
