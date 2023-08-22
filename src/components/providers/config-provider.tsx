"use client";

import { Categories, type Category } from "@/config/category";
import {
  DEFAULT_CATEGORY,
  DEFAULT_SEASON,
  DEFAULT_YEAR,
} from "@/config/iracing";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

interface Config {
  category: Category;
  year: number;
  season: number;
}

const DEFAULT_CONFIG = {
  category: DEFAULT_CATEGORY,
  year: DEFAULT_YEAR,
  season: DEFAULT_SEASON,
};

export const ConfigContext = createContext({
  ...DEFAULT_CONFIG,
  updateConfig: (config: Partial<Config>) => {},
});

// TODO: Add saving favorite category
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
    const year = Number(searchParams.get("year")) || config.year;
    const season = Number(searchParams.get("season")) || config.season;
    const category = config.category;

    console.log({ year, season, category, config });

    router.push(`?year=${year}&season=${season}&category=${category}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.category]);

  return (
    <ConfigContext.Provider value={{ ...config, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  return useContext(ConfigContext);
};
