/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Categories, categoryToName, type Category } from "@/config/category";
import {
  DEFAULT_CATEGORY,
  DEFAULT_SEASON,
  DEFAULT_YEAR,
} from "@/config/iracing";
import { useRouter, useSearchParams } from "next/navigation";
import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

interface Config {
  category: Category | undefined;
  year: number;
  season: number;
}

const DEFAULT_CONFIG = {
  category: undefined as Category | undefined,
  year: DEFAULT_YEAR,
  season: DEFAULT_SEASON,
};

export const ConfigContext = createContext({
  ...DEFAULT_CONFIG,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateConfig: (config: Partial<Config>) => {},
});

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);

  const updateConfig = (newConfig: Partial<Config>) => {
    const updatedConfig = { ...config, ...newConfig };
    setConfig(updatedConfig);
  };

  // Navigate on change
  useEffect(() => {
    const year = searchParams.get("year")
      ? Number(searchParams.get("year"))
      : config.year;
    const season = searchParams.get("season")
      ? Number(searchParams.get("season"))
      : config.season;
    const category =
      config.category ?? searchParams.get("category") ?? DEFAULT_CATEGORY;

    router.push(`?year=${year}&season=${season}&category=${category}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.category]);

  useEffect(() => {
    const newCategory = searchParams.get("category") as Category;
    if (
      newCategory !== config.category &&
      Object.values(Categories).some((c) => c === newCategory)
    ) {
      updateConfig({ category: newCategory });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get("category")]);

  return (
    <ConfigContext.Provider value={{ ...config, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  return useContext(ConfigContext);
};
