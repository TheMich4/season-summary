"use client";

import { Categories, type Category } from "@/config/category";
import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

interface Config {
  category: Category;
}

export const ConfigContext = createContext({
  category: Categories.ROAD,
  setCategory: (category: Category) => {},
});

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<Config>({ category: "road" });

  console.log({ config });

  const setCategory = (category: Category) => {
    console.log("setCategory", { category });
    setConfig({ ...config, category });
  };

  useEffect(() => {
    const config = localStorage.getItem("config");
    if (config) {
      setConfig(JSON.parse(config));
    }
  }, []);

  return (
    <ConfigContext.Provider value={{ ...config, setCategory }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  return useContext(ConfigContext);
};
