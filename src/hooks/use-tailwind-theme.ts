import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

export const useTailwindTheme = () => {
  const fullConfig = resolveConfig(tailwindConfig);

  return fullConfig.theme;
};
